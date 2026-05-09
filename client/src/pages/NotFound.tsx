import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '0.03em',
        marginBottom: 12,
        color: 'var(--text)',
      }}>
        // PAGE NOT FOUND
      </div>
      <div style={{
        fontSize: 12,
        color: 'var(--text-2)',
        marginBottom: 24,
        lineHeight: 1.6,
        maxWidth: 360,
      }}>
        The route you're looking for doesn't exist in this system.
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'var(--accent)',
          color: '#0b0c10',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.05em',
          border: '2px solid var(--accent)',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        ⌂ RETURN TO DASHBOARD
      </button>
    </div>
  )
}
