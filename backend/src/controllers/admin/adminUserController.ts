import { Request, Response } from 'express';
import User from '../../models/User';

// @desc    Get all users (admin)
// @route   GET /api/admin/users
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
export const updateUserRole = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const getPaginatedUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search || "";

  const query = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  try {
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional sorting

    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

