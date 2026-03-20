import { useState } from 'react';
import { atRiskInventory, bundleRecommendations, shrinkTrendData } from '../mockData';
import InventoryPanel from '../components/InventoryPanel';
import BundlePanel from '../components/BundlePanel';
import ShrinkChart from '../components/ShrinkChart';
import KPIStrip from '../components/KPIStrip';

export default function ManagerDashboard({ onSwitchToShopper }) {
  const [bundles, setBundles] = useState(bundleRecommendations);
  const [highlightedSkus, setHighlightedSkus] = useState(new Set());

  function handlePushToApp(bundleId) {
    setBundles(prev =>
      prev.map(b => b.id === bundleId ? { ...b, isLive: true } : b)
    );
  }

  function handleBundleHover(bundle) {
    if (bundle) {
      setHighlightedSkus(new Set(bundle.ingredients.map(i => i.skuId)));
    } else {
      setHighlightedSkus(new Set());
    }
  }

  const totalShrinkExposure = atRiskInventory.reduce(
    (sum, item) => sum + item.quantity * item.costPerUnit, 0
  );
  const bundlesSoldToday = bundles.reduce((sum, b) => sum + b.unitsSold, 0);
  const revenueToday = bundles.reduce((sum, b) => sum + b.unitsSold * b.bundlePrice, 0);
  const revenueRemaining = bundles.reduce((sum, b) => sum + (b.bundlesAvailable - b.unitsSold) * b.bundlePrice, 0);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          margin: 0,
          fontSize: '22px',
          fontWeight: '700',
          color: '#0f172a',
          letterSpacing: '-0.3px',
        }}>
          Inventory Intelligence
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
          Today · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* KPI Strip */}
      <KPIStrip
        totalShrinkExposure={totalShrinkExposure}
        bundlesSoldToday={bundlesSoldToday}
        revenueToday={revenueToday}
        revenueRemaining={revenueRemaining}
      />

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: '20px',
        marginTop: '20px',
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <InventoryPanel
            items={atRiskInventory}
            highlightedSkus={highlightedSkus}
          />
          <ShrinkChart data={shrinkTrendData} />
        </div>

        {/* Right Column: Bundles */}
        <div>
          <BundlePanel
            bundles={bundles}
            onPushToApp={handlePushToApp}
            onBundleHover={handleBundleHover}
          />
        </div>
      </div>
    </div>
  );
}
