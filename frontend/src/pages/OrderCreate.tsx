import React, { useEffect, useState } from 'react';
import { getMenu } from '../services/menu.service';
import { createOrder } from '../services/order.service';
import type { Product, Category } from '../types/menu';
import type { OrderItem } from '../types/order';
import '../index.css';

const OrderCreate: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [tableNumber, setTableNumber] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getMenu().then(data => {
            setCategories(data.categories);
            setProducts(data.products.filter(p => p.available)); // Solo disponibles
        });
    }, []);

    const addToCart = (product: Product) => {
        setCart(currentCart => {
            const existing = currentCart.find(item => item.productId === product.id);
            if (existing) {
                return currentCart.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentCart, { productId: product.id, productName: product.name, price: product.price, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(currentCart => currentCart.filter(item => item.productId !== productId));
    };

    const handleCreateOrder = async () => {
        if (cart.length === 0) return;
        setIsSubmitting(true);
        try {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            await createOrder(tableNumber, cart, total);
            alert('¡Orden Creada Exitosamente!');
            setCart([]);
        } catch (error) {
            alert('Error creando orden');
        } finally {
            setIsSubmitting(false);
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const filteredProducts = selectedCategory === 0 ? products : products.filter(p => p.categoryId === selectedCategory);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', height: '100vh', overflow: 'hidden' }}>
            {/* Columna Izquierda: Menú */}
            <div style={{ padding: '2rem', overflowY: 'auto', background: 'var(--background-color)' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>🍽 Tomar Pedido</h2>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    <button
                        onClick={() => setSelectedCategory(0)}
                        className="btn"
                        style={{
                            background: selectedCategory === 0 ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: selectedCategory === 0 ? 'white' : 'var(--text-secondary)',
                            border: '1px solid #334155'
                        }}
                    >
                        Todos
                    </button>
                    {categories.map(cat => (
                        <button key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className="btn"
                            style={{
                                background: selectedCategory === cat.id ? 'var(--primary-color)' : 'var(--surface-color)',
                                color: selectedCategory === cat.id ? 'white' : 'var(--text-secondary)',
                                border: '1px solid #334155'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                    {filteredProducts.map(product => (
                        <div key={product.id}
                            onClick={() => addToCart(product)}
                            style={{
                                background: 'var(--surface-color)',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                border: '1px solid #334155',
                                transition: 'transform 0.1s'
                            }}
                            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h4 style={{ marginBottom: '0.5rem' }}>{product.name}</h4>
                            <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>${product.price.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Columna Derecha: Resumen Orden */}
            <div style={{
                background: 'var(--surface-color)',
                padding: '2rem',
                borderLeft: '1px solid #334155',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label className="input-label">Número de Mesa</label>
                    <input
                        type="number"
                        className="input-field"
                        value={tableNumber}
                        onChange={e => setTableNumber(Number(e.target.value))}
                        min="1"
                        style={{ fontSize: '1.5rem', padding: '1rem', textAlign: 'center' }}
                    />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>Orden vacía</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                                <div>
                                    <p style={{ fontWeight: '500' }}>{item.productName}</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.quantity} x ${item.price}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p>${(item.quantity * item.price).toLocaleString()}</p>
                                    <button onClick={() => removeFromCart(item.productId)} style={{ color: '#ef4444', background: 'none', fontSize: '0.8rem', marginTop: '0.2rem' }}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{ borderTop: '2px solid #334155', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <span>Total:</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}
                        disabled={cart.length === 0 || isSubmitting}
                        onClick={handleCreateOrder}
                    >
                        {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderCreate;
