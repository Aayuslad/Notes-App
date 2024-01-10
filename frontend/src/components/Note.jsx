import notesStore from "../stores/notesStore"

export default function Note({ note }) {
    const store = notesStore()

    return (
        <div className="note" onClick={(e) => store.openNote(e, note)}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <div>
                <button onClick={() => store.deleteNote(note._id)} className="btn">
                    Delete Note
                </button>
            </div>
        </div>
    )
}
