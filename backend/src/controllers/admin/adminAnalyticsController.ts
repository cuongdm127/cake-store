import Order from '../../models/Order';
import Product from '../../models/Product';
import { Request, Response } from 'express';

// @desc Get Total Sales
export const getTotalSales = async (_req: Request, res: Response) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    res.json({ totalSales: totalSales[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch total sales' });
  }
};

// @desc Get Best-Selling Products
export const getTopProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Order.aggregate([
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.productId',
          totalSold: { $sum: '$orderItems.quantity' }
        }
      },
      {
        $lookup: {
          from: 'products',
          let: { productId: { $toObjectId: '$_id' } }, // ✅ convert _id to ObjectId
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$productId'] } } }
          ],
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 1,
          name: '$product.name',
          totalSold: 1,
        }
      }
    ]);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch top products' });
  }
};

// @desc Get Order Trends (last 7 days)
export const getOrderTrends = async (_req: Request, res: Response) => {
  try {
    const trends = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          totalSales: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: 7 }
    ]);

    res.json(trends.reverse()); // reverse for chronological order
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order trends' });
  }
};
