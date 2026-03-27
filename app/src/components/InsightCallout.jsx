import { useMemo } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/format';

function computeInsight(inventory, bundles) {
  // All SKU IDs covered by at least one bundle
  const bundledSkuIds = new Set(
    bundles.flatMap(b => b.ingredients.map(i => i.skuId))
  );

  // Unbundled at-risk items sorted by urgency then shrink value
  const unbundled = inventory
    .filter(item => !bundledSkuIds.has(item.id))
    .map(item => ({ ...item, shrinkValue: item.quantity * item.costPerUnit }))
    .sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration || b.shrinkValue - a.shrinkValue);

  // Ingredient sell-through: average sell-through rate across all bundles containing that SKU
  const ingredientStats = {};
  bundles.forEach(b => {
    const sellThrough = b.unitsSold / b.bundlesAvailable;
    b.ingredients.forEach(ing => {
      if (!ingredientStats[ing.skuId]) {
        ingredientStats[ing.skuId] = { name: ing.name, rates: [] };
      }
      ingredientStats[ing.skuId].rates.push(sellThrough);
    });
  });

  const ranked = Object.values(ingredientStats)
    .map(s => ({ name: s.name, avg: s.rates.reduce((a, b) => a + b, 0) / s.rates.length }))
    .sort((a, b) => b.avg - a.avg);

  const top = ranked[0];
  const bottom = ranked[ranked.length - 1];
  const ratio = top && bottom && bottom.avg > 0 ? (top.avg / bottom.avg) : null;

  // Coverage gap mode: urgent unbundled item expiring in ≤ 2 days
  const urgent = unbundled.find(item => item.daysUntilExpiration <= 2);
  if (urgent) {
    return {
      mode: 'gap',
      item: urgent,
      ctaLabel: `Create a Kit with ${urgent.name}`,
    };
  }

  // Ingredient performance mode
  return {
    mode: 'performance',
    top,
    bottom,
    ratio: ratio ? Math.round(ratio * 10) / 10 : null,
    topPct: top ? Math.round(top.avg * 100) : null,
    bottomPct: bottom ? Math.round(bottom.avg * 100) : null,
    ctaLabel: 'View Bundle Strategy',
  };
}

export default function InsightCallout({ inventory, bundles }) {
  const insight = useMemo(() => computeInsight(inventory, bundles), [inventory, bundles]);

  let headline, body;

  if (insight.mode === 'gap') {
    const { item } = insight;
    const days = item.daysUntilExpiration;
    headline = 'Unbundled SKU at Risk';
    body = (
      <>
        <strong style={{ color: '#0f172a' }}>{item.name}</strong> ({item.quantity} {item.unit}) expires in{' '}
        <strong style={{ color: '#dc2626' }}>{days} day{days !== 1 ? 's' : ''}</strong> and isn't included
        in any active bundle — leaving{' '}
        <strong style={{ color: '#dc2626' }}>
          {formatCurrency(item.shrinkValue)}
        </strong>{' '}
        in shrink unprotected. Adding it to a kit is your highest-impact move right now.
      </>
    );
  } else {
    const { top, bottom, ratio, topPct, bottomPct } = insight;
    headline = 'Ingredient Pull-Through Insight';
    body = (
      <>
        Bundles featuring <strong style={{ color: '#0f172a' }}>{top?.name}</strong> are selling at a{' '}
        <strong style={{ color: '#16a34a' }}>{topPct}% sell-through rate</strong>
        {ratio && bottom ? (
          <> — {ratio}× faster than kits built around <strong style={{ color: '#0f172a' }}>{bottom.name}</strong> ({bottomPct}%)</>
        ) : null}
        . Prioritize high-demand ingredients when building new kits to maximize recovery.
      </>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      borderLeft: `4px solid ${insight.mode === 'gap' ? '#dc2626' : '#16a34a'}`,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Lightbulb
          size={16}
          color={insight.mode === 'gap' ? '#dc2626' : '#16a34a'}
          style={{ flexShrink: 0 }}
        />
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
          {headline}
        </span>
      </div>

      {/* Body */}
      <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
        {body}
      </p>

      {/* CTA */}
      <button style={{
        width: '100%',
        padding: '10px 16px',
        borderRadius: '8px',
        border: 'none',
        background: '#0f172a',
        color: 'white',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }}>
        {insight.ctaLabel}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
