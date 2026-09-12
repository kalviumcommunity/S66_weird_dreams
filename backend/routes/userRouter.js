const express = require('express');
const router = express.Router();
const User = require('../model/user.model');
const userValidationSchema = require("../validation/uservalidation");
const { authenticate } = require('../middleware/authenticate');
const bcryptjs = require('bcryptjs');

/**
 * GET /api/users
 * Get all users (public list - consider restricting in production)
 */
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            message: "Users retrieved successfully",
            users,
            count: users.length
        });
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({
            message: "Could not retrieve users",
            error: error.message
        });
    }
});

/**
 * POST /api/create
 * Create a new user (deprecated - use /auth/signup instead)
 * This endpoint is kept for backward compatibility
 */
router.post('/create', async (req, res) => {
    try {
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                error: error.message
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                error: "Email already registered"
            });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        const new_user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await new_user.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: new_user._id,
                username: new_user.username,
                email: new_user.email
            }
        });
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({
            message: "Could not create a new user",
            error: error.message
        });
    }
});

/**
 * GET /api/users/:id
 * Get a specific user by ID (public)
 */
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({
            message: "Could not retrieve the user",
            error: error.message
        });
    }
});

/**
 * PUT /api/users/:id
 * Update user profile (authenticated user can only update themselves)
 */
router.put('/users/:id', authenticate, async (req, res) => {
    try {
        // Security: Users can only update their own profile
        if (req.user.userId !== req.params.id) {
            return res.status(403).json({
                message: "Forbidden",
                error: "You can only update your own profile"
            });
        }

        // Allow updating username and email, but not password via this endpoint
        const { username, email } = req.body;
        const updateData = {};

        if (username) updateData.username = username;
        if (email) {
            // Check if new email is already taken
            const existingUser = await User.findOne({ 
                email: email,
                _id: { $ne: req.params.id }
            });
            if (existingUser) {
                return res.status(409).json({
                    message: "Email already in use",
                    error: "This email is already registered"
                });
            }
            updateData.email = email;
        }

        const updated_user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updated_user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updated_user
        });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({
            message: "Could not update the user",
            error: error.message
        });
    }
});

/**
 * DELETE /api/users/:id
 * Delete a user account (authenticated user can only delete themselves)
 */
router.delete('/users/:id', authenticate, async (req, res) => {
    try {
        // Security: Users can only delete their own account
        if (req.user.userId !== req.params.id) {
            return res.status(403).json({
                message: "Forbidden",
                error: "You can only delete your own account"
            });
        }

        const deleted_user = await User.findByIdAndDelete(req.params.id);

        if (!deleted_user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User account deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({
            message: "Could not delete the user",
            error: error.message
        });
    }
});

module.exports = router;