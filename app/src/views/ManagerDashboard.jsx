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
  const totalBundlesAvailable = bundles.reduce((sum, b) => sum + b.bundlesAvailable, 0);
  const bundlesSoldToday = bundles.reduce((sum, b) => sum + b.unitsSold, 0);
  const revenueToday = bundles.reduce((sum, b) => sum + b.unitsSold * b.bundlePrice, 0);
  const revenueRemaining = bundles.reduce((sum, b) => sum + (b.bundlesAvailable - b.unitsSold) * b.bundlePrice, 0);
  const sellThroughEfficiency = Math.round((bundlesSoldToday / totalBundlesAvailable) * 100);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: '700',
          color: '#0f172a',
          letterSpacing: '-0.4px',
        }}>
          Kitted Analytics
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            background: 'white',
            fontSize: '13px',
            fontWeight: '500',
            color: '#334155',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Export Report
          </button>
          <button style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: '#0f172a',
            fontSize: '13px',
            fontWeight: '500',
            color: 'white',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Refresh Data
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <KPIStrip
        totalShrinkExposure={totalShrinkExposure}
        bundlesSoldToday={bundlesSoldToday}
        revenueToday={revenueToday}
        revenueRemaining={revenueRemaining}
        sellThroughEfficiency={sellThroughEfficiency}
      />

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
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
