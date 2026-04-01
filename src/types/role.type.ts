import mongoose from "mongoose";
import { IPermission } from "./permission.type";

export interface IRole extends mongoose.Document {
  name: string;
  description: string;
  isActive: boolean;
  permissions: mongoose.Types.ObjectId[];
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  deletedBy?: mongoose.Types.ObjectId;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPopulatedRole extends Omit<IRole, "permissions"> {
  permissions: IPermission[];
}
