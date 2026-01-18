import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model';

export const getDailyReport = (req: Request, res: Response) => {
    const allOrders = OrderModel.getAll();

    // Filtrar órdenes pagadas (ventas reales)
    const paidOrders = allOrders.filter(o => o.status === 'paid');

    // Calcular totales
    const totalSales = paidOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = paidOrders.length;

    // Ticket promedio
    const averageTicket = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Productos más vendidos (Simulación simple)
    const productCount: Record<string, number> = {};
    paidOrders.forEach(order => {
        order.items.forEach(item => {
            productCount[item.productName] = (productCount[item.productName] || 0) + item.quantity;
        });
    });

    res.json({
        date: new Date().toISOString().split('T')[0],
        totalSales,
        totalOrders,
        averageTicket,
        topProducts: Object.entries(productCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, quantity]) => ({ name, quantity }))
    });
};
