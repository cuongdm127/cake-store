import { Request, Response } from 'express';
import Order from '../../models/Order';

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await Order.find({}).populate('userId', 'name email');
  res.json(orders);
};

// @desc    Mark an order as delivered
// @route   PUT /api/admin/orders/:id/deliver
export const markOrderDelivered = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};
