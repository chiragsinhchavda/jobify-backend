const express = require("express")
const router = express.Router()
const JobModel = require("../models/job.model")
const auth = require("../middleware/auth.middleware")

router.use(auth)

router.get("/", async (req, res) => {
    try {
        const jobs = await JobModel.find({ user: req.user.userId }).sort("-createdAt");
        res.json(jobs)
    } catch (e) {
        return res.status(400).json({ message: "Something went wrong!"})
    }
})

router.post("/", async (req, res) => {
    try {
        if (!req.user || !req.user.userId) return res.status(401).json({ message: "Unauthorized token" })
        if (!req.body) return res.status(401).json({ message: "Payload not found" })

        const { title, company, status } = req.body
        const job = await JobModel.create({ title, company, status, user: req.user.userId })

        res.status(201).json(job)
    } catch (e) {
        return res.status(400).json(e)
    }
})

router.put("/:id", async (req, res) => {
    try {
        if (!req.user || !req.user.userId) return res.status(401).json({ message: "Unauthorized token" })

        const { id } = req.params
        let isJobExists = await JobModel.findOne({ _id: id, user: req.user.userId })
        if (!isJobExists) throw "Job not found"
        
        let updateJob = await JobModel.findByIdAndUpdate(id, {...req.body, user: req.user.userId }, { new: true })
        res.status(201).json(updateJob)
    } catch (e) {
        return res.status(400).json(e)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        if (!req.user || !req.user.userId) return res.status(401).json({ message: "Unauthorized token" })

        const { id } = req.params
        const deletedJob = await JobModel.findOneAndDelete({ _id: id, user: req.user.userId })
        // await JobModel.findByIdAndDelete(id)
        if (!deletedJob) return res.status(400).json({ error: "Job not found in user's job list" })
        res.status(200).json({message: "Job deleted successfully"})
    } catch (e) {
        return res.status(400).json(e)
    }
})

module.exports = router