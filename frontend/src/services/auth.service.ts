import type { LoginResponse } from '../types/user';

const API_URL = 'http://localhost:4000/api/auth';

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en autenticación');
    }

    return response.json();
};
