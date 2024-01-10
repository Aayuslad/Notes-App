import { Router } from "express"
const router = Router()
import Note from "../model/notes.js"

router.get("/", async (req, res) => {
    const author = req.user._id
    try {
        const notes = await Note.find({ author })
        res.json({ notes })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get("/:id", async (req, res) => {
    const _id = req.params.id
    const author = req.user._id

    try {
        const note = await Note.findOne({ _id, author })
        if (!note) {
            return res.status(404).json({ error: "Note not found" })
        }
        res.json({ note })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.post("/", async (req, res) => {
    const { title, body } = req.body
    const author = req.user._id
    try {
        const note = await Note.create({ title, body, author })
        res.status(201).json({ note })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error while creating note" })
    }
})

router.put("/:id", async (req, res) => {
    const _id = req.params.id
    const author = req.user._id
    const { title, body } = req.body

    try {
        await Note.findOneAndUpdate({ _id, author }, { title, body })
        const note = await Note.findById(_id)
        res.json({ note })
    } catch (error) {
        console.error(error)
        res.status(500).send("Error while updating")
    }
})

router.delete("/:id", async (req, res) => {
    const _id = req.params.id
    const author = req.user._id

    try {
        await Note.findOneAndDelete({ _id, author })
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error while deleting" })
    }
})

export default router
