import { Router } from 'express';
import {
  getAllSoldiers,
  getSoldierById,
  createSoldier,
  updateSoldier,
  deleteSoldier,
  getSoldierStats
} from '../controllers/soldierController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getAllSoldiers);
router.get('/stats', getSoldierStats);
router.get('/:id', getSoldierById);
router.post('/', createSoldier);
router.put('/:id', updateSoldier);
router.delete('/:id', deleteSoldier);

export default router;
