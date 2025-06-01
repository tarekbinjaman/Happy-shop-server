const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/jwt', async(req, res) => {
    const email = req.body;
    const token = jwt.sign(email, process.env.JWT_SECRET, {
        expiresIn: '365d',
    });
    res
    .cookie('token', token, {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .send({success: true});
});

module.exports = router;