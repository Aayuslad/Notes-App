import notesStore from "../stores/notesStore"

export default function OpenedNote() {
    const store = notesStore()
    const { title, body } = store.openedNote

    return (
        store.openedNote._id && (
            <div className="openedNote">
                <div className="bigNote" onChange={(e) => store.updateOpenedNote(e)}>
                    <textarea
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Add title here"
                    ></textarea>
                    <textarea
                        type="text"
                        name="body"
                        value={body}
                        placeholder="Add description"
                    ></textarea>
                    <div className="nav">
                        <div className="lastDate">
                            <span>{store.getEditedStatus()}</span>
                        </div>
                        <button onClick={store.closeNote} className="btn btn-close">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}
