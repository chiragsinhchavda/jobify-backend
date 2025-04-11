const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        let authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "token not provided"})
        }
        let accessToken = authHeader.split(" ")[1]
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (e) {
        return res.status(401).json({message: "Unauthorized access"})
    }
}

module.exports = auth
