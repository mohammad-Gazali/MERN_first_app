const express = require("express")
const router = express.Router()
const { getGoals, createGoal, updateGoal, removeGoal } = require("../controllers/goalController")
const { protect } = require("../middlewares/authMiddleware")


router.route("/").get(protect, getGoals).post(protect, createGoal)
router.route("/:id").put(protect, updateGoal).delete(protect, removeGoal)


module.exports = router