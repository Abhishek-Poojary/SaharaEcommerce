const mongoose = require("mongoose");

const ConnectToDatabase = () => {
    const url="mongodb://localhost:27017/Sahara"
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((data) => {
        console.log(`MongoDB Server Connected with: ${data.connection.host}`);
    })
    .catch((error) => {
        console.log(error);
    })  
}

module.exports = ConnectToDatabase;

