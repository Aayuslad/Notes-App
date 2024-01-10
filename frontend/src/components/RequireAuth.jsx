import { useEffect } from "react";
import authStore from "../stores/authStore"
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

export default function RequireAuth(props) {
    const store = authStore();

    useEffect(() => {
            store.checkAuth()
    }, [])

    if (store.loggedIn === null) {
        return <LoadingPage />
    }

    if (store.loggedIn === false) {
        return <Navigate to="/login" />
    }

    return <div>{props.children}</div>
}