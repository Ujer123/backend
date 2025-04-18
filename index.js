import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bodyParser from "body-parser";
import blogsRouter from './routes/blogs.routes.js';
import productsRouter from './routes/product.routes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import paymentRoutes from './routes/paymentRoutes.js'
import connectDB from "./db/connectdb.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing JSON bodies
connectDB();

app.use('/auth', authRoutes);
app.use('/blogs', blogsRouter);
app.use('/products', productsRouter);
app.use('/payment', paymentRoutes);

app.get('/profile', authMiddleware, (req, res) => {
    res.send(`Welcome ${req.user.name}, this is your profile.`);
});

app.get('/products', authMiddleware, (req, res) => {    
    res.send('Here are your products');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
