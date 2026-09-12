const express = require('express');
const router = express.Router();
const Dream = require('../model/dream.model');
const dreamValidationSchema = require("../validation/dreamvalidation");
const { authenticate } = require('../middleware/authenticate');

/**
 * POST /dream/create
 * Create a new dream entry for the authenticated user
 */
router.post('/create', authenticate, async (req, res) => {
    try {
        const { error } = dreamValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                message: "Validation error",
                error: error.message 
            });
        }

        const { title, description, date, emotions, lucid, nightmare, recurring, tags } = req.body;
        
        // Use authenticated user's ID
        const newDream = new Dream({
            userId: req.user.userId,
            title,
            description,
            date: date || new Date(),
            emotions,
            lucid,
            nightmare,
            recurring,
            tags,
        });

        await newDream.save();
        
        res.status(201).json({ 
            message: "Dream entry saved successfully!", 
            dream: newDream 
        });
    } catch (error) {
        console.error("Create dream error:", error);
        res.status(500).json({ 
            message: "Error saving dream entry", 
            error: error.message 
        });
    }
});

/**
 * GET /dream/my-dreams
 * Get all dreams for the authenticated user
 */
router.get('/my-dreams', authenticate, async (req, res) => {
    try {
        const dreams = await Dream.find({ userId: req.user.userId })
            .sort({ date: -1 });
        
        res.status(200).json({
            message: "Dreams retrieved successfully", 
            dreams,
            count: dreams.length
        });
    } catch (error) {
        console.error("Get user dreams error:", error);
        res.status(500).json({ 
            message: "Error retrieving dream entries", 
            error: error.message 
        });
    }
});

/**
 * GET /dream/get
 * Private feed — requires login. Returns dreams with author info.
 */
router.get('/get', authenticate, async (req, res) => {
    try {
        const dreams = await Dream.find()
            .populate('userId', 'username email')
            .sort({ date: -1 });
        
        res.status(200).json({
            message: "Dreams retrieved successfully", 
            dreams,
            count: dreams.length
        });
    } catch (error) {
        console.error("Get all dreams error:", error);
        res.status(500).json({ 
            message: "Error retrieving dream entries", 
            error: error.message 
        });
    }
});

/**
 * GET /dream/get/:userId
 * Get dreams for a specific user. Requires login; a user can only
 * view their own dreams (ownership check).
 */
router.get('/get/:userId', authenticate, async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (userId !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "Forbidden",
                error: "You can only view your own dreams"
            });
        }

        const dreams = await Dream.find({ userId })
            .sort({ date: -1 });

        res.status(200).json({
            message: "Dreams retrieved successfully",
            dreams,
            count: dreams.length
        });
    } catch (error) {
        console.error("Get user dreams error:", error);
        res.status(500).json({ 
            message: "Error retrieving dream entries", 
            error: error.message 
        });
    }
});

/**
 * GET /dream/get-dream/:dreamId
 * Get a single dream by ID (with ownership check)
 */
router.get('/get-dream/:dreamId', authenticate, async (req, res) => {
    try {
        const { dreamId } = req.params;

        if (!dreamId) {
            return res.status(400).json({ 
                message: "Dream ID is required" 
            });
        }

        const dream = await Dream.findById(dreamId)
            .populate('userId', 'username email');

        if (!dream) {
            return res.status(404).json({ 
                message: "Dream entry not found" 
            });
        }

        const ownerId = dream.userId?._id ? dream.userId._id.toString() : dream.userId.toString();
        if (ownerId !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "Forbidden",
                error: "You can only view your own dreams"
            });
        }

        res.status(200).json({ 
            message: "Dream retrieved successfully", 
            dream 
        });
    } catch (error) {
        console.error("Get dream error:", error);
        res.status(500).json({ 
            message: "Error retrieving dream entry", 
            error: error.message 
        });
    }
});

/**
 * PUT /dream/update-dream/:dreamId
 * Update a dream (only owner can update)
 */
router.put('/update-dream/:dreamId', authenticate, async (req, res) => {
    try {
        const { dreamId } = req.params;
        const { title, description, date, emotions, lucid, nightmare, recurring, tags } = req.body;

        if (!dreamId) {
            return res.status(400).json({ 
                message: "Dream ID is required" 
            });
        }

        // Check if dream exists
        const dream = await Dream.findById(dreamId);
        if (!dream) {
            return res.status(404).json({ 
                message: "Dream entry not found" 
            });
        }

        // Check ownership - only the creator can update
        if (dream.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ 
                message: "Forbidden",
                error: "You can only update your own dreams" 
            });
        }

        const payload = { title, description, date, emotions, lucid, nightmare, recurring, tags };
        
        const updated_dream = await Dream.findByIdAndUpdate(
            dreamId, 
            payload, 
            { new: true, runValidators: true }
        );

        res.status(200).json({ 
            message: "Dream entry updated successfully!", 
            dream: updated_dream 
        });
    } catch (error) {
        console.error("Update dream error:", error);
        res.status(500).json({ 
            message: "Error updating dream entry", 
            error: error.message 
        });
    }
});

/**
 * DELETE /dream/delete/:dreamId
 * Delete a dream (only owner can delete)
 */
router.delete('/delete/:dreamId', authenticate, async (req, res) => {
    try {
        const { dreamId } = req.params;

        if (!dreamId) {
            return res.status(400).json({ 
                message: "Dream ID is required" 
            });
        }

        // Check if dream exists
        const dream = await Dream.findById(dreamId);
        if (!dream) {
            return res.status(404).json({ 
                message: "Dream entry not found" 
            });
        }

        // Check ownership - only the creator can delete
        if (dream.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ 
                message: "Forbidden",
                error: "You can only delete your own dreams" 
            });
        }

        const deleted_dream = await Dream.findByIdAndDelete(dreamId);

        res.status(200).json({ 
            message: "Dream entry deleted successfully!", 
            dream: deleted_dream 
        });
    } catch (error) {
        console.error("Delete dream error:", error);
        res.status(500).json({ 
            message: "Error deleting dream entry", 
            error: error.message 
        });
    }
});

module.exports = router;