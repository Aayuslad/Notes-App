import notesStore from "../stores/notesStore"

export default function updateForm() {
    const store = notesStore()

    return (
        store.updateForm._id && (
            <div className="updateNote">
                <h3>Update note</h3>
                <form className="updateNoteForm" onSubmit={store.updateNote}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={store.updateForm.title}
                        onChange={store.updateUpdateForm}
                    />
                    <textarea
                        name="body"
                        id="body"
                        cols="30"
                        rows="5"
                        placeholder="Description"
                        value={store.updateForm.body}
                        onChange={store.updateUpdateForm}
                    ></textarea>
                    <button type="submit">Update Note</button>
                </form>
            </div>
        )
    )
}
