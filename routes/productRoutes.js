import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/productsController.js';

const router = express.Router()
router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct)

export default router