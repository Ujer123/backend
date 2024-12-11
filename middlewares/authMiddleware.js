// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to authenticate user
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Authentication failed' });

    try {
        // Decode the token to get the user ID
        const decoded = jwt.decode(token); 
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Verify the token using the user's stored JWT secret key
        const verified = jwt.verify(token, user.jwtSecretKey);
        req.user = user;  // Attach user to request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// module.exports = authMiddleware;
export default authMiddleware;
