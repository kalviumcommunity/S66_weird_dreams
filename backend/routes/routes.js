const express=require('express')
const router=express.Router()
const User=require('../model/user.model')

router.get('/users',async(req, res)=>{
    try {
        const users=await User.find()
        res.status(200).json({"message":"Users retrieved successfully", users})
    } catch (error) {
        res.status(500).json({"message":"Could not find the users", error:error.message})
    }
})

router.post('/users', async(req, res)=>{
    try {
        const new_user=new User(req.body)
        await new_user.save()
        res.status(201).json({"message":"User created successfully", new_user})
    } catch (error) {
        res.status(500).json({"message":"Could not create a new user", error:error.message})
    }
})

router.put('/users/:id', async(req, res)=>{
    try {
        const updated_user=await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!updated_user){
            return res.status(404).json({"message":"User not found"})
        }
        res.status(200).json({"message":"User updated successfully", updated_user})
    } catch (error) {
        res.status(500).json({"message":"Could not update the user", error:error.message})
    }
})

router.delete('/users/:id', async(req, res)=>{
    try {
        const deleted_user=await User.findByIdAndDelete(req.params.id)
        if(!deleted_user){
            return res.status(404).json({"message":"User not found"})
        }
        res.status(200).json({"message":"User deleted seuccessfully", deleted_user})
    } catch (error) {
        res.status(500).json({"message":"Could not delete the user", error:error.message})
    }
})

module.exports=router