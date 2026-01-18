import { Request, Response } from 'express';
import { findUserByEmail } from '../models/user.model';

export const login = (req: Request, res: Response): void => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son requeridos' });
        return;
    }

    const user = findUserByEmail(email);

    // Validación simple para línea base (sin hash real aún)
    if (user && user.password === password) {
        const { password, ...userWithoutPassword } = user;
        res.json({
            message: 'Login exitoso',
            user: userWithoutPassword,
            token: 'mock-jwt-token-xyz-123' // Simulación de token
        });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};
