import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initDB } from './db'

async function start() {
  try {
    await initDB()
  } catch (e) {
    console.error('IndexedDB init failed:', e)
    document.getElementById('root')!.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#0b0c10;color:#cdd6f4;font-family:'JetBrains Mono',monospace;padding:24px;text-align:center;">
        <div style="font-family:'Space Mono',monospace;font-size:24px;font-weight:700;margin-bottom:12px;">!DB ERR</div>
        <div style="font-size:12px;color:#6c7086;margin-bottom:4px;">DATABASE INITIALIZATION FAILED</div>
        <div style="font-size:11px;color:#6c7086;">${e instanceof Error ? e.message : 'Unknown error'}</div>
      </div>
    `
    return
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

start()
