import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getPaginatedUsers,
  getUserById,
  updateUser
} from '../../controllers/admin/adminUserController';
import { protect } from '../../middleware/authMiddleware';
import { adminMiddleware } from '../../middleware/adminMiddleware';

const router = express.Router();

router.use(protect, adminMiddleware);

// router.get('/', getAllUsers);
router.get('/',getPaginatedUsers);
router.get('/:id', getUserById);
router.put('/:id/role', updateUserRole);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
