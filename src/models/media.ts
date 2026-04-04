import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  url: string;
  public_id: string;
  fileName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  folder?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const MediaSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true, unique: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    width: { type: Number },
    height: { type: Number },
    folder: { type: String, default: "general" },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Index for search and soft-delete filtering
MediaSchema.index({ fileName: "text", deletedAt: 1 });

const Media = mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
