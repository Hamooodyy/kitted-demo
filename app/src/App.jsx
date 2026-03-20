import { useState } from 'react';
import { LayoutDashboard, Smartphone } from 'lucide-react';
import ManagerDashboard from './views/ManagerDashboard';
import ShopperView from './views/ShopperView';
import { storeInfo } from './mockData';

export default function App() {
  const [activeView, setActiveView] = useState('manager');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f1f5f9' }}>
      {/* Top Nav */}
      <header style={{
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '16px',
              color: 'white',
              letterSpacing: '-0.5px',
            }}>K</div>
            <span style={{
              fontWeight: '700',
              fontSize: '18px',
              color: 'white',
              letterSpacing: '-0.3px',
            }}>kitted</span>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#64748b',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '4px',
              padding: '2px 7px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>Demo Mode</span>
          </div>

          {/* Center: Store info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1px',
          }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>
              {storeInfo.name} — {storeInfo.location}
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              {storeInfo.storeId} · Manager: {storeInfo.manager}
            </span>
          </div>

          {/* Right: View Toggle */}
          <nav style={{
            display: 'flex',
            background: '#1e293b',
            borderRadius: '8px',
            padding: '3px',
            gap: '2px',
          }}>
            <button
              onClick={() => setActiveView('manager')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                background: activeView === 'manager' ? '#16a34a' : 'transparent',
                color: activeView === 'manager' ? 'white' : '#94a3b8',
              }}
            >
              <LayoutDashboard size={14} />
              Manager View
            </button>
            <button
              onClick={() => setActiveView('shopper')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                background: activeView === 'shopper' ? '#16a34a' : 'transparent',
                color: activeView === 'shopper' ? 'white' : '#94a3b8',
              }}
            >
              <Smartphone size={14} />
              Shopper View
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {activeView === 'manager' ? <ManagerDashboard onSwitchToShopper={() => setActiveView('shopper')} /> : <ShopperView />}
      </main>
    </div>
  );
}
