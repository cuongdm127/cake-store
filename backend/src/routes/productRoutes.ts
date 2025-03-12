import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post(',', createProduct);
router.post('/:id', updateProduct);
router.delete('/:id', deleteProduct)

export default router;
