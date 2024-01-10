import notesStore from "../stores/notesStore"
import Header from "./Header"
import Note from "./Note"

export default function Notes() {
    const store = notesStore()

    return (
        <div>
            <Header />
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
