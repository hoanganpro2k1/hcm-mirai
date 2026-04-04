import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

// Load env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Import models (using require because of tsx/esm issues with direct imports in scripts)
const MONGODB_URI = process.env.MONGODB_URI;

async function setup() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI missing in .env.local");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    // Models
    const Permission = mongoose.models.Permission || mongoose.model("Permission", new mongoose.Schema({
      name: String,
      description: String,
      path: String,
      method: String,
      module: String
    }));

    const Role = mongoose.models.Role || mongoose.model("Role", new mongoose.Schema({
      name: String,
      permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }]
    }));

    // 1. Đảm bảo permission 'orders:view' tồn tại
    let orderViewPerm = await Permission.findOne({ name: "orders:view" });
    if (!orderViewPerm) {
      console.log("Creating 'orders:view' permission...");
      orderViewPerm = await Permission.create({
        name: "orders:view",
        description: "Quyền xem danh sách đơn hàng XKLĐ",
        path: "/api/orders",
        method: "GET",
        module: "orders"
      });
    }

    // 2. Cập nhật Role 'editor'
    console.log("Updating 'editor' role...");
    const editorRole = await Role.findOneAndUpdate(
      { name: "editor" },
      { 
        $set: { 
          permissions: [orderViewPerm._id] 
        } 
      },
      { upsert: true, new: true }
    );

    console.log("Setup complete!");
    console.log("Role 'editor' now has permissions:", ["orders:view"]);
    
    process.exit(0);
  } catch (error) {
    console.error("Error setting up permissions:", error);
    process.exit(1);
  }
}

setup();
