const User =require("../models/userModel")
const createToken=require("../utilities/jwtToken");
const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utilities/ErrorHandler");
const { findById } = require("../models/userModel");


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


exports.updatePassword=catchAsyncError(async(req,res,next)=>{

    const user= await User.findById(req.user.id).select("+password");

    const pass= await user.comparePasswords(req.body.oldPassword);

    if(!pass){
        return next(new ErrorHandler("Old password does not match",400));
    }

    if(req.body.newPassword!== req.body.confirmPassword){
        return next(new ErrorHandler("passwords does not match ",400));
    }

    user.password=req.body.newPassword;

    await user.save();

    
   res.status(200).json({
       success:true,
       message:"Password Updated"
   })
})


exports.getLoggedInUserDetails=catchAsyncError(async(req,res,next)=>{

    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})


exports.updateUserProfile =catchAsyncError(async(req,res,next)=>{
    const details={
        name:req.body.name,
        emailId:req.body.emailId,
        contactNumber:req.body.contactNumber
    }
    const user= await User.findByIdAndUpdate(req.user.id,details,{
        new:true,
        runValidators:true,
        useFindandModify:false
    })

    res.status(200).json({
        success:true,
    })
})

// get all the users for admin to view
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{

    const users= await User.find();

    res.status(200).json(
        {
            success:true,
            users
        }
    )
})


exports.getSingleUserDetails=catchAsyncError(async (req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("Invalid User id",400));
    }


    res.status(200).json({
        success:true,
        user
    })

})


exports.updateUserRole=catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("Invalid User id",400));
    }

        user.userRole=req.body.userRole;

    await user.save();

    res.status(200).json({
        success:true,
    })
})



exports.deleteUser=catchAsyncError(async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("Invalid User id",400));
    };

    await user.remove();



    res.status(200).json({
        success:true,
        message:"User deleted"
    })
})