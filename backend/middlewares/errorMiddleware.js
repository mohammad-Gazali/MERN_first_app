//* we want to override the default error handler of express
//* we here make a middleware for handling the errors
//? the first arg is the error, the second is request, the third is the response and the fourth is the next param which is used for handling another middleware
const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    
    res.status(statusCode) 

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}


module.exports = {
    errHandler,
}