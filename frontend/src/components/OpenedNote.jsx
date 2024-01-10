import notesStore from "../stores/notesStore"

export default function OpenedNote() {
    const store = notesStore()
    const { title, body } = store.openedNote

    return (
        store.openedNote._id && (
            <div className="openedNote">
                <div className="bigNote" onChange={(e) => store.updateOpenedNote(e)}>
                    <textarea type="text" name="title" value={title} placeholder="Title"></textarea>
                    <textarea type="text" name="body" value={body} placeholder="Description"></textarea>
                    <div className="nav">
                        <div className="lastDate">Edited 10 january 18:47</div>
                        <button onClick={store.closeNote} className="btn btn-close">Close</button>
                    </div>
                </div>
            </div>
        )
    )
}
