import mongoose, { Schema, model } from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes: [{ type: mongoose.Types.ObjectId, ref: "Notes" }],
})

const User = new mongoose.model("User", userSchema)

export default User
