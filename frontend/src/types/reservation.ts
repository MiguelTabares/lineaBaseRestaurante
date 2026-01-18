export interface Reservation {
    id: number;
    customerName: string;
    customerPhone: string;
    date: string;
    time: string;
    people: number;
    status: 'confirmed' | 'cancelled' | 'completed';
}
