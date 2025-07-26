const express = require('express');
const router = express.Router();

const Products = require('../Models/ProductModel');

// CRUD operation

// create 

router.post('/products', async (req, res) => {
    try {
        const data = req.body;
        const newProduct = new Products(data);
        await newProduct.save();
        res.status(200).json({
            success: true,
            user: newProduct
        })

    } catch (err) {
        console.log('Product creation error', err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// read

router.get('/products', async (req, res) => {
    try {
        const query = {};
        if (req.query.minPrice || req.query.maxPrice) {
            query.finalPrice = {};
            const min = parseFloat(req.query.minPrice);
            const max = parseFloat(req.query.maxPrice);
            if (!isNaN(min)) query.finalPrice.$gte = min;
            if (!isNaN(max)) query.finalPrice.$lte = max;
        }
        if(req.query.gender) {
            query.gender = {$in: req.query.gender.split(',')};
        }
        if(req.query.brand) {
            query.brand = {$in: req.query.brand.split(',')};
        }
        if(req.query.fitType) {
            query.fitType = {$in: req.query.fitType.split(',')};
        }
        if(req.query.materials) {
            query.materials = {$in: req.query.materials.split(',')};
        }
        const products = await Products.find(query);
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'products not found'
            })
        }
        res.status(200).json({
            success: true,
            products: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// update
router.put('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedProduct = await Products.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document
            runValidators: true // validate based on schema
        });
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'product updated successfully',
            product: updatedProduct
        })
    } catch (err) {
        console.error('Update Error', err)
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// delete

router.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deltedProduct = await Products.findByIdAndDelete(id);
        if (!deltedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: 'Product delted successfully',
            deltedProduct
        });
    } catch (err) {
        console.error(err.message);
        res.send(500).json({
            success: false,
            message: 'Product delete failed!'
        })
    }
})

module.exports = router;