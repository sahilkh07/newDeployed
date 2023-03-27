const {Router}=require("express")

const {Post}=require('../models/post.model')


const postRouter= Router()



postRouter.post('/add',async(req,res)=>{

 

    try {
        const payload=req.body

        const newPost =new Post(payload)
        await newPost.save()
        res.status(200).send({msg:"Post Created"})
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }


})
postRouter.get('/',async(req,res)=>{
    try{

const {userId}=req.body
const {device=["Mobile","Tablet","Laptop"]}=req.params
const post = await Post.find({$and:[{userId},{device:{$in:device}}]})

res.status(200).send({posts:post})
    }
    catch(err){
        res.status(400).send({err:message.err})
    }

})
postRouter.get('/top',(req,res)=>{
    res.status(200).send({posts:"Posts"})
})


postRouter.patch('/update/:id',async(req,res)=>{
try {
    const {id}=req.params
    const postUpdate = await Post.findByIdAndUpdate(id,req.body)
  
        res.status(200).send({msg:"Post Updated"})
    
} catch (error) {
    res.status(400).send({msg:error.message})
}
})

postRouter.delete('/delete/:id',async(req,res)=>{
try {
    const {id} = req.params
    const postDelete = await Post.findByIdAndDelete(id)

        res.status(200).send({msg:"Post Deleted"})
    
    
} catch (error) {
    res.status(400).send({msg:error.message})
}
})
module.exports={postRouter}