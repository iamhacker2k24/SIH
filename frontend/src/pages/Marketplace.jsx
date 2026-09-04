import React, { useState, useEffect } from 'react';
import { Store, Plus, Filter, CheckCircle2, DollarSign, Award, MapPin, Package, Clock, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import CreateLotModal from '../components/CreateLotModal';
import PlaceBidModal from '../components/PlaceBidModal';

export default function Marketplace({ currentUser }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedLotForBid, setSelectedLotForBid] = useState(null);

  // Filters
  const [gradeFilter, setGradeFilter] = useState('');
  const [commodityFilter, setCommodityFilter] = useState('');

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, #11271b 0%, #0d1e15 100%)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Store color="var(--primary)" size={22} />
            <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Digital Produce Marketplace & Bidding</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Direct lot creation, certified quality grading, and transparent competitive bidding between Farmers/FPOs and Buyers.
          </p>
        </div>

        {(currentUser.role === 'Farmer' || currentUser.role === 'FPO') && (
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
            <Plus size={18} /> Create & Grade Produce Lot
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Filter size={18} />
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Filter Produce:</span>
        </div>

        <select className="form-select" value={commodityFilter} onChange={e => setCommodityFilter(e.target.value)}>
          <option value="">All Commodities</option>
          <option value="Wheat">Wheat</option>
          <option value="Paddy">Paddy / Rice</option>
          <option value="Cotton">Cotton</option>
          <option value="Tomato">Tomato</option>
          <option value="Onion">Onion</option>
        </select>

        <select className="form-select" value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
          <option value="">All Quality Grades</option>
          <option value="Grade A">Grade A</option>
          <option value="Grade B">Grade B</option>
          <option value="Organic Certified">Organic Certified</option>
        </select>
      </div>

      {/* Produce Lots Grid */}
      <div className="grid-3">
        {loading ? (
          <div style={{ color: 'var(--text-muted)' }}>Loading produce lots...</div>
        ) : (
          lots.map(lot => (
            <div key={lot.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '160px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                  <img src={lot.images[0]} alt={lot.commodity} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', borderTop: '1px border-color', paddingTop: '0.5rem' }}>
                  <div><strong>Moisture:</strong> {lot.qualityParameters.moisturePercent}% | <strong>Impurity:</strong> {lot.qualityParameters.foreignMatterPercent}%</div>
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
                        {(currentUser.role === 'Farmer' || currentUser.role === 'FPO') && bid.status === 'PENDING' && (
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
              {currentUser.role === 'Buyer' ? (
                <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => setSelectedLotForBid(lot)}>
                  <DollarSign size={16} /> Place Bid / Digital Offer
                </button>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Status: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{lot.status}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

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
