import { Router } from 'express';
import { getReservations, createReservation } from '../controllers/reservation.controller';

const router = Router();

router.get('/', getReservations);
router.post('/', createReservation);

export default router;
