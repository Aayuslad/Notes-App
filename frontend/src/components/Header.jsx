import authStore from "../stores/authStore"

export default function Header() {
    const store = authStore()

    return (
        <div className="header">
            <h1>Notes</h1>
            <div>
                <button onClick={store.logout} className="btn">Logout</button>
            </div>
        </div>
    )
}