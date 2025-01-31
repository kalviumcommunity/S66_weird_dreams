const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const mongourl=process.env.mongoURL

const connection=async()=>{
    try {
        await mongoose.connect(mongourl,{useNewUrlParser: true,useUnifiedTopology: true,})
        console.log("Connected to mongoDB atlas")
    } catch (error) {
        console.log(error)
    }
}

module.exports={connection}