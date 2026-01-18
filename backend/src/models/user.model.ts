import { User } from '../types/user';

// Mock Database simulando usuarios iniciales para la línea base
export const users: User[] = [
    { id: 1, name: 'Administrador Principal', email: 'admin@sigr.com', password: 'admin', role: 'admin' },
    { id: 2, name: 'Juan Mesero', email: 'waiter@sigr.com', password: 'waiter', role: 'waiter' },
    { id: 3, name: 'Cliente Frecuente', email: 'client@sigr.com', password: 'client', role: 'client' },
];

export const findUserByEmail = (email: string): User | undefined => {
    return users.find(u => u.email === email);
};
