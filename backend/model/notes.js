import mongoose, { Schema, model } from "mongoose"

const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    lastEdited: String,
    author: { type: mongoose.Types.ObjectId, ref: "User" },
})

const Note = new mongoose.model("Note", noteSchema)

export default Note
