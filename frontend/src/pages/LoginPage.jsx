import LoginForm from "../components/LoginForm"

export default function LoginPage() {
    return (
        <div className="loginPage">
            <div className="FormBg">
                <h1>
                    Log in to <span>Notes</span>
                </h1>
                <LoginForm />
            </div>
        </div>
    )
}
