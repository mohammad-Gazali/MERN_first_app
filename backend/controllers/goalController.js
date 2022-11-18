const asyncHandler = require("express-async-handler")

//* desc:        Get goals
//* route:       GET /api/goals
//* access:      Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "GET Goals" })
})


//* desc:        Create goal
//* route:       POST /api/goals
//* access:      Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a non-empty text to your body")
    }
    res.status(200).json({ message: "POST Goals" })
})


//* desc:        Update a goal
//* route:       PUT /api/goals/:id
//* access:      Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `PUT Goals params: ${req.params.id }`})
})


//* desc:        Delete goals
//* route:       DELETE /api/goals/:id
//* access:      Private
const removeGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `DELETE Goals params: ${req.params.id}` })
})



module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    removeGoal
}