const express = require("express")
const connectDb = require("./src/db/connection")
require("dotenv").config()
const app  = express()
const PORT = process.env.PORT || 5000
const AuthRoutes = require("./src/routes/auth.route")
const JobRoutes = require("./src/routes/jobs.route")

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use(express.json())
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send({
        "project" : "Jobify Backend",
        "date" : new Date()
    })
})

app.use("/api/auth", AuthRoutes)
app.use("/api/jobs", JobRoutes)

const startServer = async () => {
    try {
        await connectDb()
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    } catch (e) {
        console.log("server error: ", e)
        process.exit(1)
    }
}

startServer()