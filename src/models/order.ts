import mongoose, { Schema, Model } from "mongoose";
import { IOrder } from "@/types/order.type";

const OrderSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    coverImage: { type: String },
    salary: { type: String },
    date: { type: String },
    location: { type: String },
    age: { type: String },
    description: { type: String },
    content: { type: String },
    category: { type: String },
    country: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "both"],
      default: "both",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
