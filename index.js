const express= require("express")
require('dotenv').config()
const cors=require('cors')

const {connection}=require('./config/db')
const { authenticator } = require("./middleware/authenticator")
const { postRouter } = require("./routes/post.route")
const {userRouter}=require('./routes/user.route')
const app = express()
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send("Hi")
})
app.use('/users',userRouter)
app.use('/posts',authenticator)
app.use('/posts',postRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to Db")
    } catch (error) {
        console.log(error)
        
    }
})