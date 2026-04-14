import mongoose, { Schema, Document, Model } from "mongoose";
import "./user"; // Đảm bảo User model đã được đăng ký cho việc populate author

export interface IPostDocument extends Document {
  title: string;
  slug: string;
  content: string;
  summary?: string;
  category: "news" | "event" | "admission";
  thumbnail?: string;
  status: "draft" | "published";
  author: mongoose.Types.ObjectId;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    summary: { type: String },
    category: {
      type: String,
      enum: ["news", "event", "admission"],
      default: "news",
    },
    thumbnail: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    publishedAt: { type: Date },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret: any) {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret: any) {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Search indexes
PostSchema.index({ title: "text", summary: "text" });
PostSchema.index({ status: 1, category: 1, publishedAt: -1 });

const Post: Model<IPostDocument> =
  mongoose.models.Post || mongoose.model<IPostDocument>("Post", PostSchema);

export default Post;
