import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '10px 14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{
          fontSize: '13px',
          fontWeight: '600',
          color: p.color,
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <span>{p.name}</span>
          <span>${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default function ShrinkChart({ data }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '20px',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
          7-Day Shrink & Bundle Sales Trend
        </h2>
        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
          Daily shrink exposure vs. Kitted recovery and actual bundle sales revenue
        </p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'inherit' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'inherit' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
          <Bar
            dataKey="shrinkLoss"
            name="Shrink Exposure"
            fill="#fee2e2"
            stroke="#fca5a5"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="bundleRevenue"
            name="Bundle Sales Revenue"
            fill="#dbeafe"
            stroke="#93c5fd"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="kittedRecovery"
            name="Kitted Recovery"
            stroke="#16a34a"
            strokeWidth={2.5}
            dot={{ fill: '#16a34a', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div style={{
        marginTop: '16px',
        padding: '10px 14px',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #bbf7d0',
        fontSize: '12px',
        color: '#15803d',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '16px' }}>↑</span>
        <span>
          <strong>On Kitted-active days, bundle sales averaged $256 in revenue</strong> — with up to 75% of projected shrink losses recovered on high-sell days.
        </span>
      </div>
    </div>
  );
}
