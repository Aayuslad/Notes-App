import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import axios from 'axios'
axios.defaults.baseURL = "https://notes-app-2z2s.vercel.app"
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
