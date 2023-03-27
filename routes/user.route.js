const {Router}=require("express")

const {User}=require('../models/user.model')
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
require('dotenv').config()
const userRouter= Router()


userRouter.post('/register',async(req,res)=>{

    try {
        const payload = req.body
    

    const user=await User.findOne({email:payload.email})
    console.log(user)

    if(user){
        return res.status(400).send({msg:"User Already Exist"})
    }
    else{
        const hashPassword = bcrypt.hashSync(payload.password, 5);
        payload.password=hashPassword
        const newUser=new User(payload)
        await newUser.save()
        res.status(200).send({msg:"Account Created"})
        
    }
} catch (error) {
        res.status(400).send({msg:error.message})
}
})

userRouter.post('/login',async(req,res)=>{
    try {
        const payload=req.body
        const user=await User.findOne({email:payload.email})
        if(!user){
            return res.status(400).send({msg:"User Doesn't Exist,Please Signup"})
        }
            else{
           const checkCorrect= bcrypt.compareSync(payload.password, user.password);

           if(checkCorrect){
            const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY)

            res.status(200).send({msg:"Login Successfull",token
        })
           }else{
            res.status(400).send({msg:"Invalid Credentials"})
           }
        }

    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
module.exports={userRouter}