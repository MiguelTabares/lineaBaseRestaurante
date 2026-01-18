import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../services/order.service';
import type { Order } from '../types/order';

const Kitchen: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            // Solo mostramos ordenes activas en cocina (no pagadas ni servidas hace mucho)
            setOrders(data.filter(o => o.status !== 'paid'));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000); // Polling cada 5s
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = async (orderId: number, nextStatus: any) => {
        await updateOrderStatus(orderId, nextStatus);
        fetchOrders();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#ef4444'; // Rojo
            case 'preparing': return '#f59e0b'; // Naranja
            case 'ready': return '#22c55e'; // Verde
            case 'served': return '#3b82f6'; // Azul
            default: return '#64748b';
        }
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>👨‍🍳 Monitor de Cocina</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {orders.map(order => (
                    <div key={order.id} style={{
                        background: 'var(--surface-color)',
                        border: '1px solid #334155',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            background: getStatusColor(order.status),
                            padding: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: 'white' // Asegurar texto blanco sobre fondos de color
                        }}>
                            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Mesa {order.tableNumber}</h2>
                            <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                {order.status}
                            </span>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Hora: {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                                {order.items.map((item, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.5rem', borderBottom: '1px dashed #334155', paddingBottom: '0.5rem' }}>
                                        <b style={{ color: 'var(--primary-color)' }}>{item.quantity}x</b> {item.productName}
                                    </li>
                                ))}
                            </ul>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {order.status === 'pending' && (
                                    <button onClick={() => handleStatusChange(order.id, 'preparing')} className="btn btn-primary" style={{ flex: 1 }}>
                                        Empezar a Preparar
                                    </button>
                                )}
                                {order.status === 'preparing' && (
                                    <button onClick={() => handleStatusChange(order.id, 'ready')} className="btn" style={{ flex: 1, background: '#22c55e', color: 'white' }}>
                                        ¡Listo para Servir!
                                    </button>
                                )}
                                {order.status === 'ready' && (
                                    <button onClick={() => handleStatusChange(order.id, 'served')} className="btn" style={{ flex: 1, background: '#3b82f6', color: 'white' }}>
                                        Marcar Servido
                                    </button>
                                )}
                                {order.status === 'served' && (
                                    <button onClick={() => handleStatusChange(order.id, 'paid')} className="btn" style={{ flex: 1, background: '#334155', color: '#94a3b8', border: '1px solid #94a3b8' }}>
                                        Cerrar (Pagado)
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {orders.length === 0 && <p style={{ textAlign: 'center', color: '#64748b', marginTop: '4rem' }}>No hay órdenes pendientes</p>}
        </div>
    );
};

export default Kitchen;
