import { Users, Clock, CheckCircle, Plus } from 'lucide-react';
import { LABEL_CONFIG } from '../constants';
import { formatCurrency } from '../utils/format';

const CATEGORY_GRADIENTS = {
  Chicken:   { from: '#fed7aa', to: '#f97316' },
  Salads:    { from: '#bbf7d0', to: '#22c55e' },
  Breakfast: { from: '#fef08a', to: '#eab308' },
  Veggie:    { from: '#d9f99d', to: '#84cc16' },
  Tacos:     { from: '#fecaca', to: '#ef4444' },
};

export default function ShopperBundleCard({ bundle, inCart, onAddToCart }) {
  const lc = LABEL_CONFIG[bundle.label] || LABEL_CONFIG['Tonight Only'];
  const grad = CATEGORY_GRADIENTS[bundle.category] || { from: '#e2e8f0', to: '#94a3b8' };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #f3f4f6',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      {/* Image area */}
      <div style={{
        height: '112px',
        background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <span style={{ fontSize: '46px', lineHeight: 1 }}>{bundle.emoji}</span>

        {/* Label badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: lc.primary,
          color: 'white',
          fontSize: '8px',
          fontWeight: '800',
          padding: '2px 6px',
          borderRadius: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {bundle.label}
        </div>

        {/* Add / Added button */}
        <button
          onClick={() => !inCart && onAddToCart(bundle)}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            border: 'none',
            cursor: inCart ? 'default' : 'pointer',
            background: inCart ? '#16a34a' : '#111827',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'inherit',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            transition: 'background 0.15s',
          }}
        >
          {inCart ? <CheckCircle size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {/* Info area */}
      <div style={{ padding: '10px' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '700',
          color: '#111827',
          letterSpacing: '-0.2px',
          lineHeight: 1.3,
          marginBottom: '6px',
        }}>
          {bundle.name}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', letterSpacing: '-0.3px' }}>
              {formatCurrency(bundle.bundlePrice)}
            </div>
            <div style={{ fontSize: '10px', color: '#9ca3af', textDecoration: 'line-through' }}>
              {formatCurrency(bundle.retailValue)}
            </div>
          </div>
          <div style={{ fontSize: '10px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '1px' }}>
            <Users size={10} />
            {bundle.serves}
          </div>
        </div>

        <div style={{
          marginTop: '6px',
          fontSize: '10px',
          color: '#d97706',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}>
          <Clock size={9} />
          {bundle.expiryLabel}
        </div>
      </div>
    </div>
  );
}
