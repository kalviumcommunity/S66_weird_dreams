const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const userValidationSchema = require("../validation/uservalidation");
const dotenv = require('dotenv');

dotenv.config();

/**
 * POST /auth/signup
 * Register a new user with email and password
 */
router.post('/signup', async (req, res) => {
    try {
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                message: "Validation error",
                error: error.message 
            });
        }

        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User already exists",
                error: "Email already registered"
            });
        }

        // Hash password with salt rounds
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email,
                username: newUser.username
            },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Error creating user account",
            error: error.message
        });
    }
});

module.exports = router;
