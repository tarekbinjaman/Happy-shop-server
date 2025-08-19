const express = require('express');
const router = express.Router();

const Review = require('../Models/reviewModel');

// CRUD OPERATION

// CREATE

router.post('/reviews', async (req, res) => {
    try {
        const data = req.body;
        const newReview = new Review(data);
        await newReview.save();
        res.status(200).json({
            success: true,
            review: newReview
        })
    } catch (err) {
        console.log('Review creation error', err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// READ

router.get('/reviews', async(req, res) => {
    try{
        const reviews = await Review.find();
        if(!reviews || reviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'review not found'
            })
        }
        res.status(200).json({
            success: true,
            review: reviews
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;