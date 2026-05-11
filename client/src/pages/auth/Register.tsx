import { Link } from 'react-router-dom'

export function Register() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 24,
      textAlign: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        // REGISTER
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 24, maxWidth: 360 }}>
        Registration is coming soon. For now, all data is stored locally on your device.
      </div>
      <Link to="/" style={{ fontSize: 12, color: 'var(--accent)' }}>
        ← BACK TO HOME
      </Link>
    </div>
  )
}
