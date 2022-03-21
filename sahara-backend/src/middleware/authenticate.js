const jswt=require("jsonwebtoken");
const User=require("../models/userModel");
const ErrorHandler=require("../utilities/ErrorHandler");


exports.userAuthentication= async(req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access the resource",401));
    }

    const decode=jswt.verify(token,process.env.JSONWEBTOKEN_KEY);

    req.user=await User.findById(decode.id);

    next();

}


exports.roleAuthentication=(...roles)=>{
    return (req,res,next)=>{

        if(!roles.includes(req.user.userRole)){
            return next(new ErrorHandler("Access to resource restricted ",403));
        }

        next();
    }
}