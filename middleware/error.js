const ErrorHandler = require("../utils/errorhandler.js");
const errorHandler = require("../utils/errorhandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error -- cast error
  // cast error when you give so irrelavent id
  if (err.name === "CastError") {
    const message = `Resource not found: ${err.name}`;
    err = new ErrorHandler(message, 400);
  }
  // Mongoose duplicate error
  if(err.code ===11000){
    const message = `Duplicate ${Object.keys(err.keyvalue)} Entered`
    err = new ErrorHandler(message, 400)
    }
    
    // Wrong jwt token
      if (err.name === "JsonWebTokenError") {
        const message = `json web token is invalid`;
        err = new ErrorHandler(message, 400);
      }
    // Wrong jwt expire error
      if (err.name === "TokenExpiredError") {
        const message = `json web token expired`;
        err = new ErrorHandler(message, 400);
      }


  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // error : err.stack
  });
};

// we created this middleware just for one use that the errorhandler is a class and we can not use it
// directly in app.js file where we write app.use() so thats why we make this middleware and here it imports
// the errorhandler in first line so this is the only reason of this file
