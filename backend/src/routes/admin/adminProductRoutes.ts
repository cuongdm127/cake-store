import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/admin/adminProductController';
import { protect } from '../../middleware/authMiddleware';
import {adminMiddleware} from '../../middleware/adminMiddleware';

const router = express.Router();

router.use(protect, adminMiddleware);

router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
