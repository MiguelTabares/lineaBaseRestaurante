import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../types/order';

export const getOrders = (req: Request, res: Response) => {
    const orders = OrderModel.getAll();
    res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
    try {
        const { tableNumber, items, total } = req.body;

        if (tableNumber === undefined || !items || items.length === 0) {
            res.status(400).json({ message: 'La orden debe tener mesa y productos' });
            return;
        }

        const newOrder = OrderModel.create({
            tableNumber,
            items,
            total
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creando la orden' });
    }
};

export const updateOrderStatus = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validar status permitido
        const validStatuses: OrderStatus[] = ['pending', 'preparing', 'ready', 'served', 'paid'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ message: 'Estado inválido' });
            return;
        }

        const updatedOrder = OrderModel.updateStatus(Number(id), status);

        if (!updatedOrder) {
            res.status(404).json({ message: 'Orden no encontrada' });
            return;
        }

        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: 'Error actualizando orden' });
    }
};
