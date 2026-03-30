import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f1f5f9',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            maxWidth: '360px',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚠</div>
            <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
              Something went wrong
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              The demo encountered an unexpected error.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: '9px 20px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#0f172a',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
