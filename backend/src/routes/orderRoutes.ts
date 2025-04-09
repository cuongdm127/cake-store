import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createOrder, getOrderById, getUserOrders } from '../controllers/orderController';

const router = express.Router();

router.post('/', protect, createOrder); // Place a new order
router.get('/mine', protect, getUserOrders); // Get user's orders
router.get('/:id', protect, getOrderById);

export default router;
