export type Role = 'client' | 'waiter' | 'admin';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // En producción esto debe ser hash
    role: Role;
}
