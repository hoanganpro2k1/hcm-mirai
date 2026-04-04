import mongoose from "mongoose";
import { IPopulatedRole } from "./role.type";

export type UserStatus = "active" | "inactive";

export interface IUser extends mongoose.Document {
  id: string; // Standardized ID
  username: string;
  name?: string;
  avatar?: string;
  phoneNumber?: string;
  password?: string;
  refreshToken?: string;
  role?: mongoose.Types.ObjectId;
  status: UserStatus;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  deletedBy?: mongoose.Types.ObjectId;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPopulatedUser extends Omit<IUser, "role"> {
  role?: IPopulatedRole;
}
