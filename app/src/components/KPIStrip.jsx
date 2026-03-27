import { TrendingDown, ShoppingBag, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/format';

function KPICard({ icon: Icon, label, value, valueParts, valueColor, badge, badgeColor, badgeBg, accentBg, accentColor }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px 20px 16px',
      border: '1px solid #e2e8f0',
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top row: label + icon */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {label}
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: accentBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={16} color={accentColor} />
        </div>
      </div>

      {/* Value */}
      {valueParts ? (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
          <div style={{
            fontSize: '30px',
            fontWeight: '700',
            color: valueColor || '#0f172a',
            letterSpacing: '-0.8px',
            lineHeight: 1,
          }}>
            {valueParts.main}
          </div>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#64748b' }}>
            {valueParts.unit}
          </div>
        </div>
      ) : (
        <div style={{
          fontSize: '30px',
          fontWeight: '700',
          color: valueColor || '#0f172a',
          letterSpacing: '-0.8px',
          lineHeight: 1,
          marginBottom: '12px',
        }}>
          {value}
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span style={{
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: '600',
            background: badgeBg,
            color: badgeColor,
          }}>
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}

export default function KPIStrip({ totalShrinkExposure, bundlesSoldToday, revenueToday, revenueRemaining, sellThroughEfficiency }) {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <KPICard
        icon={TrendingDown}
        label="Shrink Exposure Today"
        value={formatCurrency(totalShrinkExposure)}
        valueColor="#dc2626"
        badge="+12.4% vs yesterday"
        badgeBg="#fee2e2"
        badgeColor="#dc2626"
        accentBg="#fee2e2"
        accentColor="#dc2626"
      />
      <KPICard
        icon={ShoppingBag}
        label="Bundles Sold"
        valueParts={{ main: bundlesSoldToday, unit: 'units' }}
        valueColor="#0f172a"
        badge={`${sellThroughEfficiency}% Efficiency`}
        badgeBg="#dcfce7"
        badgeColor="#16a34a"
        accentBg="#dcfce7"
        accentColor="#16a34a"
      />
      <KPICard
        icon={DollarSign}
        label="Revenue Recovered Today"
        value={formatCurrency(revenueToday)}
        valueColor="#0f172a"
        badge="+12.4% vs yesterday"
        badgeBg="#dcfce7"
        badgeColor="#16a34a"
        accentBg="#dcfce7"
        accentColor="#16a34a"
      />
    </div>
  );
}
