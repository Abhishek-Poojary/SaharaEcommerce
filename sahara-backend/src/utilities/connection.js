const mongoose = require("mongoose");

const ConnectToDatabase = () => {

    mongoose.connect("mongodb://localhost:27017/")
    .then((data) => {
        console.log(`MongoDB Server Connected with: ${data.connection.host}`);
    })
    .catch((error) => {
        console.log(error);
    })  
}

module.exports = ConnectToDatabase;

