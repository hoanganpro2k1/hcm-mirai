import envConfig from "@/config";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/user";
import Role from "@/models/role";
import Permission from "@/models/permission";
import RefreshToken from "@/models/refreshToken";
import { IPopulatedUser } from "@/types/auth.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Lấy refreshToken từ Cookie HttpOnly
    const refreshTokenCookie = req.cookies.get("refreshToken")?.value;

    if (!refreshTokenCookie) {
      return NextResponse.json(
        { message: "Refresh token không tồn tại, vui lòng đăng nhập lại." },
        { status: 401 },
      );
    }

    // 1. Kiểm tra tính hợp lệ của token trong Database
    const tokenDoc = await RefreshToken.findOne({ token: refreshTokenCookie });
    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      console.error("RefreshToken API 403: Token not found or expired in DB", {
        found: !!tokenDoc,
        expired: tokenDoc ? tokenDoc.expiresAt < new Date() : null,
      });
      if (tokenDoc) await RefreshToken.deleteOne({ _id: tokenDoc._id });
      return NextResponse.json(
        { message: "Refresh token không hợp lệ hoặc đã hết hạn." },
        { status: 403 },
      );
    }

    // 2. Giải mã token để lấy payload
    const decoded = await verifyToken(refreshTokenCookie, "refresh");
    if (!decoded) {
      console.error(
        "RefreshToken API 403: JWT verify failed (Invalid signature or structural error)",
      );
      await RefreshToken.deleteOne({ _id: tokenDoc._id });
      return NextResponse.json(
        { message: "Refresh token không hợp lệ (mã hóa sai)." },
        { status: 403 },
      );
    }

    // 3. Tìm user và populate Role/Permissions
    const user = (await User.findById(tokenDoc.userId).populate({
      path: "role",
      model: Role,
      populate: {
        path: "permissions",
        model: Permission,
      },
    })) as IPopulatedUser | null;

    if (!user) {
      console.error(
        "RefreshToken API 403: User not found for id",
        tokenDoc.userId,
      );
      await RefreshToken.deleteOne({ _id: tokenDoc._id });
      return NextResponse.json(
        { message: "Tài khoản không tồn tại." },
        { status: 403 },
      );
    }

    // 4. Cơ chế Token Rotation: Cấp phát mới lại Access Token và Refresh Token
    const role = user.role;
    const roleName = role?.name;
    const rolePermissions = role?.permissions?.map((p: any) => p.name) || [];

    const payload = {
      userId: user.id,
      username: user.username,
      roleName,
      rolePermissions,
    };

    const newAccessToken = await generateAccessToken(payload);
    const newRefreshTokenStr = await generateRefreshToken(payload);

    // Xết thời gian hết hạn mới (7 ngày)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Thay thế token cũ bằng token mới (Token Rotation)
    await RefreshToken.findOneAndUpdate(
      { _id: tokenDoc._id },
      {
        token: newRefreshTokenStr,
        expiresAt: expiresAt,
      },
    );

    // 5. Trả kết quả
    const response = NextResponse.json(
      {
        message: "Cấp lại token thành công",
        accessToken: newAccessToken,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          phoneNumber: user.phoneNumber,
          status: user.status,
          role: roleName,
          permissions: rolePermissions,
        },
      },
      { status: 200 },
    );

    // Cập nhật lại Cookie chứa Refresh Token mới
    response.cookies.set({
      name: "refreshToken",
      value: newRefreshTokenStr,
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { message: "Lỗi nội bộ Server", error: error.message },
      { status: 500 },
    );
  }
}
