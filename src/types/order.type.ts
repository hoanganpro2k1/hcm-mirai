import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  title: string;
  status: string;
  coverImage?: string;
  salary?: string;
  date?: string;
  location?: string;
  age?: string;
  description?: string;
  content?: string;
  category?: string;
  country?: string;
  gender?: "male" | "female" | "both";
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  deletedBy?: mongoose.Types.ObjectId;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobOrder {
  id: string;
  _id?: string;
  title: string;
  status: string;
  coverImage?: string;
  salary?: string;
  date?: string;
  location?: string;
  age?: string;
  description?: string;
  content?: string;
  category?: string;
  country?: string;
  gender?: "male" | "female" | "both";
  createdBy?: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderFilterParams {
  page?: number;
  limit?: number;
  country?: string;
  category?: string;
  testLocation?: string;
  gender?: string;
  birthYear?: string;
  s?: string;
}

export interface OrderResponse {
  data: JobOrder[];
  total: number;
  page: number;
  totalPages: number;
}
