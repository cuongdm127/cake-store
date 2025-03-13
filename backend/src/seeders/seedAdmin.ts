import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import bcrypt from "bcryptjs";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: hashedPassword,
      role: "admin",  // ✅ Important: role must be 'admin'
    });

    await admin.save();
    console.log("✅ Admin user created!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
