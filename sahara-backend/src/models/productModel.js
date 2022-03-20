const mongoose =require("mongoose");

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Schema Error - Name:Required"],
        trim :true
    },
    description:{
        type:String,
        required:[true,"Schema Error - Description:Required"]
    },    
    inStock:{
        type:Number,
        required:[true,"Schema Error - Stock:Required"],
        default:1
    },
    price:{
        type:Number,
        required:[true,"Schema Error - Price:Required"]
    },    
    ratings:{
        type:Number,
        default:0
    },   
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
        required:[true,"Schema Error - Category:Required"]
    },
    reviewCount:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
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