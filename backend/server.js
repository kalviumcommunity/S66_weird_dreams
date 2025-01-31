const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const userRoutes=require('./routes/routes')
const app=express()
const PORT=process.env.port
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

app.use('/api',userRoutes)

app.listen(PORT,async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})