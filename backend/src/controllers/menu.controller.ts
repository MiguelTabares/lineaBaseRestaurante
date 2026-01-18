import { Request, Response } from 'express';
import { MenuModel } from '../models/menu.model';

export const getMenu = (req: Request, res: Response) => {
    const products = MenuModel.getAllProducts();
    const categories = MenuModel.getAllCategories();
    res.json({ categories, products });
};

export const addProduct = (req: Request, res: Response) => {
    try {
        const { name, description, price, categoryId, available, image } = req.body;

        // Validación básica
        if (!name || !price || !categoryId) {
            res.status(400).json({ message: 'Datos incompletos' });
            return;
        }

        const newProduct = MenuModel.addProduct({
            name, description, price, categoryId, available: available ?? true, image
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
};

export const updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = MenuModel.updateProduct(Number(id), req.body);

    if (!updated) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
    }

    res.json(updated);
};

export const deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const success = MenuModel.deleteProduct(Number(id));

    if (!success) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
    }

    res.json({ message: 'Producto eliminado correctamente' });
};
