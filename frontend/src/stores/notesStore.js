import { create } from "zustand"
import axios from "axios"

const notesStore = create((set) => ({
    notes: null,
    openedNote: {
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

    createNote: async () => {
        const { notes } = notesStore.getState()

        try {
            const res = await axios.post("/notes", { title: "", body: "" })
            set({ notes: [...notes, res.data.note], openedNote: { _id: res.data.note._id } })
            console.log(res.data.note._id);
        } catch (error) {
            console.log("Error while creating note", error)
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

    openNote: (e, note) => {
        const { title, body, _id } = note

        if (e.target.nodeName == "BUTTON") return
        set({ openedNote: { _id, title, body } })
    },

    closeNote: () => {
        const { openedNote, notes } = notesStore.getState()
        const { _id, title, body } = openedNote
        const newNotes = [...notes]

        const updatedNoteIndex = newNotes.findIndex((note) => note._id === _id)
        newNotes[updatedNoteIndex] = { _id, title, body }

        set({ notes: newNotes, openedNote: { _id: "", title: "", body: "" } })
    },

    updateOpenedNote: async (e) => {
        const { name, value } = e.target
        set((state) => ({ openedNote: { ...state.openedNote, [name]: value } }))

        const { openedNote } = notesStore.getState()
        const { _id, title, body } = openedNote

        try {
            await axios.put(`/notes/${_id}`, { title, body })
        } catch (error) {
            console.log("Error while updating", error)
        }
    },
}))

export default notesStore
