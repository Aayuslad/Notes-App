import notesStore from "../stores/notesStore"

export default function createNote() {
    const store = notesStore()
    
    return (
        !store.openedNote._id && (<button onClick={store.createNote} className="btn btn-createNote">+</button>)
    )
}