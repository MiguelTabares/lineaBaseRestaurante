export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'paid';

export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    tableNumber: number; // 0 para delivery/barra
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}
