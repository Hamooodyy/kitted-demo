import { useMemo } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';
import { LABEL_CONFIG } from '../constants';
import { formatCurrency } from '../utils/format';

function LabelBadge({ label }) {
  const lc = LABEL_CONFIG[label] || LABEL_CONFIG['Tonight Only'];
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '700',
      background: lc.bg,
      color: lc.primary,
      border: `1px solid ${lc.border}`,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function BundleCard({ bundle, onPushToApp, onMouseEnter, onMouseLeave }) {
  const recoveryPotential = bundle.bundlePrice * bundle.bundlesAvailable;

  return (
    <div
      onMouseEnter={() => onMouseEnter(bundle)}
      onMouseLeave={() => onMouseLeave(null)}
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '16px',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        cursor: 'default',
      }}
      onMouseOver={e => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = '#cbd5e1';
      }}
      onMouseOut={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      {/* Header: Name + Label */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.2px' }}>
          {bundle.name}
        </h3>
        <LabelBadge label={bundle.label} />
      </div>

      {/* Yield */}
      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
        Yield: {bundle.bundlesAvailable} units
      </div>

      {/* Ingredients */}
      <div style={{ marginBottom: '12px' }}>
        <ul style={{ margin: 0, padding: '0 0 0 14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {bundle.ingredients.map(ing => (
            <li key={ing.skuId} style={{
              fontSize: '12px',
              color: '#334155',
              lineHeight: 1.5,
            }}>
              {ing.name} ({ing.quantity})
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1px',
        background: '#f1f5f9',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '12px',
        border: '1px solid #f1f5f9',
      }}>
        {[
          { label: 'Bundle Price', value: formatCurrency(bundle.bundlePrice), color: '#0f172a' },
          { label: 'Retail', value: formatCurrency(bundle.retailValue), color: '#94a3b8', strike: true },
          { label: 'Recovery', value: `+${formatCurrency(recoveryPotential, 0)}`, color: '#16a34a' },
        ].map(({ label, value, color, strike }) => (
          <div key={label} style={{ background: 'white', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
              {label}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: '700',
              color,
              textDecoration: strike ? 'line-through' : 'none',
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={() => !bundle.isLive && onPushToApp(bundle.id)}
        style={{
          width: '100%',
          padding: '9px',
          borderRadius: '7px',
          border: bundle.isLive ? '1px solid #bbf7d0' : '1px solid #cbd5e1',
          cursor: bundle.isLive ? 'default' : 'pointer',
          fontSize: '12px',
          fontWeight: '600',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.2s',
          background: bundle.isLive ? '#f0fdf4' : 'white',
          color: bundle.isLive ? '#16a34a' : '#0f172a',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {bundle.isLive
          ? <><CheckCircle size={13} />Live in App</>
          : bundle.label === 'High Demand' ? 'Push to App' : 'Activate Kit'
        }
      </button>
    </div>
  );
}

export default function BundlePanel({ bundles, onPushToApp, onBundleHover }) {
  const totalRecoveryPotential = useMemo(
    () => bundles.reduce((sum, b) => sum + b.bundlePrice * b.bundlesAvailable, 0),
    [bundles]
  );

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Dark Header */}
      <div style={{
        padding: '16px 20px',
        background: '#0c3d2e',
        borderBottom: '1px solid #0f4a38',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Sparkles size={14} color="#6ee7b7" />
          </div>
          <h2 style={{
            margin: 0,
            fontSize: '12px',
            fontWeight: '700',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Bundle Engine Recommendations
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#86efac', lineHeight: 1.5 }}>
          Convert at-risk SKUs into high-margin ready-to-cook kits.
        </p>
      </div>

      {/* Bundle Cards */}
      <div style={{
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: 1,
        overflowY: 'auto',
      }}>
        {bundles.map(bundle => (
          <BundleCard
            key={bundle.id}
            bundle={bundle}
            onPushToApp={onPushToApp}
            onMouseEnter={onBundleHover}
            onMouseLeave={onBundleHover}
          />
        ))}
      </div>

      {/* Total Recovery Footer */}
      <div style={{
        padding: '14px 20px',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>
          Potential Total Recovery
        </span>
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0c3d2e', letterSpacing: '-0.3px' }}>
          {formatCurrency(totalRecoveryPotential)}
        </span>
      </div>
    </div>
  );
}
