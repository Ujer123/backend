// const express = require('express');
// const { createBlogs, getBlogs, updateBlogs, deleteBlogs } = require('../controllers/blog.controller');
import express from 'express';
import { createBlogs, getBlogs, updateBlogs, deleteBlogs } from '../controllers/blog.controller.js';

const router = express.Router();

// Middleware to inject the productsDB connection into the controllers
router.use((req, res, next) => {
    req.db = router.blogsDB;
    next();
});

router.route('/')
    .post(createBlogs)
    .get(getBlogs);

router.route('/:blogsId')
    .put(updateBlogs)
    .delete(deleteBlogs);

// module.exports = router;
export default router;
