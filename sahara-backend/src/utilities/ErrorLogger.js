const fs = require( 'fs' );
const path = require('path'); 

let errorLogger = ( err, req, res, next ) => {
    let reqPath = path.join(__dirname, '../');

    fs.appendFile(reqPath + 'ErrorLogger.txt',  err.stack + "\n", function(err) {
        if(err) throw err;
    });

   
}

module.exports = errorLogger;