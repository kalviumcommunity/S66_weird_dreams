const express=require('express')
const userRouter = require('./routes/userRouter')
const dreamRouter = require('./routes/dreamRouter')
const { connection } = require('./database')
const cors=require('cors')
const app=express()

const PORT=8080
app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use('/api', userRouter)
app.use('/dream', dreamRouter)

app.get('/ping',(req, res)=>{
    res.send('pong');
})

app.listen(PORT,async()=>{
    try{
        await connection;
        console.log("MongoDB Connected")
    }catch(error){
        console.log(error)
    }
    console.log(`Server is running on http://localhost:${PORT}`);
})