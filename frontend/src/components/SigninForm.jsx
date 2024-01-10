import { Link, useNavigate } from "react-router-dom"
import authStore from "../stores/authStore"

export default function SigninForm() {
    const store = authStore()
    const navigate = useNavigate()

    const handleSignin = async (e) => {
        e.preventDefault()
        await store.signin()
        navigate("/login")
    }

    return (
        <form className="SigninForm" onSubmit={handleSignin}>
            <input
                type="email"
                placeholder="Email address"
                name="email"
                id="email"
                value={store.signinForm.email}
                onChange={store.updateSigninForm}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={store.signinForm.password}
                onChange={store.updateSigninForm}
            />
            <button type="submit">Sign in</button>
            <Link to="/login">Login - Alredy have an account ?</Link>
        </form>
    )
}
