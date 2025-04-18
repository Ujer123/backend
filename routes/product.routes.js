// const express = require('express');
// const { createBlogs, getBlogs, updateBlogs, deleteBlogs } = require('../controllers/blog.controller');
import express from 'express';
import { createProducts, getProducts, updateProducts, deleteProducts, getProductId } from '../controllers/product.controller.js';

const router = express.Router();

// Middleware to inject the productsDB connection into the controllers
router.use((req, res, next) => {
    req.db = router.productsDB;
    next();
});

router.route('/')
    .post(createProducts)
    .get(getProducts);

router.route('/:productsId')
    .put(updateProducts)
    .delete(deleteProducts);

router.get('/:id', getProductId)

// module.exports = router;
export default router;
