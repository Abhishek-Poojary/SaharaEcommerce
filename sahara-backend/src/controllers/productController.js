const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Searchapi = require("../utilities/Searchapi")
const ErrorHandler = require("../utilities/ErrorHandler")
const cloudinary =require("cloudinary")
exports.addProduct = catchAsyncError(async (req, res, next) => {


    let  images = []

    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }


    let ImageURLS = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
    
        ImageURLS .push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images=ImageURLS
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    })


})


exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const limitNumberOfPages = 9;

    const searchApiforCount = new Searchapi(Product.find(), req.query).Search().filter();
    const result = await searchApiforCount.query;
    const totalProducts = result.length

    const searchapi = new Searchapi(Product.find(), req.query).Search().filter().pagination(limitNumberOfPages);
    const products = await searchapi.query;

    res.status(200).json({
        success: true,
        products,
        totalProducts,
        limitNumberOfPages
    })

})


exports.getAllProductAdmin = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

exports.getProductByTags = catchAsyncError(async (req, res, next) => {

    const limitNumberOfPages = 6;
    const totalProducts = await Product.countDocuments();
    const searchapi = new Searchapi(Product.find(), req.query).SearchTags().pagination(limitNumberOfPages);
    const product = await searchapi.query;
    const total = product.length
    res.status(200).json({
        success: true,
        product,
        total
    })

})


exports.getSingleProductDetail = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Invalid Product id", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})


exports.updateProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Invalid Product id", 404));
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!updated) {
        return next(new ErrorHandler("Invalid Product id", 404));
    }

    res.status(200).json({
        success: true,
        updated
    })
})


exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Invalid Product id", 404));
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product removed"
    })

})