import { Request, Response, NextFunction } from "express";
import User from "../models/User"; // Path depends on your structure

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if the user is authenticated first
    if (!req.user || !req.user._id) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    // Find user in DB to get the role (optional if you store role in req.user)
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Not authorized as admin" });
      return;
    }

    next(); // ✅ User is admin, continue to controller
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
