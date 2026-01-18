export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'paid';

export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    tableNumber: number;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    createdAt: string;
    updatedAt: string;
}
