import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initDB } from './db'

initDB().catch(console.error)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
