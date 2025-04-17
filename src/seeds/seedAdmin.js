import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../model/admin.model.js";
import { MONGODB_CONNECTION_STRING } from "../config/index.js"; // MongoDB connection string

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await Admin.findOne({ email: "admin@adbrovz.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists. Skipping seed.");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin", 10); // hash 'admin' password

    const adminUser = new Admin({
      code: "ADMIN",
      name: "ADMIN",
      type: "admin",
      email: "admin@adbrovz.com",
      phone: "1234567890",
      chatnumber : "918884745611",
      email:"adb",
      password: hashedPassword,
      is_agency: 0,
      sub_type: 0,
      status: 0,
      temp_id: null,
      created_at: new Date("2023-03-18T12:38:10Z"),
    });

    await adminUser.save();
    console.log("✅ Admin user seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
