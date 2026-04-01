import mongoose, { Schema, Model } from "mongoose";
import { IRole } from "@/types/role.type";

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Role: Model<IRole> =
  mongoose.models.Role || mongoose.model<IRole>("Role", roleSchema);

export default Role;
