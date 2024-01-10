import notesStore from "../stores/notesStore"
import Note from "./Note"

export default function Notes() {
    const store = notesStore()

    return (
        <div>
            <h2>Notes</h2>
            {
                <div className="notes">
                    {store.notes &&
                        store.notes.map((note) => {
                            return <Note key={note.id} note={note} />
                        })}
                </div>
            }
        </div>
    )
}
