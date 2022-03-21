const fs = require("graceful-fs");
const path = require('path'); 


let requestLogger = (req, res, next) => {
    let logMessage = "" + new Date() + " " + req.method + " " + req.url + "\n";
    let reqPath = path.join(__dirname, '../');

    fs.appendFile(reqPath + 'RequestLogger.txt', logMessage + '\n', function(err) {
        if(err) throw err;
    });
    next();

}

module.exports = requestLogger;