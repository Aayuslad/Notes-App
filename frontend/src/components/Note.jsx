import notesStore from "../stores/notesStore"

export default function Note({ note }) {
    const store = notesStore()

    return (
        <div className="note">
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <div>
                <button onClick={() => store.openUpdateForm(note)}>Edit Note</button>
                <button onClick={() => store.deleteNote(note._id)}>Delete Note</button>
            </div>
        </div>
    )
}
