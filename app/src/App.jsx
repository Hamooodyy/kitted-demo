import { useState } from 'react';
import { LayoutDashboard, Smartphone, Search, Bell, Settings } from 'lucide-react';
import ManagerDashboard from './views/ManagerDashboard';
import ShopperView from './views/ShopperView';
import { storeInfo } from './mockData';

const NAV_VIEWS = [
  { id: 'manager', label: 'Manager', Icon: LayoutDashboard },
  { id: 'shopper', label: 'Shopper', Icon: Smartphone },
];

export default function App() {
  const [activeView, setActiveView] = useState('manager');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f1f5f9' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px', color: 'white', letterSpacing: '-0.5px' }}>W</div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a', letterSpacing: '-0.2px', lineHeight: 1.2 }}>{storeInfo.name}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Store {storeInfo.storeId}</div>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '380px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
              <input
                placeholder="Search inventory, SKUs, or bundles..."
                style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '13px', color: '#0f172a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
            <Bell size={18} style={{ color: '#64748b', cursor: 'pointer', flexShrink: 0 }} />
            <Settings size={18} style={{ color: '#64748b', cursor: 'pointer', flexShrink: 0 }} />

            <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', lineHeight: 1.2 }}>{storeInfo.manager}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Inventory Manager</div>
              </div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
                {storeInfo.manager.charAt(0)}
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />

            <nav style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '3px', gap: '2px', flexShrink: 0 }}>
              {NAV_VIEWS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px',
                    borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px',
                    fontWeight: '500', fontFamily: 'inherit', transition: 'all 0.15s',
                    background: activeView === id ? 'white' : 'transparent',
                    color: activeView === id ? '#0f172a' : '#64748b',
                    boxShadow: activeView === id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {activeView === 'manager' ? <ManagerDashboard onSwitchToShopper={() => setActiveView('shopper')} /> : <ShopperView />}
      </main>
    </div>
  );
}
