require("dotenv").config();

const app=require("./app");
const DatabaseConnection=require("./utilities/connection")

DatabaseConnection();


app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port http://localhost:${process.env.PORT}`)
});


