import express from 'express';
import { adminMiddleware } from '../../middleware/adminMiddleware';
import { protect } from '../../middleware/authMiddleware';
import {
    getTotalSales,
    getTopProducts,
    getOrderTrends,
    getOrderStats,
    getCompletedRevenue
}
    from '../../controllers/admin/adminAnalyticsController'

const router = express.Router();

router.use(protect);
router.use(adminMiddleware);

router.get('/total-sales', getTotalSales);
router.get('/top-products', getTopProducts);
router.get('/order-trends', getOrderTrends);
router.get('/orders-stats', getOrderStats);
router.get('/completed-revenue', getCompletedRevenue);


export default router;
