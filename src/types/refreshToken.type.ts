import mongoose from "mongoose";

export interface IRefreshToken extends mongoose.Document {
  id: string; // Standardized ID
  token: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}
