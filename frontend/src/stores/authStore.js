import { create } from "zustand"
import axios from "axios"

const authStore = create((set) => ({
    loggedIn: null,

    loginForm: {
        email: "",
        password: "",
    },

    signinForm: {
        email: "",
        password: "",
    },

    updateLoginForm: (e) => {
        const { name, value } = e.target
        set((state) => ({ loginForm: { ...state.loginForm, [name]: value } }))
    },

    updateSigninForm: (e) => {
        const { name, value } = e.target
        set((state) => ({ signinForm: { ...state.signinForm, [name]: value } }))
    },

    login: async () => {
        const { loginForm } = authStore.getState()
        try {
            await axios.post("/user/login", loginForm)
            set({ loggedIn: true })
        } catch (error) {
            console.log("Error while logging", error)
            if (error.response.status === 404) {
                alert("Account not found. Check credentials")
            } 
            else if (error.response.status === 401) {
                alert("Authentication failed. Check email/password")
            }
            else {
                alert("Login failed. Try again later")
            }
        }
        set({ loginForm: { email: "", password: "" } })
    },

    signin: async () => {
        const { signinForm } = authStore.getState()
        try {
            await axios.post(`/user/signin`, signinForm)
        } catch (error) {
            console.log("Error while loging", error)
            alert(error.message)
        }
        set({ signinForm: { email: "", password: "" } })
    },

    checkAuth: async () => {
        try {
            await axios.get("/user/checkAuth")
            set({ loggedIn: true })
        } catch (error) {
            set({ loggedIn: false })
        }
    },

    logout: async () => {
        await axios.get("/user/logout")
        set({ loggedIn: false })
    },
}))

export default authStore
