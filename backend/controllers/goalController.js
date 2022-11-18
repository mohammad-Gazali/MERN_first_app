const asyncHandler = require("express-async-handler")

const Goal = require("../models/goalModel")

//* desc:        Get goals
//* route:       GET /api/goals
//* access:      Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})


//* desc:        Create goal
//* route:       POST /api/goals
//* access:      Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a non-empty text to your body")
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})


//* desc:        Update a goal
//* route:       PUT /api/goals/:id
//* access:      Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true  // this object contains the options, this option make findByIdAndUpdate() method return te new goal AFTER updating instead of returning the old one
    })

    res.status(200).json(updatedGoal)
})


//* desc:        Delete goals
//* route:       DELETE /api/goals/:id
//* access:      Private
const removeGoal = asyncHandler(async (req, res) => {
    const goal = Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})



module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    removeGoal
}