import { useState } from 'react';
import { bundleRecommendations } from '../mockData';
import { ShoppingCart } from 'lucide-react';
import PhoneFrame from '../components/PhoneFrame';
import ShopperBundleCard from '../components/ShopperBundleCard';
import CartBar from '../components/CartBar';

export default function ShopperView() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(bundle) {
    setCartItems(prev => {
      if (prev.find(i => i.id === bundle.id)) return prev;
      return [...prev, { id: bundle.id, name: bundle.name, price: bundle.bundlePrice }];
    });
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      minHeight: 'calc(100vh - 56px)',
      background: '#e2e8f0',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <PhoneFrame>
        {/* App Header */}
        <div style={{ padding: '14px 20px 12px', background: 'white', borderBottom: '1px solid #f3f0eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                Wegmans App
              </div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827', letterSpacing: '-0.4px' }}>
                Tonight's Specials
              </div>
            </div>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#f9fafb', border: '1px solid #e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <ShoppingCart size={16} color="#374151" />
              {cartItems.length > 0 && (
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#16a34a', color: 'white',
                  fontSize: '10px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {cartItems.length}
                </div>
              )}
            </div>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#6b7280' }}>
            Fresh kits — great prices, tonight only 🌿
          </p>
        </div>

        {/* Scrollable Feed */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px',
          paddingBottom: cartItems.length > 0 ? '80px' : '16px',
          maxHeight: '680px',
        }}>
          {bundleRecommendations.map(bundle => (
            <ShopperBundleCard
              key={bundle.id}
              bundle={bundle}
              inCart={!!cartItems.find(i => i.id === bundle.id)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {cartItems.length > 0 && <CartBar items={cartItems} total={cartTotal} />}
      </PhoneFrame>

      {/* Side labels */}
      <div style={{
        position: 'fixed', right: '32px', top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '200px',
      }}>
        <div style={{ background: 'white', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Consumer View
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
            This is what shoppers see inside the Wegmans app — bundles created from tonight's at-risk inventory.
          </p>
        </div>
        <div style={{ background: 'white', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#d97706', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Try It
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
            Tap "Add to Cart" on any kit to see the cart update in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
