import { Router } from 'express';
import {
  getAllNotifications,
  createNotification,
  markAsRead,
  deleteNotification
} from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getAllNotifications);
router.post('/', createNotification);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;
