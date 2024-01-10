import SigninForm from "../components/SigninForm"

export default function SigninPage() {
    return (
        <div className="SigninPage">
            <div className="FormBg">
                <h1>
                    Sign in to <span>Notes</span>
                </h1>
                <SigninForm />
            </div>
        </div>
    )
}
