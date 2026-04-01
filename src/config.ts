import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { z } from "zod";

const envPath = fs.existsSync(path.resolve(".env.local"))
  ? ".env.local"
  : fs.existsSync(path.resolve(".env"))
    ? ".env"
    : null;

if (envPath) {
  config({ path: envPath });
}

const envSchema = z.object({
  MONGODB_URI: z.string().url("MONGODB_URI không hợp lệ"),
  JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET không được để trống"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(1, "JWT_REFRESH_SECRET không được để trống"),
  JWT_ACCESS_EXPIRE: z.string().default("15m"),
  JWT_REFRESH_EXPIRE: z.string().default("7d"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const envServer = envSchema.safeParse(process.env);

if (!envServer.success) {
  console.error("❌ Các giá trị khai báo trong biến môi trường không hợp lệ:");
  console.error(envServer.error.flatten().fieldErrors);
  // Không nên dùng process.exit(1) trong module của Next.js vì có thể làm chết dev server
  // Thay vào đó hãy throw lỗi để Next.js xử lý
  throw new Error("Cấu hình môi trường không hợp lệ.");
}

const envConfig = envServer.data;

export default envConfig;
