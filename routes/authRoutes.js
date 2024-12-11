// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto'); 
// const User = require('../models/User'); 
import express from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
const router = express.Router();
// import router from 'express'

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;
    
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash password before saving to DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Dynamically generate a JWT secret key for this session
        const jwtSecretKey = crypto.randomBytes(64).toString('hex');

        // Optionally: Store the generated secret in the database for further validation (this is optional)
        user.jwtSecretKey = jwtSecretKey;
        await user.save();

        // Generate token
        const token = jwt.sign({ id: user._id }, jwtSecretKey, { expiresIn: '1h' });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// module.exports = router;
export default router;
