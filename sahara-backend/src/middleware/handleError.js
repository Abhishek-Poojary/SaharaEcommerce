const ErrorHandler = require("../utilities/ErrorHandler");
const fs = require("graceful-fs");
const ErrorLogger = require("../utilities/ErrorLogger")


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"


    //invalid mongodb id error
    if (err.name == "CastError") {
        const message = ` Resource not found - Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // JWT invalid error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is Invalid`;
        err = new ErrorHandler(message, 400);
    }


    // JWT expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired ,Try again`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose  duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);
    }

    ErrorLogger(err);  //Logging error

    res.status(err.statusCode).json({
        success: false,
        message: err.message
        // error:err // err.stack
    })
}