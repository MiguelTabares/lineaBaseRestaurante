import { Router } from 'express';
import { getDailyReport } from '../controllers/report.controller';

const router = Router();

router.get('/daily', getDailyReport);

export default router;
