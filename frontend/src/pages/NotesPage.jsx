import CreateForm from "../components/CreateForm"
import UpdateForm from "../components/UpdateForm"
import Notes from "../components/Notes"
import notesStore from "../stores/notesStore"
import { useEffect } from "react"

export default function NotesPage() {
    const store = notesStore()

    useEffect(() => {
        store.fetchNotes()
    }, [])

    return (
        <div className="notesApp">
            <Notes />
            <CreateForm />
            <UpdateForm />
        </div>
    )
}