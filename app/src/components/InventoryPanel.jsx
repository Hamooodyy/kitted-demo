import Badge from './Badge';
import { STATUS_CONFIG, CATEGORY_COLORS } from '../constants';

function DayBadge({ days }) {
  const bg    = days <= 3 ? '#fee2e2' : days <= 6 ? '#fef3c7' : '#f0fdf4';
  const color = days <= 3 ? '#dc2626' : days <= 6 ? '#d97706' : '#16a34a';
  return <Badge label={`${days}d`} bg={bg} color={color} />;
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return <Badge label={status} bg={cfg.bg} color={cfg.color} border={cfg.border} icon={cfg.icon} />;
}

function CategoryTag({ category }) {
  const c = CATEGORY_COLORS[category] || { bg: '#f1f5f9', color: '#475569' };
  return <Badge label={category} bg={c.bg} color={c.color} borderRadius="4px" fontSize="10px" padding="1px 6px" uppercase />;
}

export default function InventoryPanel({ items, highlightedSkus }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
    }}>
      {/* Panel Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
            At-Risk Inventory
          </h2>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
            {items.length} SKUs flagged for today
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#94a3b8', alignItems: 'center' }}>
          {[
            { color: '#dc2626', label: 'Critical (≤3d)' },
            { color: '#d97706', label: 'At Risk (4–6d)' },
            { color: '#16a34a', label: 'Expiring Soon' },
          ].map(({ color, label }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'inline-block' }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['SKU', 'Category', 'Qty', 'Expires', 'Days', 'Shrink Value', 'Status'].map(h => (
                <th key={h} style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#64748b',
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
            {items.map((item, idx) => {
              const isHighlighted = highlightedSkus.has(item.id);
              const shrinkValue = item.quantity * item.costPerUnit;
              return (
                <tr
                  key={item.id}
                  style={{
                    background: isHighlighted ? '#f0fdf4' : idx % 2 === 0 ? 'white' : '#fafafa',
                    transition: 'background 0.2s',
                    borderLeft: isHighlighted ? '3px solid #16a34a' : '3px solid transparent',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <CategoryTag category={item.category} />
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#334155', whiteSpace: 'nowrap' }}>
                    {item.quantity} {item.unit}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>
                    {new Date(item.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <DayBadge days={item.daysUntilExpiration} />
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#dc2626', whiteSpace: 'nowrap' }}>
                    ${shrinkValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
