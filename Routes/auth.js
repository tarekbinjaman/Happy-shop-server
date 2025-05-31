const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

// login
router.post('/login', async(req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message: 'User not found'});
        
        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: '365d'});
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json({success: true, user});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    }).json({message: 'Logged out successfully'});
});

module.exports = router