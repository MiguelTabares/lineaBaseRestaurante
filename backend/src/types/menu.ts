export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    available: boolean;
    image?: string; // URL opcional
}

export interface Category {
    id: number;
    name: string;
}
