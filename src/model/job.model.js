const mongoose = require("mongoose")

const JobScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "interview", "declined"],
        default: "pending"
    },
    experiance: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,  
    },
})

module.exports = mongoose.model("Job", JobScheme)