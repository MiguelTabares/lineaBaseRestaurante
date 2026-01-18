import { Order, OrderStatus } from '../types/order';

// Mock Data
export let orders: Order[] = [
    {
        id: 1705520000000,
        tableNumber: 5,
        status: 'pending',
        items: [
            { productId: 1, productName: 'Tequeños', quantity: 2, price: 12000 },
            { productId: 3, productName: 'Limonada de Coco', quantity: 2, price: 15000 }
        ],
        total: 54000,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export const OrderModel = {
    getAll: () => {
        // Ordenar por más reciente primero
        return [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },

    getById: (id: number) => {
        return orders.find(o => o.id === id);
    },

    create: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
        const newOrder: Order = {
            ...orderData,
            id: Date.now(),
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        orders.push(newOrder);
        return newOrder;
    },

    updateStatus: (id: number, status: OrderStatus) => {
        const index = orders.findIndex(o => o.id === id);
        if (index === -1) return null;

        orders[index] = {
            ...orders[index],
            status,
            updatedAt: new Date()
        };
        return orders[index];
    }
};
