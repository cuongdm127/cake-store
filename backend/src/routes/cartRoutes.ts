import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserCart, saveUserCart, clearUserCart } from '../controllers/cartController';

const router = express.Router();

router.get('/', protect, getUserCart);      // Get saved cart
router.post('/', protect, saveUserCart);    // Save or update cart
router.delete('/', protect, clearUserCart); // Clear cart (optional)

export default router;
