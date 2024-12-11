// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: String }, // OTP for password reset
    jwtSecretKey: { type: String }, // Store dynamic secret for the session
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is new/modified
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to compare entered password with the stored hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Optionally, you can add a method for updating OTP or JWT secret
userSchema.methods.updateJwtSecret = async function(secretKey) {
    this.jwtSecretKey = secretKey;
    await this.save();
};

const User = mongoose.model('User', userSchema);
// module.exports = User;
export default User;
