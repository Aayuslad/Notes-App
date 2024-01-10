import notesStore from "../stores/notesStore"

export default function CreateForm() {
    const store = notesStore()

    return (
        !store.updateForm._id && (
            <div className="createNote">
                <h3>Create note</h3>
                <form className="createNoteForm" onSubmit={store.createNote}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={store.createForm.title}
                        onChange={store.updateCreateForm}
                    />
                    <textarea
                        name="body"
                        id="body"
                        cols="30"
                        rows="5"
                        placeholder="Description"
                        value={store.createForm.body}
                        onChange={store.updateCreateForm}
                    ></textarea>
                    <button type="submit">Create Note</button>
                </form>
            </div>
        )
    )
}
