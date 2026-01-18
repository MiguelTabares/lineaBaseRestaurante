export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    available: boolean;
    image?: string;
}

export interface MenuResponse {
    categories: Category[];
    products: Product[];
}
