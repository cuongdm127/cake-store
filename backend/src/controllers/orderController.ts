import { Request, Response } from 'express';
import Order from '../models/Order';

// POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    console.log(req.body)
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }

    const newOrder = new Order({
        userId: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    });

    const createdOrder = await newOrder.save();

    res.status(201).json(createdOrder);
};

// GET /api/orders/mine
export const getUserOrders = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }

    const page = Number(req.query.page) || 1;      // page number
    const limit = Number(req.query.limit) || 5;   // items per page

    const skip = (page - 1) * limit;

    const orders = await Order.find()
        .skip(skip)
        .limit(limit);

    const total = await Order.countDocuments();

    res.json({
        orders,
        page,
        pages: Math.ceil(total / limit),
        total,
    })
};

export const getOrderById = async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
    }

    // Check if the user owns the order (unless admin)
    if (order.userId.toString() !== req.user!._id.toString() && req.user!.role !== 'admin') {
        res.status(403).json({ message: 'Not authorized to view this order' });
        return;
    }

    res.json(order);
};
