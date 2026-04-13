import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// index.css removed — global.css is imported in App.jsx
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
