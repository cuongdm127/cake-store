import express from 'express';
import {
  getAllOrders,
  markOrderDelivered,
} from '../../controllers/admin/adminOrderController';
import { protect } from '../../middleware/authMiddleware';
import { adminMiddleware } from '../../middleware/adminMiddleware';

const router = express.Router();

router.use(protect);
router.use(adminMiddleware);

router.get('/', getAllOrders);
router.put('/:id/deliver', markOrderDelivered);

export default router;
