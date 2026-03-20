export default function PhoneFrame({ children }) {
  return (
    <div style={{
      width: '390px',
      maxWidth: '100%',
      background: '#f9f5f0',
      borderRadius: '44px',
      border: '10px solid #1e293b',
      boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Notch */}
      <div style={{
        height: '32px',
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '100px',
          height: '20px',
          background: '#1e293b',
          borderRadius: '0 0 16px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0f172a' }} />
        </div>
      </div>
      {children}
    </div>
  );
}
