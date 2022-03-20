const express=require("express");
const app=express();
const MyRequestLogger=require("./utilities/RequestLogger");
const myErrorLogger = require( './utilities/ErrorLogger' );

app.use(MyRequestLogger);
app.use(express.json());




app.use(myErrorLogger);

module.exports=app;