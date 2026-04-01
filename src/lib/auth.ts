import envConfig from "@/config";
import bcryptjs from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

// Lấy Secret Key từ envConfig
const getJwtSecret = (type: "access" | "refresh") => {
  const secret =
    type === "access"
      ? envConfig.JWT_ACCESS_SECRET
      : envConfig.JWT_REFRESH_SECRET;
  return new TextEncoder().encode(secret);
};

// Mã hóa mật khẩu
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

// So sánh mật khẩu
export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcryptjs.compare(password, hash);
};

export interface TokenPayload {
  adminId: string;
  username: string;
  roleName?: string;
  rolePermissions?: string[];
}

// Tạo Access Token bằng jose
export const generateAccessToken = async (
  payload: TokenPayload,
): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(envConfig.JWT_ACCESS_EXPIRE)
    .sign(getJwtSecret("access"));
};

// Tạo Refresh Token bằng jose
export const generateRefreshToken = async (
  payload: TokenPayload,
): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(envConfig.JWT_REFRESH_EXPIRE)
    .sign(getJwtSecret("refresh"));
};

// Verify Token (Dùng chung cho cả Access và Refresh bằng cách truyền type)
export const verifyToken = async (
  token: string,
  type: "access" | "refresh",
) => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(type));
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
};
