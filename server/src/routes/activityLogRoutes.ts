import { Router } from 'express';
import {
  getAllActivityLogs,
  createActivityLog
} from '../controllers/activityLogController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getAllActivityLogs);
router.post('/', createActivityLog);

export default router;
