import React, { useEffect, useState } from 'react';
import { getDailyReport } from '../services/report.service';
import type { DailyReport } from '../types/report';

const Reports: React.FC = () => {
    const [report, setReport] = useState<DailyReport | null>(null);

    useEffect(() => {
        getDailyReport().then(setReport).catch(console.error);
    }, []);

    if (!report) return <div className="container" style={{ padding: '2rem' }}>Cargando estadísticas...</div>;

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>📈 Reporte Diario: {report.date}</h1>

            {/* KPIs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', color: 'white' }}>
                    <h3 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Ventas Totales</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${report.totalSales.toLocaleString()}</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', color: 'white' }}>
                    <h3 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Pedidos Completados</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{report.totalOrders}</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', color: 'white' }}>
                    <h3 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Ticket Promedio</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${Math.round(report.averageTicket).toLocaleString()}</p>
                </div>
            </div>

            {/* Top Products */}
            <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>🏆 Productos Más Vendidos</h2>
                {report.topProducts.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No hay datos de ventas aún.</p>
                ) : (
                    <ul style={{ listStyle: 'none' }}>
                        {report.topProducts.map((p, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{
                                    width: '30px', height: '30px',
                                    background: idx === 0 ? '#f59e0b' : '#334155',
                                    color: 'white', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', marginRight: '1rem'
                                }}>
                                    {idx + 1}
                                </span>
                                <span style={{ flex: 1, fontWeight: '500' }}>{p.name}</span>
                                <span style={{ fontWeight: 'bold' }}>{p.quantity} un.</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Reports;
