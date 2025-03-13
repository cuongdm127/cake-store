import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from '../../controllers/admin/adminUserController';
import { protect } from '../../middleware/authMiddleware';
import { adminMiddleware } from '../../middleware/adminMiddleware';

const router = express.Router();

router.use(protect, adminMiddleware);

router.get('/', getAllUsers);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

export default router;
