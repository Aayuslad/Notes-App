import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT || 8080
import "dotenv/config"
import connectToDB from "./config/connectToDB.js"
import notesRouter from "./routes/notes.js"
import userRouter from "./routes/user.js"
import AuthMiddleware from "./middleware/AuthMiddleware.js"

connectToDB()

app.use(
    cors({
        origin: "https://notes-app-frontend-beige.vercel.app",
        methods: ["get", "post", "put", "delete"],
        credentials: true,
    })
)
app.use(express.json())
app.use(cookieParser())
app.use("/user", userRouter)
app.use("/notes", AuthMiddleware, notesRouter)

app.listen(PORT, () => console.log(`Sevrer started on port ${PORT}`))