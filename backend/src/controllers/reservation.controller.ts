import { Request, Response } from 'express';
import { ReservationModel } from '../models/reservation.model';

export const getReservations = (req: Request, res: Response) => {
    const reservations = ReservationModel.getAll();
    res.json(reservations);
};

export const createReservation = (req: Request, res: Response) => {
    try {
        const { customerName, customerPhone, date, time, people } = req.body;

        if (!customerName || !date || !time || !people) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newReservation = ReservationModel.create({
            customerName, customerPhone, date, time, people
        });

        res.status(201).json(newReservation);
    } catch (error: any) {
        if (error.message === 'Horario no disponible') {
            res.status(409).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error creando reserva' });
        }
    }
};
