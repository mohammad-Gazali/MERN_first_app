const express = require("express")
const router = express.Router()
const { getGoals, createGoal, updateGoal, removeGoal } = require("../controllers/goalController")


router.route("/").get(getGoals).post(createGoal)
router.route("/:id").put(updateGoal).delete(removeGoal)


module.exports = router