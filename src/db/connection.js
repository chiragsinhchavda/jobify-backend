const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb Connected.")
    } catch (e) {
        console.log("Database connection error: ", e)
        process.exit(1)
    }
}

module.exports = connectDb