import React, { useEffect, useState } from 'react';
import { getReservations, createReservation } from '../services/reservation.service';
import type { Reservation } from '../types/reservation';

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [formData, setFormData] = useState({
        customerName: '', customerPhone: '', date: '', time: '', people: 2
    });
    const [loading, setLoading] = useState(false);

    const loadReservations = async () => {
        try {
            const data = await getReservations();
            setReservations(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createReservation(formData);
            alert('Reserva Confirmada');
            setFormData({ customerName: '', customerPhone: '', date: '', time: '', people: 2 }); // Reset
            loadReservations();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>📅 Gestión de Reservas</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                {/* Formulario */}
                <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155', height: 'fit-content' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Nueva Reserva</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Nombre Cliente</label>
                            <input className="input-field" required value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Teléfono</label>
                            <input className="input-field" required value={formData.customerPhone} onChange={e => setFormData({ ...formData, customerPhone: e.target.value })} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label className="input-label">Fecha</label>
                                <input type="date" className="input-field" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Hora</label>
                                <input type="time" className="input-field" required value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Personas</label>
                            <input type="number" min="1" className="input-field" required value={formData.people} onChange={e => setFormData({ ...formData, people: Number(e.target.value) })} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Procesando...' : 'Confirmar Reserva'}
                        </button>
                    </form>
                </div>

                {/* Listado */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem' }}>Próximas Reservas</h2>
                    {reservations.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No hay reservas registradas.</p> : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {reservations.map(res => (
                                <div key={res.id} style={{
                                    background: 'var(--surface-color)',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    borderLeft: '4px solid var(--primary-color)',
                                    border: '1px solid #334155',
                                    borderLeftWidth: '4px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem' }}>{res.customerName}</h3>
                                        <span style={{ background: '#10b98120', color: '#10b981', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                                            {res.status}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        📅 {res.date} a las {res.time} • 👥 {res.people} pers.
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                        📞 {res.customerPhone}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reservations;
