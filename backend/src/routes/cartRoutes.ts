import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserCart, saveUserCart, clearUserCart } from '../controllers/cartController';

const router = express.Router();

router.use(protect);

router.get('/', getUserCart);      // Get saved cart
router.post('/', saveUserCart);    // Save or update cart
router.delete('/', clearUserCart); // Clear cart (optional)

export default router;
