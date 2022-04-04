require("dotenv").config();

const express=require("express");
const MyRequestLogger=require("./utilities/RequestLogger");
const cookieParser=require("cookie-parser");
const DatabaseConnection=require("./utilities/connection")
const fileupload=require("express-fileupload")
const HandleError = require( "./middleware/handleError");
const cloudinary=require("cloudinary");
const userRoute= require("./routes/userRoute");
const productRoute=require("./routes/productRoute");
const orderRoute= require("./routes/orderRoute");

DatabaseConnection();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET
});



const app=express();




app.use(MyRequestLogger);  
app.use(express.json());  // 
app.use(cookieParser());  // for using cookies 
app.use(fileupload());

app.use("/api/v1",userRoute);
app.use("/api/v1",productRoute);
app.use("/api/v1",orderRoute);


app.use(HandleError)

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port http://localhost:${process.env.PORT}`)
});


process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);

    server.close(
        ()=>{
            process.exit(1);
        }
    );
})
