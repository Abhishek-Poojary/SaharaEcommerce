require("dotenv").config();

const express=require("express");
const MyRequestLogger=require("./utilities/RequestLogger");
const cookieParser=require("cookie-parser");
const DatabaseConnection=require("./utilities/connection")
const HandleError = require( "./middleware/handleError");
DatabaseConnection();

const userRoute= require("./routes/userRoute");
const app=express();




app.use(MyRequestLogger);  
app.use(express.json());  // 
app.use(cookieParser());  // for using cookies 

app.use("/user",userRoute);



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
