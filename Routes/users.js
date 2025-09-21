const express = require('express');
const router = express.Router();

// importing users schema
const User = require('../Models/UserModel');


// Routes / CRUD Operation


// Create

router.post('/users', async (req, res) => {
    try {
        const {name, email, isAdmin, agree, photoURL} = req.body;
        const newUser = new User({name, email, isAdmin, agree, photoURL});
        await newUser.save();
        res.status(200).json({
            success: true,
            user: newUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// Read

router.get('/users', async (req, res) => {
    const {email} = req.query;
    try {
        const users = await User.find({email});
        if(!users) {
            return res.status(200).json({
                success: false,
                message: 'user not found'
            })
        }
        res.status(200).json({
            success: true,
            users: users
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// Read single data

router.get('/users/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id); // <-- use await

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            user: user  // not "users"
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Update

router.put('/users/:id', async(req, res) => {
    const {id} = req.params;
    const {updateData} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, {updateData}, {new: true});
        if(!updateUser) {
            res.json({
                message: "User Not Found"
            })
        }
        // but if you have update the user successfully
        res.status(200).json({
            success: true,
            user: updateUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
} )

// Delete

router.delete('/users/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) {
            res.json({
                message: "User Not Found"
            })
        }

        // if user found and deleted successfully 
        res.status(200).json({
            success: true,
            user: deletedUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;