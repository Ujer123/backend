// const mongoose = require("mongoose");
import mongoose from 'mongoose'

const productsSchema = mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        gst: {
            type: Number,
            required: true,
        },
        hsn: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
        variantType: {
            type: String,
            required: true,
        },
        position: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        isArchived: { // Corrected the typo here
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const products = mongoose.model('products', productsSchema);
// module.exports = blogs;

export default products;