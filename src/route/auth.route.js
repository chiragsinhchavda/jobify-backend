const express = require("express")
const router = express.Router()
const UserModel = require("../model/user.model")
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        if ( !name || !email || !password ) return res.status(401).json({ message: "Required values not found!"})

        let isUserExists = await UserModel.findOne({ email })
        if (isUserExists) return res.status(401).json({ message: "User already exists!" })

        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)

        let user = await UserModel.create({ name, email, password: hashPassword })
        let token = user.createJWT()

        res.status(201).json({ user: { name: user.name, email: user.email }, token: token })
    } catch (e) {
        return res.status(400).json(e)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if ( !email || !password ) return res.status(401).json({ message: "Required values not found!"})

        let isUserExists = await UserModel.findOne({ email })
        if (!isUserExists) return res.status(401).json({ message: "User not found!" })
        
        let isPasswordMatch = await bcrypt.compare(password, isUserExists.password)
        if (!isPasswordMatch) return res.status(401).json({ message: "Password not match" })
        
        let token = isUserExists.createJWT()
        res.status(200).json({ user: { name: isUserExists.name, email: isUserExists.email }, token: token })
    } catch (e) {
        return res.status(400).json(e)
    }
})

module.exports = router