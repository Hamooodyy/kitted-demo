import { useState, useMemo } from 'react';
import { CATEGORY_COLORS } from '../constants';

const CATEGORY_DISPLAY = {
  Protein: 'Meat & Poultry',
  Produce: 'Produce',
  Dairy: 'Dairy',
  Bakery: 'Bakery',
  Seafood: 'Seafood',
};

function DaysToExpiryBadge({ days }) {
  const isCritical = days <= 3;
  const isAtRisk = days <= 6;
  const bg    = isCritical ? '#fee2e2' : isAtRisk ? '#fef3c7' : '#f0fdf4';
  const color = isCritical ? '#dc2626' : isAtRisk ? '#d97706' : '#16a34a';
  const suffix = isCritical ? 'CRITICAL' : 'AT RISK';
  const label = `${days} DAY${days !== 1 ? 'S' : ''} (${suffix})`;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 9px',
      borderRadius: '99px',
      background: bg,
      fontSize: '11px',
      fontWeight: '600',
      color,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function CategoryTag({ category }) {
  const c = CATEGORY_COLORS[category] || { bg: '#f1f5f9', color: '#475569' };
  const displayName = CATEGORY_DISPLAY[category] || category;
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '600',
      background: c.bg,
      color: c.color,
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}>
      {displayName}
    </span>
  );
}

const SORT_OPTIONS = [
  { label: 'Severity: High to Low', value: 'severity-desc' },
  { label: 'Severity: Low to High', value: 'severity-asc' },
  { label: 'Shrink Value: High to Low', value: 'shrink-desc' },
  { label: 'Shrink Value: Low to High', value: 'shrink-asc' },
];

export default function InventoryPanel({ items, highlightedSkus }) {
  const [sortKey, setSortKey] = useState('severity-desc');

  const sortedItems = useMemo(() => {
    const copy = [...items];
    if (sortKey === 'severity-desc') {
      copy.sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration);
    } else if (sortKey === 'severity-asc') {
      copy.sort((a, b) => b.daysUntilExpiration - a.daysUntilExpiration);
    } else if (sortKey === 'shrink-desc') {
      copy.sort((a, b) => (b.quantity * b.costPerUnit) - (a.quantity * a.costPerUnit));
    } else if (sortKey === 'shrink-asc') {
      copy.sort((a, b) => (a.quantity * a.costPerUnit) - (b.quantity * b.costPerUnit));
    }
    return copy;
  }, [items, sortKey]);

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Panel Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
            At-Risk Inventory
          </h2>
          <span style={{
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '700',
            background: '#dc2626',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Action Required
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
          <span>Filter by:</span>
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value)}
            style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#334155',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '4px 8px',
              background: 'white',
              cursor: 'pointer',
              fontFamily: 'inherit',
              outline: 'none',
            }}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scrollable Table */}
      <div style={{ overflowY: 'auto', maxHeight: '340px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <tr style={{ background: '#f8fafc' }}>
              {['SKU / Item Name', 'Category', 'Qty', 'Days to Expiry', 'Shrink Value'].map(h => (
                <th key={h} style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #f1f5f9',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item, idx) => {
              const isHighlighted = highlightedSkus.has(item.id);
              const shrinkValue = item.quantity * item.costPerUnit;
              return (
                <tr
                  key={item.id}
                  style={{
                    background: isHighlighted ? '#f0fdf4' : 'white',
                    transition: 'background 0.2s',
                    borderLeft: isHighlighted ? '3px solid #16a34a' : '3px solid transparent',
                    borderBottom: '1px solid #f8fafc',
                  }}
                >
                  <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', fontFamily: 'monospace' }}>
                      {item.id}
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <CategoryTag category={item.category} />
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', color: '#334155', whiteSpace: 'nowrap' }}>
                    {item.quantity} {item.unit}
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <DaysToExpiryBadge days={item.daysUntilExpiration} />
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: '700', color: '#dc2626', whiteSpace: 'nowrap' }}>
                    ${shrinkValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 20px',
        borderTop: '1px solid #f1f5f9',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          {items.length} high-priority SKUs flagged today
        </span>
      </div>
    </div>
  );
}
