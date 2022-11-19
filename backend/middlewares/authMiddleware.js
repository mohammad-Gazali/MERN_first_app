const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")


const protect = asyncHandler( async (req, res, next) => {
    let token;
    //! every JWT start with the word Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //* Get Token From Header
            token = req.headers.authorization.split(" ")[1]  // here we take the jwt without the "Bearer" word [Note: jwt looks like this: {Bearer FdaewIJ_Ofe_gfhgywqe9hon ...etc}] 
        
            //* Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)  // the first arg is the token, and the second one is the secret key

            //* Get user by the token
            //? the select() method is used to return specific fields only, when we add minus (-) before the name of the field then we exclude the field instead of including it, if we want to select multiple fields we can use one these two choices:
            //? 1- INCLUDING: query.select("name email ...")      EXCLUDING: query.select("-password")
            //? 2- INCLUDING: query.select({name: 1, email: 1})   EXCLUDING: query.select({passowrd: 0})
            req.user = await User.findById(decoded.id).select("-password")  // here we added a "user" key and assigned to the value of the user, [Note: "user" is not a default key to the req] [Note: every protected route by this middleware will cary the key user and its value in the req]  
            
            //? next() method refers activate the next step (routing, another middleware, .....), and for more understanding we suppose the opposite case: we usually don't use next() in any middleware that handle errors because the process will continue but we want to stop the process forcely if there is an error, so we don't write the next() in the error handler
            next()
        
        } catch (error) {

            console.log(error);

            res.status(401)  //? 401 is for unauthorized user
            throw new Error("Not Authorized")
        }
    } 

    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, no token")
    }

})


module.exports = {
    protect
}