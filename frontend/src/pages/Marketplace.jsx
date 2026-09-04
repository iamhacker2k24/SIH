import React, { useState, useEffect } from 'react';
import { Store, Plus, Filter, CheckCircle2, DollarSign, Award, MapPin, Package, Clock, ShieldCheck, RefreshCw, Flame, Building2, TrendingUp, Send } from 'lucide-react';
import { api } from '../services/api';
import CreateLotModal from '../components/CreateLotModal';
import PlaceBidModal from '../components/PlaceBidModal';

export default function Marketplace({ currentUser }) {
  const [activeTab, setActiveTab] = useState('farmer_lots'); // 'farmer_lots' | 'buyer_demands'
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedLotForBid, setSelectedLotForBid] = useState(null);
  const [selectedDemandForFulfill, setSelectedDemandForFulfill] = useState(null);

  // Filters
  const [gradeFilter, setGradeFilter] = useState('');
  const [commodityFilter, setCommodityFilter] = useState('');

  const fallbackImage = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop';

  // Recent Buyer Procurement Demands Dataset
  const [buyerDemands, setBuyerDemands] = useState([
    {
      id: 'demand-1',
      buyerCompany: 'ITC Foods Agri Division',
      buyerRole: 'Verified Institutional Buyer',
      commodity: 'Paddy (Basmati 1121)',
      requiredVolumeQuintals: 2500,
      offeredPricePerQuintal: 4620,
      targetLocation: 'Ludhiana APMC Logistics Hub, Punjab',
      deliveryDeadline: '2026-09-15',
      gradeRequired: 'Grade A',
      qualitySpecs: 'Moisture ≤ 12.5% | Purity ≥ 99%',
      escrowGuaranteed: true,
      urgency: '🔥 Urgent High Demand'
    },
    {
      id: 'demand-2',
      buyerCompany: 'Adani Wilmar Staple Grains',
      buyerRole: 'Processor & Miller',
      commodity: 'Wheat (Sharbati)',
      requiredVolumeQuintals: 1800,
      offeredPricePerQuintal: 2520,
      targetLocation: 'Karnal Anaj Mandi Depot, Haryana',
      deliveryDeadline: '2026-09-18',
      gradeRequired: 'Grade A',
      qualitySpecs: 'Moisture ≤ 11.0% | Bold Grain',
      escrowGuaranteed: true,
      urgency: '⚡ Escrow Locked'
    },
    {
      id: 'demand-3',
      buyerCompany: 'BigBasket Fresh Wholesale',
      buyerRole: 'Retail Direct Procurement',
      commodity: 'Tomato (Hybrid)',
      requiredVolumeQuintals: 600,
      offeredPricePerQuintal: 2250,
      targetLocation: 'Azadpur Mandi Gate 4, Delhi',
      deliveryDeadline: '2026-09-08',
      gradeRequired: 'Grade A',
      qualitySpecs: 'Firm Red, Impurity ≤ 0.5%',
      escrowGuaranteed: true,
      urgency: '🔥 Same Day Pick-up'
    },
    {
      id: 'demand-4',
      buyerCompany: 'Patanjali Agro Exports',
      buyerRole: 'Exporters & Processors',
      commodity: 'Cotton (Medium Staple)',
      requiredVolumeQuintals: 1200,
      offeredPricePerQuintal: 7400,
      targetLocation: 'GIDC Industrial Yard, Rajkot, Gujarat',
      deliveryDeadline: '2026-09-22',
      gradeRequired: 'Grade A',
      qualitySpecs: 'Staple Length 28mm | Moisture ≤ 8.0%',
      escrowGuaranteed: true,
      urgency: '🟢 High Volume Buying'
    }
  ]);

  useEffect(() => {
    fetchLots();
  }, [gradeFilter, commodityFilter]);

  const fetchLots = async () => {
    setLoading(true);
    try {
      const res = await api.getLots({ grade: gradeFilter, commodity: commodityFilter });
      if (res.success) {
        setLots(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (lotId, bidId) => {
    try {
      const res = await api.acceptBid(lotId, bidId, currentUser);
      if (res.success) {
        alert('Digital Offer Accepted! Order & Escrow payment tracking initiated.');
        fetchLots();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetFilters = () => {
    setGradeFilter('');
    setCommodityFilter('');
  };

  const filteredDemands = buyerDemands.filter(d =>
    (commodityFilter ? d.commodity.toLowerCase().includes(commodityFilter.toLowerCase()) : true) &&
    (gradeFilter ? d.gradeRequired.toLowerCase() === gradeFilter.toLowerCase() : true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card responsive-header-banner" style={{
        background: 'linear-gradient(135deg, #11271b 0%, #0d1e15 100%)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Store color="var(--primary)" size={22} />
            <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>Digital Produce Marketplace & Buyer Demands</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Direct lot creation by Farmers/FPOs and verified bulk procurement tenders posted by institutional buyers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(currentUser?.role === 'Farmer' || currentUser?.role === 'FPO') && (
            <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
              <Plus size={18} /> Post Produce Lot (Desire Price)
            </button>
          )}

          {currentUser?.role === 'Buyer' && (
            <button className="btn btn-gold" onClick={() => alert('Opening Buyer Demand Tender Form: Specify commodity, target volume & buying rate.')}>
              <Plus size={18} /> Post Buyer Procurement Tender
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Switcher: Farmer Lots vs Recent Buyer Demands */}
      <div className="glass-card" style={{ padding: '0.75rem 1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeTab === 'farmer_lots' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1, minWidth: '200px' }}
          onClick={() => setActiveTab('farmer_lots')}
        >
          🌾 Farmer Crop Lots Available ({lots.length})
        </button>
        <button
          className={`btn ${activeTab === 'buyer_demands' ? 'btn-gold' : 'btn-outline'}`}
          style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          onClick={() => setActiveTab('buyer_demands')}
        >
          <Flame size={18} color="#f59e0b" /> Recent Buyer Demands & Tenders ({buyerDemands.length})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card responsive-filter-bar" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Filter size={18} />
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Filter Listings:</span>
        </div>

        <select className="form-select" style={{ width: '200px' }} value={commodityFilter} onChange={e => setCommodityFilter(e.target.value)}>
          <option value="">All Commodities</option>
          <option value="Wheat">Wheat</option>
          <option value="Paddy">Paddy / Rice</option>
          <option value="Cotton">Cotton</option>
          <option value="Tomato">Tomato</option>
          <option value="Onion">Onion</option>
        </select>

        <select className="form-select" style={{ width: '200px' }} value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
          <option value="">All Quality Grades</option>
          <option value="Grade A">Grade A</option>
          <option value="Grade B">Grade B</option>
          <option value="Organic Certified">Organic Certified</option>
        </select>

        {(commodityFilter || gradeFilter) && (
          <button className="btn btn-outline" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={handleResetFilters}>
            <RefreshCw size={14} /> Clear Filters
          </button>
        )}
      </div>

      {/* TAB 1: FARMER PRODUCE LOTS */}
      {activeTab === 'farmer_lots' && (
        <>
          {loading ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>Loading produce lots...</div>
            </div>
          ) : lots.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <Package size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>No Produce Lots Found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                No crop lots match your selected filter criteria.
              </p>
              <button className="btn btn-primary" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {lots.map(lot => (
                <div
                  key={lot.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    maxWidth: '450px',
                    width: '100%',
                    margin: '0 auto'
                  }}
                >
                  <div>
                    {/* Photo Container with fixed aspect ratio */}
                    <div style={{
                      width: '100%',
                      height: '210px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      marginBottom: '1rem',
                      position: 'relative',
                      background: '#091811'
                    }}>
                      <img
                        src={lot.images && lot.images[0] ? lot.images[0] : fallbackImage}
                        alt={lot.commodity}
                        onError={(e) => {
                          e.target.src = fallbackImage;
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                      <div style={{ position: 'absolute', top: '10px', right: '10px' }} className="badge badge-green">
                        <Award size={12} /> {lot.grade}
                      </div>
                      <div style={{ position: 'absolute', bottom: '10px', left: '10px' }} className="badge badge-gold">
                        {lot.storageStatus}
                      </div>
                    </div>

                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>{lot.commodity}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                      <MapPin size={14} color="var(--primary)" /> {lot.location.district}, {lot.location.state}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quantity</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{lot.quantityQuintals} Quintals</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Asking Rate</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>₹{lot.askingPricePerQuintal}/Qtl</div>
                      </div>
                    </div>

                    {/* Quality parameters */}
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                      <div><strong>Moisture:</strong> {lot.qualityParameters?.moisturePercent}% | <strong>Impurity:</strong> {lot.qualityParameters?.foreignMatterPercent}%</div>
                      <div><strong>Seller:</strong> {lot.sellerName} ({lot.sellerRole})</div>
                    </div>

                    {/* Bids list if any */}
                    {lot.bids && lot.bids.length > 0 && (
                      <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px dashed rgba(245, 158, 11, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                          Active Bids ({lot.bids.length}):
                        </div>
                        {lot.bids.map(bid => (
                          <div key={bid.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                            <div>
                              <strong style={{ color: '#fff' }}>{bid.buyerCompany}</strong>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>₹{bid.bidPricePerQuintal}/Quintal</div>
                            </div>
                            {(currentUser?.role === 'Farmer' || currentUser?.role === 'FPO') && bid.status === 'PENDING' && (
                              <button
                                className="btn btn-primary"
                                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                                onClick={() => handleAcceptBid(lot.id, bid.id)}
                              >
                                Accept Offer
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  {currentUser?.role === 'Buyer' ? (
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => setSelectedLotForBid(lot)}>
                      <DollarSign size={16} /> Place Bid / Digital Offer
                    </button>
                  ) : (
                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Status: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{lot.status}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* TAB 2: RECENT BUYER PROCUREMENT DEMANDS */}
      {activeTab === 'buyer_demands' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card" style={{ background: 'linear-gradient(135deg, #1c1507 0%, #0d1e15 100%)', border: '1px solid var(--accent-gold)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Flame size={20} /> Verified Institutional Buyer Procurement Tenders
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Institutional buyers (exporters, flour mills, retail chains) post bulk demand orders with guaranteed digital escrow payments. Farmers and FPOs can submit matching produce lots directly.
            </p>
          </div>

          <div className="grid-2">
            {filteredDemands.map(demand => (
              <div key={demand.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #f59e0b40', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-gold">{demand.urgency}</span>
                    {demand.escrowGuaranteed && (
                      <span className="badge badge-green"><ShieldCheck size={12} /> Escrow Guaranteed</span>
                    )}
                  </div>

                  <div style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {demand.commodity}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building2 size={14} /> {demand.buyerCompany} ({demand.buyerRole})
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', background: 'rgba(245, 158, 11, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.85rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Volume Required</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{demand.requiredVolumeQuintals} Quintals</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Buying Rate</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold)' }}>₹{demand.offeredPricePerQuintal}/Qtl</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div>📍 <strong>Delivery Target:</strong> {demand.targetLocation}</div>
                    <div>🔬 <strong>Specs:</strong> {demand.qualitySpecs}</div>
                    <div>📅 <strong>Deadline:</strong> {demand.deliveryDeadline}</div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000', fontWeight: 700 }}
                  onClick={() => {
                    setSelectedDemandForFulfill(demand);
                    alert(`Fulfilling Bulk Buyer Demand for ${demand.buyerCompany}:\nCommodity: ${demand.commodity}\nBuying Price: ₹${demand.offeredPricePerQuintal}/Quintal\nVolume: ${demand.requiredVolumeQuintals} Quintals\n\nDirect Escrow Contract Initiated with Buyer!`);
                  }}
                >
                  <Send size={16} /> Fulfill Buyer Demand / Supply Produce
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateLotModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        currentUser={currentUser}
        onLotCreated={fetchLots}
      />

      <PlaceBidModal
        isOpen={!!selectedLotForBid}
        onClose={() => setSelectedLotForBid(null)}
        lot={selectedLotForBid}
        currentUser={currentUser}
        onBidPlaced={fetchLots}
      />
    </div>
  );
}
