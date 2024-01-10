import { Link, useNavigate } from "react-router-dom"
import authStore from "../stores/authStore"

export default function LoginForm() {
    const store = authStore()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await store.login();
            navigate("/")
        } catch (error) {
        }
    }

    return (
        <form className="LoginForm" onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email address"
                name="email"
                id="email"
                value={store.loginForm.email}
                onChange={store.updateLoginForm}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={store.loginForm.password}
                onChange={store.updateLoginForm}
            />
            <button type="submit" className="btn">Log in</button>
            <Link to="/signin">Signin - Do not have an account ?</Link>
        </form>
    )
}
