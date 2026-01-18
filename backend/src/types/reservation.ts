export interface Reservation {
    id: number;
    customerName: string;
    customerPhone: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    people: number;
    tableNumber?: number;
    status: 'confirmed' | 'cancelled' | 'completed';
}
