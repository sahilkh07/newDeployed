const jwt = require("jsonwebtoken")
require('dotenv').config()
const authenticator=(req,res,next)=>{

    try {
        
    const token=req?.headers?.authorization
   

    if(!token){
        res.status(401).json({msg:"Not Authorized"})
    }else{
        const token=req.headers.authorization.split(" ")[1]

        const isTokenValid=jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(!isTokenValid){
            res.status(401).json({msg:"Not Authorized"})
        }else{
            req.body.userId=isTokenValid.userId
            next()
        }
    }
} catch (error) {
        res.status(401).json({msg:error.message})
}
}
module.exports={authenticator}