import { Link } from 'react-router-dom'

export function Login() {
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
        // LOGIN
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 24, maxWidth: 360 }}>
        Authentication is coming soon. Your data is stored locally and doesn't require an account.
      </div>
      <Link to="/" style={{ fontSize: 12, color: 'var(--accent)' }}>
        ← BACK TO HOME
      </Link>
    </div>
  )
}
