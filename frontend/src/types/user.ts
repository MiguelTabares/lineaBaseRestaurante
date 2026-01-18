export type Role = 'client' | 'waiter' | 'admin';

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface LoginResponse {
    message: string;
    user: User;
    token: string;
}
