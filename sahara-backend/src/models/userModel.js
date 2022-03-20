const mongoose = require("mongoose")


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Schema Error - Name:Required"]
    },
    emailId:{
        type:String,
        unique:true,
        required:[true,"Schema Error - email:required"]
    },
    contactNumber:{
        type:Number,
        unique:true,
        required:[true,"Schema Error - ContactNo:required"]
    },
    password:{
        type:String,
        select:false,
        required:[true,"Schema Error - password:required"]
    },
    userRole:{
        type:String,
        default:"user"
    }
})

module.exports=mongoose.model("User",userSchema);