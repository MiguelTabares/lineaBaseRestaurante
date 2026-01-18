import type { MenuResponse, Product } from '../types/menu';

const API_URL = 'http://localhost:4000/api/menu';

export const getMenu = async (): Promise<MenuResponse> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error cargando el menú');
    return response.json();
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Error creando producto');
    return response.json();
};

export const toggleProductAvailability = async (id: number, currentStatus: boolean): Promise<Product> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !currentStatus }),
    });
    if (!response.ok) throw new Error('Error actualizando producto');
    return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error eliminando producto');
};
