const Product=require("../models/productModel");
const catchAsyncError=require("../middleware/catchAsyncError");
const Searchapi= require("../utilities/Searchapi")
const ErrorHandler=require("../utilities/ErrorHandler")

exports.addProduct=catchAsyncError(async (req,res,next)=>{

    req.body.user=req.user.id;

    const product =await Product.create(req.body);

    res.status(200).json({
        success:"true",
        message:"Product added",
        product
    })
    
    
})


exports.getAllProducts=catchAsyncError(async(req,res,next)=>{

    const limitNumberOfPages = 6;
    const totalProducts=await Product.countDocuments();
    const searchapi =new Searchapi(Product.find(),req.query).Search().filter().pagination(limitNumberOfPages);
    const product= await searchapi.query;

    res.status(200).json({
        success:true,
        product,
        totalProducts
    })
 
})


exports.getProductByTags=catchAsyncError(async(req,res,next)=>{

    const limitNumberOfPages = 6;
    const totalProducts=await Product.countDocuments();
    const searchapi =new Searchapi(Product.find(),req.query).SearchTags().pagination(limitNumberOfPages);
    const product=await searchapi.query;
    const total=product.length
    res.status(200).json({
        success:true,
        product,
        total
    })

})


exports.getSingleProductDetail=catchAsyncError(async(req,res,next)=>{

    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Invalid Product id",404));
    }

    res.status(200).json({
        success:true,
        product
    })
})


exports.updateProduct=catchAsyncError(async(req,res,next)=>{

    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Invalid Product id",404));
    }

    const updated=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    if(!updated){
        return next(new ErrorHandler("Invalid Product id",404));
    }

    res.status(200).json({
        success:true,
        updated
    })
})


exports.deleteProduct=catchAsyncError(async(req,res,next)=>{

    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Invalid Product id",404));
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message:"Product removed"
    })

})