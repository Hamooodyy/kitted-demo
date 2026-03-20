import { Users, Zap, CheckCircle } from 'lucide-react';
import { LABEL_CONFIG } from '../constants';
import Badge from './Badge';

function BundleCard({ bundle, onPushToApp, onMouseEnter, onMouseLeave }) {
  const marginRecovery = bundle.bundlePrice * bundle.bundlesAvailable;
  const discount = Math.round((1 - bundle.bundlePrice / bundle.retailValue) * 100);
  const lc = LABEL_CONFIG[bundle.label] || LABEL_CONFIG['Tonight Only'];

  return (
    <div
      onMouseEnter={() => onMouseEnter(bundle)}
      onMouseLeave={() => onMouseLeave(null)}
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
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
      {/* Label + Name */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '6px' }}>
          <Badge
            label={bundle.label}
            bg={lc.bg}
            color={lc.primary}
            border={lc.border}
            borderRadius="4px"
            fontSize="10px"
            fontWeight="700"
            padding="2px 8px"
            uppercase
          />
        </div>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.2px' }}>
          {bundle.name}
        </h3>
      </div>

      {/* Ingredients */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Includes
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {bundle.ingredients.map(ing => (
            <span key={ing.skuId} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '500',
              background: '#f0fdf4',
              color: '#15803d',
              border: '1px solid #bbf7d0',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
              {ing.name} · {ing.quantity}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        padding: '10px 12px',
        background: '#f8fafc',
        borderRadius: '8px',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Bundle Price</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            ${bundle.bundlePrice.toFixed(2)}
          </div>
        </div>
        <div style={{ width: '1px', height: '36px', background: '#e2e8f0' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Retail Value</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textDecoration: 'line-through' }}>
            ${bundle.retailValue.toFixed(2)}
          </div>
        </div>
        <div style={{ width: '1px', height: '36px', background: '#e2e8f0' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Recovery</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>
            ${marginRecovery.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {/* Meta Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={12} />
            Serves {bundle.serves}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            {bundle.bundlesAvailable} available
          </span>
        </div>
        <Badge
          label={`${discount}% off retail`}
          bg="#fef3c7"
          color="#d97706"
          borderRadius="4px"
          fontSize="11px"
          fontWeight="700"
          padding="2px 6px"
        />
      </div>

      {/* Push to App Button */}
      <button
        onClick={() => !bundle.isLive && onPushToApp(bundle.id)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: bundle.isLive ? '1px solid #bbf7d0' : 'none',
          cursor: bundle.isLive ? 'default' : 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.2s',
          background: bundle.isLive ? '#f0fdf4' : '#0f172a',
          color: bundle.isLive ? '#16a34a' : 'white',
        }}
      >
        {bundle.isLive
          ? <><CheckCircle size={14} />Live in App</>
          : <><Zap size={14} />Push to App</>}
      </button>
    </div>
  );
}

export default function BundlePanel({ bundles, onPushToApp, onBundleHover }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      height: 'fit-content',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', background: 'white' }}>
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
          Bundle Recommendations
        </h2>
        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
          {bundles.length} kits generated · {bundles.filter(b => b.isLive).length} live
        </p>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '80vh', overflowY: 'auto' }}>
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
    </div>
  );
}
