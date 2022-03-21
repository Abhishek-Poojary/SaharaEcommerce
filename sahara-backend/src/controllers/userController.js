const User =require("../models/userModel")
const createToken=require("../utilities/jwtToken");
const catchAsyncError=require("../middleware/catchAsyncError")


exports.createUser=catchAsyncError(async(req,res,next)=>{
    const {name,emailId,contactNumber,password} =req.body;

    const user=await User.create({
        name,emailId,contactNumber,password
    });

    createToken(user,200,res);
});
