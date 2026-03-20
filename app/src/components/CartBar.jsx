export default function CartBar({ items, total }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#111827',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid #1f2937',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          background: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '700',
          color: 'white',
        }}>
          {items.length}
        </div>
        <span style={{ fontSize: '13px', fontWeight: '500', color: '#d1d5db' }}>
          {items.length === 1 ? '1 kit' : `${items.length} kits`} in cart
        </span>
      </div>
      <div style={{ fontSize: '16px', fontWeight: '800', color: 'white', letterSpacing: '-0.3px' }}>
        ${total.toFixed(2)}
      </div>
    </div>
  );
}
