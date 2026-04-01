import mongoose from "mongoose";

export interface IRefreshToken extends mongoose.Document {
  token: string;
  adminId: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}
