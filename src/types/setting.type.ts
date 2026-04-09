import { Document, Types } from "mongoose";

export interface ISettingValue {
  [key: string]: any;
}

export interface ISetting {
  key: string;
  value: ISettingValue | string | number | boolean;
  description?: string;
  updatedBy?: Types.ObjectId;
}

export interface ISettingDocument extends ISetting, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
