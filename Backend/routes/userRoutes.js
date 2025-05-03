// routes/userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Your User model

const router = express.Router();

// POST: Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Return a success response
        res.json({ message: 'Login successful', user: user });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
