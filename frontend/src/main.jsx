import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import axios from 'axios'
axios.defaults.baseURL = "https://notes-app-backend-qzbs0hivv-aayush-lads-projects.vercel.app"
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
