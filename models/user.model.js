const {Schema,model}=require("mongoose")


const UserSchema= Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    city:{type:String,required:true},
    is_married:{type:Boolean,required:true},

    
})
const User =model("user",UserSchema)

module.exports={User}