import React, { useState } from 'react';
import { X, DollarSign, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function PlaceBidModal({ isOpen, onClose, lot, currentUser, onBidPlaced }) {
  const [formData, setFormData] = useState({
    buyerName: currentUser?.name || 'ITC Procurement Division',
    buyerCompany: 'ITC Agro Business India Ltd',
    bidPricePerQuintal: lot?.askingPricePerQuintal || 2450,
    message: 'We accept digital quality parameters and guarantee instant escrow deposit.'
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen || !lot) return null;

  const totalAmount = Number(formData.bidPricePerQuintal || 0) * lot.quantityQuintals;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.placeBid(lot.id, formData, currentUser);
      if (res.success) {
        setSuccessMsg('Digital Bid / Offer submitted to Seller successfully!');
        setTimeout(() => {
          setSuccessMsg('');
          setLoading(false);
          onBidPlaced(res.data);
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DollarSign color="var(--accent-gold)" size={24} />
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Submit Digital Offer for Lot #{lot.id}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {successMsg ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={48} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>{successMsg}</h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lot Details:</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginTop: '0.2rem' }}>{lot.commodity} ({lot.grade})</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '0.2rem' }}>
                Quantity: {lot.quantityQuintals} Quintals | Asking Price: ₹{lot.askingPricePerQuintal}/Quintal
              </div>
            </div>

            <div className="form-group">
              <label>Buyer Company / Institution Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.buyerCompany}
                onChange={e => setFormData({ ...formData, buyerCompany: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Bid Offer Price (₹ / Quintal)</label>
              <input
                type="number"
                className="form-input"
                style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-gold)' }}
                value={formData.bidPricePerQuintal}
                onChange={e => setFormData({ ...formData, bidPricePerQuintal: e.target.value })}
                required
              />
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>Total Calculated Contract Value:</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>₹{totalAmount.toLocaleString('en-IN')}</div>
            </div>

            <div className="form-group">
              <label>Terms or Message to Farmer / FPO</label>
              <textarea
                className="form-textarea"
                rows="3"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Digital Offer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
