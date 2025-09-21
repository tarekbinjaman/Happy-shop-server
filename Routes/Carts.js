const express = require('express');
const router = express.Router();

const Carts = require('../Models/cartList.js');

// CRUD operation

// CREATE

router.post('/cartList', async(req, res) => {
    try {
        const data = req.body;
        const newCartLIst = new Carts(data);
        await newCartLIst.save();
        res.status(200).json({
            success: true,
            cart: newCartLIst
        })
    } catch (err) {
        console.log('Cart creation errro', err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// READ

router.get('/cartList', async(req, res) => {
    try {
        const {email} = req.query;
        if(!email) {
            return res.status(400).json({success: false, message: "Email is required"})
        }
        const cartList = await Carts.find({userEmail: email});
        if(!cartList || cartList.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'Cart data not found'
            })
        }
        res.status(200).json({
            success: true,
            cartData: cartList
        })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


router.delete('/cartList/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Carts.findOneAndDelete({_id: id});
        if(!deleteProduct) {
            return res.status(400).json({message: "Product not found"});
        }
        res.status(200).json({
            success: true,
            message: 'Product delete from cart successfully'
        });
    } catch (err) {
        console.error(err.message);
        res.send(200).json({
            success: false, 
            message: 'Product delete from cart failed'
        })
    }
})


module.exports = router;