import type { Order, OrderStatus, OrderItem } from '../types/order';

const API_URL = 'http://localhost:4000/api/orders';

export const getOrders = async (): Promise<Order[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error obteniendo órdenes');
    return response.json();
};

export const createOrder = async (tableNumber: number, items: OrderItem[], total: number): Promise<Order> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableNumber, items, total }),
    });
    if (!response.ok) throw new Error('Error creando orden');
    return response.json();
};

export const updateOrderStatus = async (id: number, status: OrderStatus): Promise<Order> => {
    const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Error actualizando estado');
    return response.json();
};
