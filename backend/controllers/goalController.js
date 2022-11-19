const asyncHandler = require("express-async-handler")

const Goal = require("../models/goalModel")
const User = require("../models/userModel")

//* desc:        Get goals
//* route:       GET /api/goals
//* access:      Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

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
        text: req.body.text,
        user: req.user.id
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

    const currentUser = await User.findById(req.user.id)

    //* Check for user
    if (!currentUser) {
        res.status(401)
        throw new Error("User not found")
    }
    

    //* Check that the user is the same who created this goal
    //! below we converted the id of user in goal model to String because we can only make an equality between to strings
    if (currentUser.id !== goal.user.toString()) { 
        res.status(403)
        throw new Error("Forbidden")
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
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    const currentUser = await User.findById(req.user.id)

    //* Check for user
    if (!currentUser) {
        res.status(401)
        throw new Error("User not found")
    }


    //* Check that the user is the same who created this goal
    if (currentUser.id !== goal.user.toString()) { 
        res.status(403)
        throw new Error("Forbidden")
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