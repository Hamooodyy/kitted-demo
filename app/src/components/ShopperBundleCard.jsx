import { Users, Clock, CheckCircle, Plus } from 'lucide-react';
import { LABEL_CONFIG } from '../constants';
import Badge from './Badge';

export default function ShopperBundleCard({ bundle, inCart, onAddToCart }) {
  const lc = LABEL_CONFIG[bundle.label] || LABEL_CONFIG['Tonight Only'];

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid #f3f4f6',
      marginBottom: '16px',
    }}>
      {/* Card Header */}
      <div style={{
        background: '#fef9f0',
        padding: '16px',
        borderBottom: '1px solid #f5e9d8',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          background: '#fff7ed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          flexShrink: 0,
          border: '1px solid #fed7aa',
        }}>
          {bundle.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '4px' }}>
            <Badge
              label={bundle.label}
              bg={lc.primary}
              color="white"
              borderRadius="4px"
              fontSize="9px"
              fontWeight="800"
              padding="2px 7px"
              uppercase
            />
          </div>
          <h3 style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: '700',
            color: '#111827',
            letterSpacing: '-0.2px',
            lineHeight: 1.2,
          }}>
            {bundle.name}
          </h3>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px', lineHeight: 1 }}>
            ${bundle.bundlePrice.toFixed(2)}
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', textDecoration: 'line-through', marginTop: '2px' }}>
            ${bundle.retailValue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '14px 16px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#4b5563', lineHeight: 1.5 }}>
          {bundle.description}
        </p>

        {/* Ingredients */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
          {bundle.ingredients.map(ing => (
            <span key={ing.skuId} style={{
              padding: '3px 8px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: '500',
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #e5e7eb',
            }}>
              {ing.name}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Users size={11} />
            Serves {bundle.serves}
          </span>
          <span style={{
            fontSize: '11px',
            color: '#d97706',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: '#fffbeb',
            padding: '2px 7px',
            borderRadius: '100px',
            border: '1px solid #fde68a',
          }}>
            <Clock size={10} />
            {bundle.expiryLabel}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => !inCart && onAddToCart(bundle)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: inCart ? '2px solid #bbf7d0' : '2px solid transparent',
            cursor: inCart ? 'default' : 'pointer',
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s',
            background: inCart ? '#f0fdf4' : '#111827',
            color: inCart ? '#16a34a' : 'white',
            letterSpacing: '-0.1px',
          }}
        >
          {inCart ? <><CheckCircle size={16} />Added ✓</> : <><Plus size={16} />Add to Cart</>}
        </button>
      </div>
    </div>
  );
}
