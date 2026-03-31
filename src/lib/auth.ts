import bcryptjs from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

// Lấy Secret Key từ biến môi trường
const getJwtSecret = (type: "access" | "refresh") => {
  const secret = type === "access" ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error(`Missing ${type === "access" ? "JWT_ACCESS_SECRET" : "JWT_REFRESH_SECRET"} environment variable.`);
  }
  return new TextEncoder().encode(secret);
};

// Mã hóa mật khẩu
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

// So sánh mật khẩu
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return bcryptjs.compare(password, hash);
};

export interface TokenPayload {
  adminId: string;
  username: string;
}

// Tạo Access Token bằng jose
export const generateAccessToken = async (payload: TokenPayload): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_ACCESS_EXPIRE || "15m") // Default: 15 minutes
    .sign(getJwtSecret("access"));
};

// Tạo Refresh Token bằng jose
export const generateRefreshToken = async (payload: TokenPayload): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_REFRESH_EXPIRE || "7d") // Default: 7 days
    .sign(getJwtSecret("refresh"));
};

// Verify Token (Dùng chung cho cả Access và Refresh bằng cách truyền type)
export const verifyToken = async (token: string, type: "access" | "refresh") => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(type));
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
};
