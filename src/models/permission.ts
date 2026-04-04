import mongoose, { Schema, Model } from "mongoose";
import { IPermission } from "@/types/permission.type";

const permissionSchema = new Schema<IPermission>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    path: { type: String, required: true, trim: true },
    method: {
      type: String,
      required: true,
      enum: ["GET", "POST", "PUT", "DELETE", "PATCH", "ALL"],
      default: "GET",
    },
    module: { type: String, default: "", trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Permission: Model<IPermission> =
  mongoose.models.Permission ||
  mongoose.model<IPermission>("Permission", permissionSchema);

export default Permission;
