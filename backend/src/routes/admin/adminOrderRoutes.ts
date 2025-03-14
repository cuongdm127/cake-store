import express from 'express';
import {
  getAllOrders,
  markOrderDelivered,
  getOrderById,
  markOrderAsPaid
} from '../../controllers/admin/adminOrderController';
import { protect } from '../../middleware/authMiddleware';
import { adminMiddleware } from '../../middleware/adminMiddleware';

const router = express.Router();

router.use(protect);
router.use(adminMiddleware);

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/deliver', markOrderDelivered);
router.put('/:id/pay', markOrderAsPaid);

export default router;
