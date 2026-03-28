import { formatCurrency } from '../utils/format';

export default function CartBar({ items, total }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#111827',
      padding: '13px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid #1f2937',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '22px',
          height: '22px',
          borderRadius: '6px',
          background: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: '700',
          color: 'white',
          flexShrink: 0,
        }}>
          {items.length}
        </div>
        <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
          My Cart
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '15px', fontWeight: '800', color: 'white', letterSpacing: '-0.3px' }}>
          {formatCurrency(total)}
        </span>
        <span style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1 }}>›</span>
      </div>
    </div>
  );
}
