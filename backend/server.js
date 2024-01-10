import dotenv from "dotenv"
if (process.env.NODE_ENV != "production") {
    dotenv.config()
}
import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT || 3000
import connectToDB from "./config/connectToDB.js"
import notesRouter from "./routes/notes.js"
import userRouter from "./routes/user.js"
import AuthMiddleware from "./middleware/AuthMiddleware.js"

connectToDB()

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)
app.use(express.json())
app.use(cookieParser())
app.use("/user", userRouter)
app.use("/notes", AuthMiddleware, notesRouter)
app.use("*", (err, req, res, next) => {
    res.status(404).send("404 File not found")
})

app.listen(PORT, () => console.log(`Sevrer started on port ${PORT}`))
