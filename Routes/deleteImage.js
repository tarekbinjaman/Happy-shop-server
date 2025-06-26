const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinary'); //config file

router.post('/delete-image', async (req, res) => {
    const {public_id} = req.body;
    if(!public_id) {
        return res.status(400).json({error: 'public_id is required'});
    }

    try {
        await cloudinary.uploader.destroy(public_id);
        res.status(200).json({success: true, message: 'Image delted'});
    } catch (err) {
        console.error('Cloudinary delte error:', err);
        res.status(500).json({error: 'Delte failed'});
    }
});

module.exports = router;