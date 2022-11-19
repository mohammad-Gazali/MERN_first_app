const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


//* Function that generates JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"  // "30d" refers to thirty days
    })  // the first arg is the payload, and the second is the secret key of jwt tokens, and the third is the option argument
}



//* desc:        Create user
//* route:       POST /api/users/register
//* access:      Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400) 
        throw new Error("Please add all feilds")
    }

    //* Check if user exists
    const userExists = await User.findOne({email})  // we entered the email because it must be unique

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    //* Hash password
    // salt is a random text added to password to make it crypted
    const salt = await bcrypt.genSalt(10)  // the number that is passed to this function is for crypting [ I don't know what is this exactly :) ]
    const hashedPassword = await bcrypt.hash(password, salt)

    //* Create User
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//* desc:        Login user
//* route:       POST /api/users/login
//* access:      Public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    //* Checkmfor user email
    const user = await User.findOne({ email })
    
    //! in bcrypt.compare() function the hashed password should be the second argument
    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

//* desc:        Get user data
//* route:       GET /api/users/info
//* access:      Private
const getInfo = asyncHandler( async (req, res) => {
    //* below we can access to the user in the request bescause this route went through the protect() middleware, in this middleware in "../middlewares/authMiddleware.js" we wrote: (req.user = await User.findById(decoded.id).select("-password"))
    const { id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id,
        name,
        email
    })
})


module.exports = {
    registerUser,
    loginUser,
    getInfo
}