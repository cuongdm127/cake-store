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
