import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 24,
          background: 'var(--bg)',
          color: 'var(--text)',
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16, fontFamily: 'var(--font-display)' }}>
            !ERR
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 4 }}>
            SYSTEM ENCOUNTERED AN UNEXPECTED ERROR
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 24, maxWidth: 400 }}>
            {this.state.error?.message ?? 'Unknown error'}
          </div>
          <button
            onClick={this.handleReset}
            style={{
              background: 'var(--accent)',
              color: '#0b0c10',
              fontWeight: 700,
              border: '2px solid var(--accent)',
              padding: '10px 24px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
            }}
          >
            ↻ RESTART APPLICATION
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
