import { create } from "zustand"
import axios from "axios"

const notesStore = create((set) => ({
    notes: null,
    createForm: {
        title: "",
        body: "",
    },
    updateForm: {
        _id: null,
        title: "",
        body: "",
    },

    fetchNotes: async () => {
        try {
            const res = await axios.get(`/notes/`)
            set({ notes: res.data.notes })
        } catch (error) {
            alert(error.message)
            console.error("Error fetching notes:", error.message)
        }
    },

    updateCreateForm: (e) => {
        const { name, value } = e.target
        set((state) => ({ createForm: { ...state.createForm, [name]: value } }))
    },

    updateUpdateForm: (e) => {
        const { name, value } = e.target
        set((state) => ({ updateForm: { ...state.updateForm, [name]: value } }))
    },

    createNote: async (e) => {
        e.preventDefault()
        const { createForm, notes } = notesStore.getState()
        const { title, body } = createForm
        if (!title || !body) {
            alert("Title and body are required fields")
            return
        }
        try {
            const res = await axios.post(`/notes/`, { title, body })
            set({ notes: [...notes, res.data.note], createForm: { title: "", body: "" } })
        } catch (error) {
            console.error("Error while creating note", error.message)
            alert(error.message)
        }
    },

    deleteNote: async (id) => {
        const { notes } = notesStore.getState()
        const confirmDeletion = window.confirm("Are you sure you want to delete this note?")
        if (!confirmDeletion) return
        try {
            await axios.delete(`/notes/${id}`)
            const newNotes = [...notes].filter((note) => note._id !== id)
            set({ notes: newNotes })
        } catch (error) {
            console.error("Error while deleting note", error.message)
            alert(error.message)
        }
    },

    openUpdateForm: async (note) => {
        set({ updateForm: { _id: note._id, title: note.title, body: note.body } })
    },

    updateNote: async (e) => {
        e.preventDefault()
        const { updateForm, notes } = notesStore.getState()
        const { _id, title, body } = updateForm
        if (!title || !body) {
            alert("Title and body are required fields")
            return
        }
        try {
            const res = await axios.put(`/notes/${_id}`, { title, body })
            const newNotes = [...notes]
            const noteIndex = newNotes.findIndex((note) => note._id === _id)
            newNotes[noteIndex] = res.data.note
            set({ notes: newNotes, updateForm: { _id: "", title: "", body: "" } })
        } catch (error) {
            console.error("Eoor while updating note", error.message)
            alert(error.message)
        }
    },
}))

export default notesStore
