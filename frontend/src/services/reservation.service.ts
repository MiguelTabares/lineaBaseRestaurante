import type { Reservation } from '../types/reservation';

const API_URL = 'http://localhost:4000/api/reservations';

export const getReservations = async (): Promise<Reservation[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error cargando reservas');
    return response.json();
};

export const createReservation = async (data: Omit<Reservation, 'id' | 'status'>): Promise<Reservation> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.status === 409) throw new Error('Horario no disponible');
    if (!response.ok) throw new Error('Error creando reserva');

    return response.json();
};
