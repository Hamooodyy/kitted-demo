import { useState, useMemo } from 'react';
import { bundleRecommendations, storeInfo } from '../mockData';
import { Search, Menu, ChevronRight, X, SlidersHorizontal } from 'lucide-react';
import PhoneFrame from '../components/PhoneFrame';
import ShopperBundleCard from '../components/ShopperBundleCard';
import CartBar from '../components/CartBar';

const CATEGORIES = ['All', 'Chicken', 'Salads', 'Breakfast', 'Veggie', 'Tacos'];

const SORT_OPTIONS = [
  { key: 'best',       label: 'Best Match' },
  { key: 'price_asc',  label: 'Price: Low to High' },
  { key: 'serves_desc', label: 'Serves Most' },
];

const SERVES_OPTIONS = [1, 2, 4, 6];

export default function ShopperView() {
  const [cartItems, setCartItems]         = useState([]);
  const [activeTab, setActiveTab]         = useState('kits');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters]     = useState(false);
  const [sortBy, setSortBy]               = useState('best');
  const [servesFilter, setServesFilter]   = useState([]);

  function handleAddToCart(bundle) {
    setCartItems(prev => {
      if (prev.find(i => i.id === bundle.id)) return prev;
      return [...prev, { id: bundle.id, name: bundle.name, price: bundle.bundlePrice }];
    });
  }

  function toggleServes(val) {
    setServesFilter(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  }

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems]
  );

  const filteredBundles = useMemo(() => {
    let list = bundleRecommendations;
    if (activeCategory !== 'All') {
      list = list.filter(b => b.category === activeCategory);
    }
    if (servesFilter.length > 0) {
      list = list.filter(b => servesFilter.includes(b.serves));
    }
    if (sortBy === 'price_asc') {
      list = [...list].sort((a, b) => a.bundlePrice - b.bundlePrice);
    } else if (sortBy === 'serves_desc') {
      list = [...list].sort((a, b) => b.serves - a.serves);
    }
    return list;
  }, [activeCategory, servesFilter, sortBy]);

  const activeFilterCount = useMemo(() => {
    return (sortBy !== 'best' ? 1 : 0) + servesFilter.length;
  }, [sortBy, servesFilter]);

  function clearFilters() {
    setSortBy('best');
    setServesFilter([]);
  }

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
        <div style={{ background: 'white', borderBottom: '1px solid #f3f0eb' }}>

          {/* Top row: brand + location + icons */}
          <div style={{ padding: '12px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#c2410c', letterSpacing: '0.04em', lineHeight: 1 }}>
                KITTED
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1px', marginTop: '3px' }}>
                <span style={{ fontSize: '11px', color: '#374151', fontWeight: '500' }}>
                  {storeInfo.location}
                </span>
                <ChevronRight size={11} color="#9ca3af" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              {[Search, Menu].map((Icon, i) => (
                <button key={i} style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: '#f9fafb', border: '1px solid #e5e7eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <Icon size={14} color="#374151" />
                </button>
              ))}
            </div>
          </div>

          {/* Kits / Catering tab toggle */}
          <div style={{ padding: '0 16px 11px' }}>
            <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '8px', padding: '3px', gap: '2px' }}>
              {['kits', 'catering'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: '7px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    transition: 'all 0.15s',
                    background: activeTab === tab ? '#c2410c' : 'transparent',
                    color: activeTab === tab ? 'white' : '#6b7280',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter pills */}
          <div style={{
            display: 'flex',
            gap: '6px',
            padding: '0 16px 12px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '5px 13px',
                  borderRadius: '100px',
                  border: activeCategory === cat ? '1.5px solid #c2410c' : '1px solid #e5e7eb',
                  background: activeCategory === cat ? '#fff7ed' : 'white',
                  color: activeCategory === cat ? '#c2410c' : '#374151',
                  fontSize: '12px',
                  fontWeight: activeCategory === cat ? '700' : '500',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.1s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section header with Filters button */}
        <div style={{
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fafafa',
          borderBottom: '1px solid #f3f4f6',
        }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>
            {activeCategory === 'All' ? 'All Kits' : activeCategory}
            <span style={{ fontWeight: '400', color: '#9ca3af', marginLeft: '4px' }}>
              · {filteredBundles.length} items
            </span>
          </span>
          <button
            onClick={() => setShowFilters(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 11px',
              borderRadius: '100px',
              border: activeFilterCount > 0 ? '1.5px solid #c2410c' : '1px solid #d1d5db',
              background: activeFilterCount > 0 ? '#fff7ed' : 'white',
              color: activeFilterCount > 0 ? '#c2410c' : '#374151',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <SlidersHorizontal size={12} />
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>

        {/* Scrollable 2-column grid */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          paddingBottom: cartItems.length > 0 ? '80px' : '12px',
          maxHeight: '540px',
        }}>
          {filteredBundles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af', fontSize: '13px' }}>
              No kits match this filter.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}>
              {filteredBundles.map(bundle => (
                <ShopperBundleCard
                  key={bundle.id}
                  bundle={bundle}
                  inCart={!!cartItems.find(i => i.id === bundle.id)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && <CartBar items={cartItems} total={cartTotal} />}

        {/* Filter bottom sheet */}
        {showFilters && (
          <>
            <div
              onClick={() => setShowFilters(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                zIndex: 10,
                borderRadius: 'inherit',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'white',
              borderRadius: '20px 20px 0 0',
              zIndex: 11,
              paddingBottom: '24px',
              maxHeight: '90%',
              overflowY: 'auto',
            }}>
              {/* Sheet header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px 14px',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>Filters</span>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#f3f4f6', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <X size={14} color="#374151" />
                </button>
              </div>

              {/* Active filter chips */}
              {activeFilterCount > 0 && (
                <div style={{
                  padding: '10px 20px',
                  display: 'flex', gap: '6px', flexWrap: 'wrap',
                  borderBottom: '1px solid #f3f4f6',
                }}>
                  {sortBy !== 'best' && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      padding: '4px 10px', borderRadius: '100px',
                      border: '1px solid #d1d5db',
                      fontSize: '11px', fontWeight: '600', color: '#374151',
                    }}>
                      {SORT_OPTIONS.find(s => s.key === sortBy)?.label}
                      <button
                        onClick={() => setSortBy('best')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                      >
                        <X size={10} color="#9ca3af" />
                      </button>
                    </div>
                  )}
                  {servesFilter.map(s => (
                    <div key={s} style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      padding: '4px 10px', borderRadius: '100px',
                      border: '1px solid #d1d5db',
                      fontSize: '11px', fontWeight: '600', color: '#374151',
                    }}>
                      Serves {s}
                      <button
                        onClick={() => toggleServes(s)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                      >
                        <X size={10} color="#9ca3af" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Sort by */}
              <div style={{ padding: '16px 20px 0' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                  Sort by
                </div>
                {SORT_OPTIONS.map(opt => (
                  <div
                    key={opt.key}
                    onClick={() => setSortBy(opt.key)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '11px 0',
                      borderBottom: '1px solid #f9fafb',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#374151' }}>{opt.label}</span>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      border: sortBy === opt.key ? '5px solid #c2410c' : '2px solid #d1d5db',
                      background: 'white',
                      flexShrink: 0,
                    }} />
                  </div>
                ))}
              </div>

              {/* Serves */}
              <div style={{ padding: '16px 20px 0' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                  Serves
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {SERVES_OPTIONS.map(val => (
                    <button
                      key={val}
                      onClick={() => toggleServes(val)}
                      style={{
                        width: '50px', height: '50px',
                        borderRadius: '10px',
                        border: servesFilter.includes(val) ? '2px solid #c2410c' : '1px solid #e5e7eb',
                        background: servesFilter.includes(val) ? '#c2410c' : 'white',
                        color: servesFilter.includes(val) ? 'white' : '#374151',
                        fontSize: '15px', fontWeight: '700',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.1s',
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear + Apply */}
              <div style={{ display: 'flex', gap: '10px', padding: '20px 20px 0' }}>
                <button
                  onClick={clearFilters}
                  style={{
                    flex: 1, padding: '13px',
                    borderRadius: '100px',
                    border: '1px solid #d1d5db',
                    background: 'white',
                    fontSize: '14px', fontWeight: '700',
                    color: '#374151',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Clear{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    flex: 2, padding: '13px',
                    borderRadius: '100px',
                    border: 'none',
                    background: '#111827',
                    fontSize: '14px', fontWeight: '700',
                    color: 'white',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}
      </PhoneFrame>

      {/* Side explanation callouts */}
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
            Filter by category or serves size, then tap the + button to add kits to your cart.
          </p>
        </div>
      </div>
    </div>
  );
}
