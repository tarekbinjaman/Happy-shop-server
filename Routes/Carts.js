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
        const cartList = await Carts.find();
        if(!cartList || cartList.length === 0) {
            return res.status(404).json({
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

module.exports = router;