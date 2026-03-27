import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const recovered = payload.find(p => p.dataKey === 'recoveredRevenue');
  const unrecovered = payload.find(p => p.dataKey === 'unrecoveredLoss');
  const total = (recovered?.value || 0) + (unrecovered?.value || 0);
  const pct = total > 0 ? Math.round(((recovered?.value || 0) / total) * 100) : 0;
  return (
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: '180px' }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>{label}</div>
      {recovered && (
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#16a34a', display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
          <span>Recovered</span><span>${recovered.value.toLocaleString()}</span>
        </div>
      )}
      {unrecovered && (
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '8px' }}>
          <span>Unrecovered</span><span>${unrecovered.value.toLocaleString()}</span>
        </div>
      )}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '6px', fontSize: '12px', fontWeight: '700', color: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
        <span>Recovery Rate</span>
        <span style={{ color: pct >= 50 ? '#16a34a' : '#d97706' }}>{pct}%</span>
      </div>
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', paddingTop: '10px' }}>
      {payload.map(entry => (
        <div key={entry.value} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px',
            background: entry.dataKey === 'unrecoveredLoss' ? '#f1f5f9' : entry.color,
            border: entry.dataKey === 'unrecoveredLoss' ? '1.5px solid #cbd5e1' : 'none',
          }} />
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// Hoisted outside component so Recharts sees a stable reference across renders
function makeCustomXTick(peakDate) {
  return function CustomXTick({ x, y, payload }) {
    const isPeak = payload.value === peakDate;
    return (
      <text x={x} y={y + 12} textAnchor="middle" fill={isPeak ? '#16a34a' : '#94a3b8'} fontSize={11} fontWeight={isPeak ? '700' : '400'} fontFamily="inherit">
        <tspan x={x} dy={0}>{payload.value}</tspan>
        {isPeak && <tspan x={x} dy={13} fontSize={9} fill="#16a34a">(PEAK)</tspan>}
      </text>
    );
  };
}

export default function ShrinkChart({ data }) {
  const { enriched, peakDay, efficiencyPeak } = useMemo(() => {
    const enriched = data.map(d => ({
      ...d,
      recoveredRevenue: d.kittedRecovery,
      unrecoveredLoss: Math.max(0, d.shrinkLoss - d.kittedRecovery),
    }));
    const peakDay = enriched.reduce((best, d) => d.kittedRecovery > best.kittedRecovery ? d : best, enriched[0]);
    return { enriched, peakDay, efficiencyPeak: Math.round((peakDay.kittedRecovery / peakDay.shrinkLoss) * 100) };
  }, [data]);

  const CustomXTick = useMemo(() => makeCustomXTick(peakDay.date), [peakDay.date]);

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>7-Day Shrink & Bundle Performance</h2>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Daily recovered vs. unrecovered shrink exposure</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '2px' }}>Efficiency Peak</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#16a34a', letterSpacing: '-0.5px' }}>{efficiencyPeak}% Recovery</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={enriched} margin={{ top: 8, right: 8, bottom: 16, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="date" tick={<CustomXTick />} axisLine={false} tickLine={false} height={36} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'inherit' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="unrecoveredLoss" name="Unrecovered Loss" stackId="shrink" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={1} radius={[0, 0, 4, 4]} maxBarSize={48} />
          <Bar dataKey="recoveredRevenue" name="Recovered Revenue" stackId="shrink" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
