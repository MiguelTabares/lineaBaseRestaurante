import { Product, Category } from '../types/menu';

// Mock Data inicial
export let categories: Category[] = [
    { id: 1, name: 'Entradas' },
    { id: 2, name: 'Platos Fuertes' },
    { id: 3, name: 'Bebidas' },
    { id: 4, name: 'Postres' }
];

export let products: Product[] = [
    {
        id: 1,
        name: 'Tequeños',
        description: 'Dedos de queso con salsa de la casa',
        price: 12000,
        categoryId: 1,
        available: true,
        image: 'https://www.cocinatis.com/receta/tequenos.html'
    },
    {
        id: 2,
        name: 'Hamburguesa Artesanal',
        description: 'Carne 100% res, queso cheddar, vegetales frescos',
        price: 35000,
        categoryId: 2,
        available: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 3,
        name: 'Limonada de Coco',
        description: 'Refrescante limonada con leche de coco',
        price: 15000,
        categoryId: 3,
        available: true,
        image: 'https://www.pasionthermomix.co/limonada-de-coco/'
    }
];

// Métodos CRUD simulados
export const MenuModel = {
    getAllProducts: () => products,
    getAllCategories: () => categories,

    addProduct: (product: Omit<Product, 'id'>) => {
        const newProduct = { ...product, id: Date.now() };
        products.push(newProduct);
        return newProduct;
    },

    updateProduct: (id: number, updates: Partial<Product>) => {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

        products[index] = { ...products[index], ...updates };
        return products[index];
    },

    deleteProduct: (id: number) => {
        const initialLength = products.length;
        products = products.filter(p => p.id !== id);
        return products.length < initialLength;
    }
};
