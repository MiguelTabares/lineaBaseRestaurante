import { Router } from 'express';
import { getMenu, addProduct, updateProduct, deleteProduct } from '../controllers/menu.controller';

const router = Router();

router.get('/', getMenu);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
