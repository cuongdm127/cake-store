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

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const markOrderAsPaid = async (req: Request, res: Response) => {
  console.log('Hello')
  console.log(req.params.id)
  const order = await Order.findById(req.params.id);
  console.log(req.params.id)

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  if (order.isPaid) {
    res.status(400).json({ message: "Order already paid" });
    return;
  }

  order.isPaid = true;
  order.paidAt = new Date();

  const updatedOrder = await order.save();

  res.json(updatedOrder);
};

