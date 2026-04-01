import mongoose from "mongoose";
import { IPopulatedRole } from "./role.type";

export interface IAdmin extends mongoose.Document {
  username: string;
  avatar?: string;
  password?: string;
  refreshToken?: string;
  role?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPopulatedAdmin extends Omit<IAdmin, "role"> {
  role?: IPopulatedRole;
}
