// const blogs = require('../models/blog.model');
// const asyncHandler = require('express-async-handler');
import Blogs from '../models/blog.model.js';
import asyncHandler from 'express-async-handler';

// @method POST
// @method {string} title - Blogs's title


const createBlogs = asyncHandler(async (req, res) => {
    try{
        const{slug,title, description, position, status} = req.body;

        if(slug && title && description && position && status){
            const newBlogs = new Blogs({
                slug: slug,
                title: title,
                description: description,
                position: position,
                status: status,
            });

            const createdBlogs = await newBlogs.save();

            res.json({
                code: 200,
                remark: 'Blogs created',
            });
        }else{
            res.status(400);
            res.json({
                code: 400,
                remark: 'title and description are required',
            });
        }
    }catch(error){
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: 'internal server error',
        });
        
    }
});

const getBlogs = asyncHandler(async(req, res)=>{
    try{
        let filterObject = {
            isArchived: req.query.isArchived === undefined ? false : req.query.isArchived
        }

        if(req.query.search){
            filterObject.title = {
                $regex: req.query.search,
                $options: 'i'
            }
        }

        const blogs = await Blogs.find(filterObject);

        res.json({
            code: 200,
            remark: 'success',
            data: blogs,
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: 'failed',
        });
        
    }
});


const updateBlogs = asyncHandler(async (req, res) => {
    try {
        const blogsId = req.params.blogsId; // Route parameter should match
        const blogs = await Blogs.findById(blogsId);

        if (blogs) {
            const { slug, title, description,position, status, archivedToggle } = req.body;
            blogs.slug = slug || blogs.slug;
            blogs.title = title || blogs.title;
            blogs.description = description || blogs.description;
            blogs.position = position || blogs.position;
            blogs.status = status || blogs.status;
            blogs.isArchived = archivedToggle === undefined ? blogs.isArchived : archivedToggle;

            await blogs.save();

            res.json({
                code: 200,
                remark: 'blogs updated',
            });
        } else {
            res.status(404).json({
                code: 404,
                remark: 'blogs not found',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            remark: 'failed',
        });
    }
});




const deleteBlogs = asyncHandler(async (req, res) => {
    try {
        const blogsId = req.params.blogsId; // Use blogsId from the route
        console.log(`Deleting blogs with ID: ${blogsId}`);

        const blogs = await Blogs.findByIdAndDelete(blogsId);

        if (!blogs) {
            return res.status(404).json({
                code: 404,
                remark: 'Blogs not found',
            });
        }

        res.json({
            code: 200,
            remark: 'Blogs deleted',
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            code: 500,
            remark: 'Failed to delete blogs',
        });
    }
});


// module.exports = {createBlogs, deleteBlogs, getBlogs, updateBlogs}
export {createBlogs, deleteBlogs, getBlogs, updateBlogs};