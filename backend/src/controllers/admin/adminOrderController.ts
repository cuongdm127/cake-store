import { Request, Response } from 'express';
import Order from '../../models/Order';
import mongoose, { PipelineStage } from "mongoose";


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

export const getPaginatedOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || '';
    const paymentStatus = (req.query.paymentStatus as string) || '';
    const shipmentStatus = (req.query.shipmentStatus as string) || '';
    const dateRange = (req.query.dateRange as string) || 'all'; // '7d', '30d', 'all'

    const matchStage: any = {};

    // Filter by status
    if (paymentStatus === 'paid') {
      matchStage.isPaid = true;
    } else if (paymentStatus === 'unpaid') {
      matchStage.isPaid = false;
    }
    if (shipmentStatus === 'delivered') {
      matchStage.isDelivered = true;
    } else if (shipmentStatus === 'pending') {
      matchStage.isDelivered = false;
    }

    // Filter by dateRange
    if (dateRange !== 'all') {
      const now = new Date();
      let startDate;

      if (dateRange === '7d') {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
      } else if (dateRange === '30d') {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
      }

      if (startDate) {
        matchStage.createdAt = { $gte: startDate, $lte: now };
      }
    }

    const aggregatePipeline: mongoose.PipelineStage[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          ...matchStage,
          ...(search && {
            $or: [
              { 'user.email': { $regex: search, $options: 'i' } },
              ...(mongoose.Types.ObjectId.isValid(search)
                ? [{ _id: new mongoose.Types.ObjectId(search) }]
                : []),
            ],
          }),
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          paginatedResults: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
          totalCount: [
            { $count: 'count' },
          ],
        },
      },
    ];

    const results = await Order.aggregate(aggregatePipeline);

    const orders = results[0]?.paginatedResults || [];
    const totalCount = results[0]?.totalCount[0]?.count || 0;

    res.json({
      orders,
      total: totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching paginated orders:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};





