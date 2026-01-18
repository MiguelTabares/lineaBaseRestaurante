import React, { useEffect, useState } from 'react';
import { getMenu, toggleProductAvailability, deleteProduct, addProduct } from '../services/menu.service';
import type { Category, Product } from '../types/menu';
import { useAuth } from '../context/AuthContext';

const MenuPage: React.FC = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0); // 0 = Todos
    const [loading, setLoading] = useState(true);

    // Estado para formulario simple (Línea Base)
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({ categoryId: 1, available: true });

    const loadMenu = async () => {
        try {
            const data = await getMenu();
            setCategories(data.categories);
            setProducts(data.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMenu();
    }, []);

    const handleToggle = async (id: number, currentStatus: boolean) => {
        await toggleProductAvailability(id, currentStatus);
        loadMenu(); // Recargar para ver cambios
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este plato?')) return;
        await deleteProduct(id);
        loadMenu();
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newProduct.name && newProduct.price) {
            await addProduct(newProduct as Omit<Product, 'id'>);
            setShowAddForm(false);
            setNewProduct({ categoryId: 1, available: true });
            loadMenu();
        }
    };

    const filteredProducts = selectedCategory === 0
        ? products
        : products.filter(p => p.categoryId === selectedCategory);

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Cargando menú...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Menú Digital</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona tus platos y disponibilidad</p>
                </div>
                {user?.role === 'admin' && (
                    <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Cancelar' : '+ Nuevo Plato'}
                    </button>
                )}
            </header>

            {/* Categorías (Tabs) */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button
                    onClick={() => setSelectedCategory(0)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        background: selectedCategory === 0 ? 'var(--primary-color)' : 'var(--surface-color)',
                        color: selectedCategory === 0 ? 'white' : 'var(--text-secondary)',
                        border: '1px solid ' + (selectedCategory === 0 ? 'transparent' : '#334155'),
                        whiteSpace: 'nowrap'
                    }}
                >
                    Todos
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            background: selectedCategory === cat.id ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: selectedCategory === cat.id ? 'white' : 'var(--text-secondary)',
                            border: '1px solid ' + (selectedCategory === cat.id ? 'transparent' : '#334155'),
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Formulario Rápido (Solo Admin) */}
            {showAddForm && (
                <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid #334155' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Nuevo Producto</h3>
                    <form onSubmit={handleAddSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input required className="input-field" placeholder="Nombre del plato" onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                        <input required className="input-field" type="number" placeholder="Precio" onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                        <input className="input-field" placeholder="Descripción" style={{ gridColumn: 'span 2' }} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                        <input className="input-field" placeholder="URL Imagen (Opcional)" style={{ gridColumn: 'span 2' }} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
                        <select className="input-field" onChange={e => setNewProduct({ ...newProduct, categoryId: Number(e.target.value) })}>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <button type="submit" className="btn btn-primary">Guardar Producto</button>
                    </form>
                </div>
            )}

            {/* Grid de Productos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {filteredProducts.map(product => (
                    <div key={product.id} style={{
                        background: 'var(--surface-color)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        border: '1px solid #334155',
                        opacity: product.available ? 1 : 0.6,
                        transition: 'transform 0.2s'
                    }}>
                        <div style={{ height: '160px', background: '#334155', backgroundImage: `url(${product.image || 'https://via.placeholder.com/300'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        <div style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontWeight: '600', fontSize: '1.1rem' }}>{product.name}</h3>
                                <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>${product.price.toLocaleString()}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', minHeight: '2.5rem' }}>
                                {product.description}
                            </p>

                            {user?.role === 'admin' && (
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                                    <button
                                        onClick={() => handleToggle(product.id, product.available)}
                                        style={{
                                            flex: 1,
                                            padding: '0.5rem',
                                            borderRadius: 'var(--radius-sm)',
                                            background: product.available ? '#f59e0b20' : '#10b98120',
                                            color: product.available ? '#f59e0b' : '#10b981',
                                            border: '1px solid currentColor',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        {product.available ? 'Pausar' : 'Activar'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: 'var(--radius-sm)',
                                            background: '#ef444420',
                                            color: '#ef4444',
                                            border: '1px solid currentColor',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
