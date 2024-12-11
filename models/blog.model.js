// const mongoose = require("mongoose");
import mongoose from 'mongoose'

const blogsSchema = mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
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
        imageUrl: String,
    },
    {
        timestamps: true,
    }
);

const blogs = mongoose.model('blogs', blogsSchema);
// module.exports = blogs;

export default blogs;