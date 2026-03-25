import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  title: string;
  status: string;
  image?: string;
  description?: string;
  content?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    image: { type: String },
    description: { type: String },
    content: { type: String },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
