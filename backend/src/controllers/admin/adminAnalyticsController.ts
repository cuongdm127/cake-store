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
      {
        $match: {                          // ✅ Only completed orders
          isPaid: true,
          isDelivered: true,
        }
      },
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

export const getOrderTrends = async (req: Request, res: Response) => {
  try {
    // Default to last 7 days
    const range = req.query.range || '7d';

    // Determine date range & group format
    let dateFrom = new Date();
    let groupBy: any = {};

    if (range === '7d') {
      dateFrom.setDate(dateFrom.getDate() - 7);
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
        day: { $dayOfMonth: '$createdAt' }
      };
    } else if (range === '30d') {
      dateFrom.setDate(dateFrom.getDate() - 30);
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
        day: { $dayOfMonth: '$createdAt' }
      };
    } else if (range === '365d') {
      dateFrom.setFullYear(dateFrom.getFullYear() - 1);
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' }
      };
    }

    const trends = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: dateFrom }
        }
      },
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 },
          deliveredOrders: {
            $sum: { $cond: ['$isDelivered', 1, 0] }
          },
          paidOrders: {
            $sum: { $cond: ['$isPaid', 1, 0] }
          },
          unpaidOrders: {
            $sum: { $cond: ['$isPaid', 0, 1] }
          }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.json(trends);
  } catch (error) {
    console.error('Error fetching order trends:', error);
    res.status(500).json({ message: 'Failed to fetch order trends' });
  }
};



export const getOrderStats = async (_req: Request, res: Response) => {
  try {
    const totalOrders = await Order.countDocuments();

    const paidOrders = await Order.countDocuments({ isPaid: true });
    const unpaidOrders = totalOrders - paidOrders;

    const deliveredOrders = await Order.countDocuments({ isDelivered: true });
    const pendingDeliveries = totalOrders - deliveredOrders;

    res.json({
      totalOrders,
      paidOrders,
      unpaidOrders,
      deliveredOrders,
      pendingDeliveries
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order stats' });
  }
};

export const getCompletedRevenue = async (_req: Request, res: Response) => {
  try {
    const completedRevenue = await Order.aggregate([
      { $match: { isPaid: true, isDelivered: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    res.json({ totalRevenue: completedRevenue[0]?.totalRevenue || 0 });
  } catch (error) {
    console.error('Completed revenue error', error);
    res.status(500).json({ message: 'Failed to calculate completed revenue' });
  }
};


