const express = require('express');
const router = express.Router();

const WishList = require('../Models/WishlistModel');


// CRUD operating

// CREATE


router.post('/wishlist', async(req, res) => {
    try {
        const data = req.body;
        const newWishList = new WishList(data);
        await newWishList.save();
        res.status(200).json({
            success: true,
            wishList: newWishList
        })
    } catch (err) {
        console.log('Wishlist add error', err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// READ

router.get('/wishlist', async(req, res) => {
    try {
        const {email} = req.query;
        if(!email) {
            return res.status(400).json({success: false, message: "Email not found"})
        }
        const wishlist = await WishList.find({userEmail: email});
        if(!wishlist || wishlist.length === 0) {
            return res.status(204).json({
                success: false,
                message: "WishList not found"
            })
        }
        res.status(200).json({
            success: true,
            wishListData: wishlist
        })
    } catch (err) {
        console.log('Wishlist add error', err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// DELETE

router.delete('/wishlist/:id', async(req, res) =>{
    try {
        const id = req.params.id;
        const delteWishList = await WishList.findByIdAndDelete({_id: id});
        if(!delteWishList) {
            return res.status(400).json({message: "Product not found in wishlist"});
        }
        res.status(200).json({
            success: true,
            message: "Product delted from wishlist"
        })
    } catch (err) {
        console.log('Wishlist add error', err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;