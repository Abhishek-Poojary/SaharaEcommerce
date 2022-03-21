const User =require("../models/userModel")
const createToken=require("../utilities/jwtToken");
const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utilities/ErrorHandler");


exports.createUser=catchAsyncError(async(req,res,next)=>{
    const {name,emailId,contactNumber,password} =req.body;

    const user=await User.create({
        name,emailId,contactNumber,password
    });

    createToken(user,200,res);
});


exports.userLogin=catchAsyncError(async(req,res,next)=>{
    const {emailId,password} =req.body;

    if(!emailId || !password){
        return next(new ErrorHandler("Please enter your email & password",400));
    }

    const user= await User.findOne({emailId}).select("+password");
    

    if(!user){
        return next(new ErrorHandler("Invalid email & password ",400));
    }

    const pass= await user.comparePasswords(password);

    if(!pass){
        return next(new ErrorHandler("Invalid email & password ",400));
    }


    createToken(user,200,res);
})



exports.logoutUser=catchAsyncError(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"User logged out"
    })
})