const mongoose = require("mongoose")
const bcryptjs =require("bcryptjs");
const jsonwebtoken=require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Error - Name:Required"]
    },
    emailId:{
        type:String,
        unique:true,
        required:[true," Error - Email:required"]
    },
    contactNumber:{
        type:Number,
        unique:true,
        required:[true,"Error - ContactNo:required"]
    },
    password:{
        type:String,
        select:false,
        required:[true,"Error - Password:required"]
    },
    userRole:{
        type:String,
        default:"user"
    },
    history:[String]
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }

    this.password=await bcryptjs.hash(this.password,8);
})


userSchema.methods.getJsonWebToken=function(){
    return jsonwebtoken.sign({id:this._id},process.env.JSONWEBTOKEN_KEY,{
        expiresIn:process.env.JSONWEBTOKEN_EXPIRE
    })
}
module.exports=mongoose.model("User",userSchema);