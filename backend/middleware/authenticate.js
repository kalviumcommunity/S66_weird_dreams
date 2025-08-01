const jwt= require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const authenticate=(req, res, next)=>{
    const token= req.cookies.token||req.headers?.authorization?.split(" ")[1];
    // console.log(req.headers,token,"@")
    if(token!='null'){
        const decoded=jwt.verify(token, process.env.SECRET_KEY);
        if(decoded){
            let userID=decoded.userID;
            let email=decoded.email;
            req.body.id=userID;
            req.body.email=email;
        }else{
            return res.status(401).json({ message: "Login Pls" });
        }
        next();
    }else{
        return res.status(401).json({ message: "Login Pls" });
    }
}

module.exports={authenticate}
