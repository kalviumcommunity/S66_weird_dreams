const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const mongourl=process.env.mongoURL

const connection=mongoose.connect(mongourl)
        

module.exports={connection}