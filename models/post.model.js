const {Schema,model}=require("mongoose")

const PostSchema=Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true,enum:["Mobile","Tablet","Laptop"]},
    no_of_comments:{type:Number,required:true},
    userId:{type:String,required:true}
})

const Post=model("post",PostSchema)
module.exports={Post}