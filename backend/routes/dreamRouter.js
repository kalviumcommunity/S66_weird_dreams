const express=require('express')
const router=express.Router()
const Dream=require('../model/dream.model')
const dreamValidationSchema = require("../validation/dreamvalidation");

router.post('/create', async (req, res) => {
    try {
        const { error } = dreamValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const { userId, title, description, date, emotions, lucid, nightmare, recurring, tags } = req.body;
        const newDream = new Dream({
            userId: "6798b05ffa793a218f732d6f",
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
        res.status(201).json({ message: "Dream entry saved successfully!", dream: newDream });
    } catch (error) {
        res.status(500).json({ error: "Error saving dream entry", details: error.message });
    }
});

router.get('/get/:userId', async(req, res)=>{
    try {
        const {userId}=req.params
        const dreams=await Dream.find({userId})
        res.status(200).json({"message":"Dreams retrieved sucessfully", dreams})
    } catch (error) {
        res.status(500).json({ error: "Error retrieving dream entry", details: error.message });
    }
})

router.get('/get-dream/:dreamId', async (req, res) => {
    try {
        const { dreamId } = req.params;
        if (!dreamId) {
            return res.status(400).json({ error: "Dream ID is required" });
        }
        const dream = await Dream.findById(dreamId);
        if (!dream) {
            return res.status(404).json({ error: "Dream entry not found" });
        }
        res.status(200).json({ message: "Dream retrieved successfully", dream });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving dream entry", details: error.message });
    }
});

router.put('/update-dream/:dreamId', async(req, res)=>{
    const {dreamId}=req.params
    const {title, description, date, emotions, lucid, nightmare, recurring, tags }=req.body
    const payload={title, description, date, emotions, lucid, nightmare, recurring, tags }
    try {
        const updated_dream=await Dream.findByIdAndUpdate(dreamId, payload, {new:true} )
        res.status(200).json({ message: "Dream entry updated successfully!", dream: updated_dream });
    } catch (error) {
        res.status(500).json({ error: "Error updating dream entry", details: error.message });
    }
})

router.delete('/delete/:dreamId', async(req, res)=>{
    const {dreamId}=req.params
    try {
        const deleted_dream=await Dream.findByIdAndDelete(dreamId)
        if (!deleted_dream) {
            return res.status(404).json({ error: "Dream entry not found" });
        }
        res.status(200).json({ message: "Dream entry deleted successfully!", dream: deleted_dream});
    } catch (error) {
        res.status(500).json({ error: "Error deleting dream entry", details: error.message })
    }
})

module.exports=router