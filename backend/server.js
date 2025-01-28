const express=require('express')
const app=express()
const mongoose=require('mongoose')
const PORT=8080
const dotenv=require('dotenv')
dotenv.config()
const mongourl=process.env.mongoURL
const connection=mongoose.connect(mongourl);
const user=require('./model/user.model');

app.use(express.json())

app.get('/ping',(req, res)=>{
    res.send('pong');
})

app.post('/create',async(req, res)=>{
    let {username, email, password}=req.body;
    let payload={username,email,password}
    console.log(payload)
    try{
        let new_user=new user(payload)
        await new_user.save()
        res.send({"message":"Hurray! New user saved to Database successfully"})
    }catch(error){
        console.log(error)
        res.send({"message":"Could'nt save the new user to database",error:error.message})
    }
})

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Connected to mongoDB atlas")
    } catch (error) {
        console.log(err)
    }
    
    console.log(`Server is running on http://localhost:${PORT}`);
})