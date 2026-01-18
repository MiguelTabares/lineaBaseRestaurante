import { Reservation } from '../types/reservation';

// Mock Data
export let reservations: Reservation[] = [
    {
        id: 1,
        customerName: 'María Pérez',
        customerPhone: '3001234567',
        date: '2026-01-20',
        time: '19:00',
        people: 4,
        status: 'confirmed'
    }
];

export const ReservationModel = {
    getAll: () => reservations,

    create: (data: Omit<Reservation, 'id' | 'status'>) => {
        // Validación de disponibilidad muy simple (simulada)
        const isTaken = reservations.some(r => r.date === data.date && r.time === data.time && r.status === 'confirmed');

        if (isTaken) {
            throw new Error('Horario no disponible');
        }

        const newReservation: Reservation = {
            ...data,
            id: Date.now(),
            status: 'confirmed'
        };
        reservations.push(newReservation);
        return newReservation;
    }
};
