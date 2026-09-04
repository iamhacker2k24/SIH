import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, AlertCircle, Sparkles, Filter, RefreshCw, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';

export default function PriceDiscovery({ selectedState }) {
  const [prices, setPrices] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchCommodity, setSearchCommodity] = useState('');
  const [stateFilter, setStateFilter] = useState(selectedState || '');

  useEffect(() => {
    setStateFilter(selectedState || '');
  }, [selectedState]);

  useEffect(() => {
    fetchPrices();
  }, [searchCommodity, stateFilter]);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await api.getMandiPrices({ commodity: searchCommodity, state: stateFilter });
      if (res.success) {
        setPrices(res.data);
        if (res.data.length > 0 && !selectedItem) {
          setSelectedItem(res.data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'UP') return <ArrowUpRight color="#34d399" size={18} />;
    if (trend === 'DOWN') return <ArrowDownRight color="#f87171" size={18} />;
    return <Minus color="#fbbf24" size={18} />;
  };

  const getActionBadgeClass = (action) => {
    if (action === 'SELL_NOW') return 'badge-green';
    if (action === 'HOLD_PRODUCT') return 'badge-gold';
    return 'badge-blue';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #0d281e 0%, #153e2e 100%)',
        border: '1px solid var(--border-glow)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Sparkles color="var(--primary)" size={20} />
            <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>APMC Mandi Intelligence & AI Sale Window</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time price discovery across nearby Mandis with predictive sale-window algorithms to maximize farmer profit margins.
          </p>
        </div>

        <button className="btn btn-outline" onClick={fetchPrices} style={{ display: 'flex', gap: '0.5rem' }}>
          <RefreshCw size={16} /> Refresh Live Mandi Feeds
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Filter size={18} />
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Filter Mandis:</span>
        </div>

        <input
          type="text"
          className="form-input"
          placeholder="Search Commodity (Wheat, Paddy, Tomato...)"
          style={{ width: '260px' }}
          value={searchCommodity}
          onChange={e => setSearchCommodity(e.target.value)}
        />

        <select
          className="form-select"
          style={{ width: '200px' }}
          value={stateFilter}
          onChange={e => setStateFilter(e.target.value)}
        >
          <option value="">All States</option>
          <option value="Punjab">Punjab</option>
          <option value="Haryana">Haryana</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
        </select>
      </div>

      {/* Main Grid: Live Cards & Detailed Chart */}
      <div className="price-discovery-grid">
        {/* Left Column: Price Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--primary)" /> Live Mandi Commodity Rates
          </h3>

          {loading ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>Loading live mandi data...</div>
            </div>
          ) : (
            prices.map(item => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  className="glass-card"
                  onClick={() => setSelectedItem(item)}
                  style={{
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                    background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{item.commodity}</div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                        {item.mandiName} ({item.state})
                      </div>
                    </div>
                    <div className={`badge ${getActionBadgeClass(item.recommendation?.recommendedAction)}`}>
                      {item.recommendation?.recommendedAction.replace('_', ' ')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modal Price (₹ / Quintal)</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        ₹{item.modalPrice.toLocaleString('en-IN')}
                        {getTrendIcon(item.priceTrend)}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Arrival Volume</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{item.arrivalVolume} Tonnes</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: AI Recommendation Engine & 30-Day Trend Chart */}
        {selectedItem ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* AI Recommendation Box */}
            <div className="glass-card" style={{
              background: 'linear-gradient(135deg, #112a1d 0%, #0d1e15 100%)',
              border: '1px solid var(--border-glow)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                <Sparkles size={20} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI Sale-Window Recommendation</h4>
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>
                {selectedItem.recommendation?.reasoning}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem', background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Optimal Action</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {selectedItem.recommendation?.recommendedAction.replace('_', ' ')}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Time Window</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                    {selectedItem.recommendation?.optimalSaleWindowDays} Days
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expected Price Impact</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    +{selectedItem.recommendation?.expectedPriceChangePercent}% Profit
                  </div>
                </div>
              </div>
            </div>

            {/* Price Trend Chart */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Price Trend Visualizer (Past 7 Days)</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedItem.commodity} @ {selectedItem.mandiName}</div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Min: ₹{selectedItem.minPrice} | Max: ₹{selectedItem.maxPrice}
                </div>
              </div>

              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedItem.historicalTrends}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3d2b" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis domain={['auto', 'auto']} stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ background: '#112219', border: '1px solid #10b981', borderRadius: '8px' }}
                      formatter={(val) => [`₹${val} / Quintal`, 'Price']}
                    />
                    <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
