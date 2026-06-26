import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { seedDatabase } from './utils/db'

// Initialize the localStorage database with default admin, patient, doctor, department, and schedule entries
seedDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
