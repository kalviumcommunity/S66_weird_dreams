const express=require('express')
const router=express.Router()
const Dream=require('../model/dream.model')

router.post('/create', async (req, res) => {
    try {
        const { userId, title, description, date, emotions, lucid, nightmare, recurring, tags } = req.body;
        const newDream = new Dream({
            userId,
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

module.exports=router