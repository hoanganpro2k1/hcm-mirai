import envConfig from "@/config";
import mongoose from "mongoose";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);

const MONGODB_URI = envConfig.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Cấu hình chuyển đổi _id sang id cho toàn bộ schemas (với bảo vệ tránh đăng ký nhiều lần)
if (!(mongoose as any)._idPluginRegistered) {
  mongoose.plugin((schema: any) => {
    schema.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform: function (doc: any, ret: any) {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });

    schema.set("toObject", {
      virtuals: true,
      versionKey: false,
      transform: function (doc: any, ret: any) {
        ret.id = ret._id ? ret._id.toString() : ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  });
  (mongoose as any)._idPluginRegistered = true;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      family: 4, // Force IPv4 to prevent ECONNREFUSED issues on some Windows systems
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
