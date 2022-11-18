const express = require("express");
const dotenv = require("dotenv").config();
const { errHandler } = require("./middlewares/errorMiddleware")
const PORT = process.env.PORT || 5000

const app = express()

//* Middlewares  [Note: These Middlewares must be above routes]
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", require("./routes/goalRoutes"))

//* Middlewares  [Note: These Middlewares must be below routes]
app.use(errHandler)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})