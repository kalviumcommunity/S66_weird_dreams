const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const userValidationSchema = require("../validation/uservalidation");
const { authenticate } = require('../middleware/authenticate');
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

/**
 * POST /auth/login
 * Authenticate user and issue JWT token
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Validation error",
                error: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
                error: "Invalid email or password"
            });
        }

        // Compare passwords
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Authentication failed",
                error: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username
            },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Error during login",
            error: error.message
        });
    }
});

/**
 * GET /auth/me
 * Get current authenticated user information
 */
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Current user retrieved successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({
            message: "Error retrieving user information",
            error: error.message
        });
    }
});

module.exports = router;
