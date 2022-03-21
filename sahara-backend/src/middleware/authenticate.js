const jswt=require("jsonwebtoken");
const User=require("../models/userModel");
const errorHandler=require("../utilities/ErrorHandler")

exports.userAuthentication= async(req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new errorHandler("Please login to access the resource",401));
    }

    const decode=jswt.verify(token,process.env.JSONWEBTOKEN_KEY);

    req.user=await User.findById(decode.id);

    next();

}