import Products from '../models/product.model.js';
import asyncHandler from 'express-async-handler';


const createProducts = asyncHandler(async (req, res) => {
    try{
        const{slug,title, gst, hsn, price, category, description, variant, variantType, position, status} = req.body;

        if(slug && title && gst && hsn && price && category && description && variant && variantType && position && status){
            const newProducts = new Products({
                slug: slug,
                title: title,
                gst: gst,
                hsn: hsn,
                price: price,
                category: category,
                description: description,
                variant: variant,
                variantType: variantType,
                position: position,
                status: status,
            });

            const createdProducts = await newProducts.save();

            res.json({
                code: 200,
                remark: 'Products created',
            });
        }else{
            res.status(400);
            res.json({
                code: 400,
                remark: 'All things are required',
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

const getProducts = asyncHandler(async(req, res)=>{
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

        const products = await Products.find(filterObject);

        res.json({
            code: 200,
            remark: 'success',
            data: products,
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


const updateProducts = asyncHandler(async (req, res) => {
    try {
        const productsId = req.params.productsId; // Route parameter should match
        const products = await Products.findById(productsId);

        if (products) {
            const { slug,title, gst, hsn, price, category, description, variant, variantType, position, status, archivedToggle } = req.body;
            products.slug = slug || products.slug;
            products.title = title || products.title;
            products.gst = gst || products.gst;
            products.hsn = hsn || products.hsn;
            products.price = price || products.price;
            products.category = category || products.category;
            products.description = description || products.description;
            products.variant = variant || products.variant;
            products.variantType = variantType || products.variantType;
            products.position = position || products.position;
            products.status = status || products.status;
            products.isArchived = archivedToggle === undefined ? products.isArchived : archivedToggle;

            await products.save();

            res.json({
                code: 200,
                remark: 'products updated',
            });
        } else {
            res.status(404).json({
                code: 404,
                remark: 'products not found',
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




const deleteProducts = asyncHandler(async (req, res) => {
    try {
        const productsId = req.params.productsId; // Use productsId from the route
        console.log(`Deleting products with ID: ${productsId}`);

        const products = await Products.findByIdAndDelete(productsId);

        if (!products) {
            return res.status(404).json({
                code: 404,
                remark: 'Products not found',
            });
        }

        res.json({
            code: 200,
            remark: 'Products deleted',
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            code: 500,
            remark: 'Failed to delete products',
        });
    }
});


const getProductId = asyncHandler(async (req, res) => {
    try {
        const productsId = req.params.id;
        const products = await Products.findById(productsId);

        if (!products) {
            return res.status(404).json({
                code: 404,
                remark: 'Products not found',
            });
        }

        res.json({
            code: 200,
            remark: 'success',
            data: products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            remark: 'failed',
        });
    }
});


export {createProducts, deleteProducts, getProducts, updateProducts, getProductId};