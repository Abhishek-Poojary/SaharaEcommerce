const mongoose =require("mongoose");

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true," Error - Name:Required"],
        trim :true
    },
    description:{
        type:String,
        required:[true," Error - Description:Required"]
    },    
    inStock:{
        type:Number,
        required:[true," Error - Stock:Required"],
        default:1
    },
    price:{
        type:Number,
        required:[true,"Error - Price:Required"]
    },
    tags:[String],       
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true," Error - Category:Required"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",productSchema)