import { TrendingDown, Package, TrendingUp } from 'lucide-react';

function KPICard({ icon: Icon, label, value, valueColor, subtext, accentBg, accentColor }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px 24px',
      border: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flex: 1,
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        background: accentBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} color={accentColor} />
      </div>
      <div>
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#64748b', marginBottom: '2px' }}>
          {label}
        </div>
        <div style={{
          fontSize: '26px',
          fontWeight: '700',
          color: valueColor || '#0f172a',
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
        }}>
          {value}
        </div>
        {subtext && (
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}

export default function KPIStrip({ totalShrinkExposure, skusAtRisk, estimatedRecovery }) {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <KPICard
        icon={TrendingDown}
        label="Shrink Exposure Today"
        value={`$${totalShrinkExposure.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        valueColor="#dc2626"
        subtext="Est. loss if unsold"
        accentBg="#fee2e2"
        accentColor="#dc2626"
      />
      <KPICard
        icon={Package}
        label="SKUs at Risk"
        value={skusAtRisk}
        subtext="Across 4 categories"
        accentBg="#fef3c7"
        accentColor="#d97706"
      />
      <KPICard
        icon={TrendingUp}
        label="Recovery if Kitted Sells Through"
        value={`$${estimatedRecovery.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        valueColor="#16a34a"
        subtext="Based on active bundles"
        accentBg="#dcfce7"
        accentColor="#16a34a"
      />
    </div>
  );
}
