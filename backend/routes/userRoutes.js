const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getInfo } = require("../controllers/userController")
const { protect } = require("../middlewares/authMiddleware")


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/info', protect, getInfo)


module.exports = router