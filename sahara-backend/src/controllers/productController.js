const Product=require("../models/productModel");
const catchAsyncError=require("../middleware/catchAsyncError");



exports.addProduct=catchAsyncError(async (req,res,next)=>{

    req.body.user=req.user.id;

    const product =await Product.create(req.body);

    res.status(200).json({
        success:"true",
        message:"Product added",
        product
    })
    
    
})