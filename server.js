const express = require("express")
const connectDb = require("./src/db/connection")
require("dotenv").config()
const app  = express()
app.use(express.json())
const PORT = process.env.PORT || 5000
const AuthRoutes = require("./src/routes/auth.route")
const JobRoutes = require("./src/routes/jobs.route")


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
        app.listen(PORT, () => console.log("Server is running 'http://localhost:5000'"))
    } catch (e) {
        console.log("server error: ", e)
    }
}

startServer()