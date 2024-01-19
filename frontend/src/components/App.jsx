import "../App.css"
import NotesPage from "../pages/NotesPage"
import LoginPage from "../pages/LoginPage"
import SigninPage from "../pages/SigninPage"
import RequireAuth from "./RequireAuth"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={
                            <RequireAuth>
                                <NotesPage />
                            </RequireAuth>
                        }
                    ></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/signin" element={<SigninPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
