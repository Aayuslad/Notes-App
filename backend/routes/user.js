import { Router } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const router = Router()
import User from "../model/user.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"

router.post("/signin", async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await User.create({ email, password: hashedPassword })
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "User not created" })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) return res.sendStatus(404)

        const passwordMatch = bcrypt.compare(password, user.password)
        if (!passwordMatch) return res.sendStatus(401)

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30 // 30 days
        const token = jwt.sign({ email, exp }, process.env.SECRET)

        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "None",
            // domain: "notes-app-frontend-pi.vercel.app",
            path: "/",
            secure: process.env.NODE_ENV === "production",
        })

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "user not found" })
    }
})

router.get("/logout", (req, res) => {
    try {
        res.clearCookie("Authorization", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            // domain: "notes-app-frontend-pi.vercel.app",
            path: "/"
        })
        res.sendStatus(200)
    } catch (err) {
        console.log(err.message)
        res.sendStatus(400)
    }
})

router.get("/checkAuth", AuthMiddleware, (req, res) => {
    res.sendStatus(200)
})

export default router
