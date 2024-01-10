import CreateNoteBtn from "../components/CreateNoteBtn"
import Notes from "../components/Notes"
import notesStore from "../stores/notesStore"
import { useEffect } from "react"
import OpenedNote from "../components/OpenedNote"

export default function NotesPage() {
    const store = notesStore()

    useEffect(() => {
        store.fetchNotes()
    }, [])

    return (
        <div className="notesApp">
            <Notes />
            <OpenedNote />
            <CreateNoteBtn />
        </div>
    )
}