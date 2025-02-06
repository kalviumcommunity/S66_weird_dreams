const express=require('express')
const router = require('./routes/routes')
const { connection } = require('./database')

const app=express()

const PORT=8080
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)

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