const express=require('express')
const app=express()
const mongoose=require('mongoose')
const PORT=8080
const dotenv=require('dotenv')
dotenv.config()
const user=require('./model/user.model');
app.use(express.json())
const connectDB=require('./database')
connectDB();

app.get('/', async(req,res)=>{
    const status = mongoose.connection.readyState === 1 ? "Database Connected" : "Error Conecting to database";
    res.json({ message: "Welcome to the ASAP", database: status });
})

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
    console.log(`Server is running on http://localhost:${PORT}`);
})