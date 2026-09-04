import React, { useState } from 'react';
import { X, Sprout, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function CreateLotModal({ isOpen, onClose, currentUser, onLotCreated }) {
  const [formData, setFormData] = useState({
    sellerName: currentUser?.name || 'Ramesh Patel',
    sellerRole: currentUser?.role || 'Farmer',
    commodity: 'Wheat (Sharbati)',
    variety: 'Sharbati High-Protein Grade',
    quantityQuintals: 200,
    askingPricePerQuintal: 2450,
    grade: 'Grade A',
    moisturePercent: 11.5,
    foreignMatterPercent: 0.8,
    village: 'Samrala',
    district: 'Ludhiana',
    state: 'Punjab',
    storageStatus: 'At Farm Gate',
    warehouseName: 'N/A',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop'
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.createLot(formData, currentUser);
      if (res.success) {
        setSuccessMsg('Produce Lot successfully listed on Digital Marketplace!');
        setTimeout(() => {
          setSuccessMsg('');
          setLoading(false);
          onLotCreated(res.data);
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
            <Sprout color="var(--primary)" size={24} />
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Create & Grade Produce Lot</h3>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Seller / FPO Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.sellerName}
                  onChange={e => setFormData({ ...formData, sellerName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Commodity Crop</label>
                <select
                  className="form-select"
                  value={formData.commodity}
                  onChange={e => setFormData({ ...formData, commodity: e.target.value })}
                >
                  <option value="Wheat (Sharbati)">Wheat (Sharbati)</option>
                  <option value="Paddy (Basmati 1121)">Paddy (Basmati 1121)</option>
                  <option value="Cotton (Medium Staple)">Cotton (Medium Staple)</option>
                  <option value="Tomato (Hybrid)">Tomato (Hybrid)</option>
                  <option value="Red Onion (Nashik)">Red Onion (Nashik)</option>
                  <option value="Maize (Yellow)">Maize (Yellow)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quantity (in Quintals)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.quantityQuintals}
                  onChange={e => setFormData({ ...formData, quantityQuintals: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Asking Price (₹ / Quintal)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.askingPricePerQuintal}
                  onChange={e => setFormData({ ...formData, askingPricePerQuintal: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Quality Grade Specification</label>
                <select
                  className="form-select"
                  value={formData.grade}
                  onChange={e => setFormData({ ...formData, grade: e.target.value })}
                >
                  <option value="Grade A">Grade A (Premium Quality)</option>
                  <option value="Grade B">Grade B (Standard Market)</option>
                  <option value="Grade C">Grade C (Processing Grade)</option>
                  <option value="Organic Certified">Organic Certified</option>
                </select>
              </div>

              <div className="form-group">
                <label>Moisture Content (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={formData.moisturePercent}
                  onChange={e => setFormData({ ...formData, moisturePercent: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Storage Status</label>
                <select
                  className="form-select"
                  value={formData.storageStatus}
                  onChange={e => setFormData({ ...formData, storageStatus: e.target.value })}
                >
                  <option value="At Farm Gate">At Farm Gate</option>
                  <option value="In Cold Storage">In Cold Storage</option>
                  <option value="At Warehouse">At WDRA Warehouse</option>
                </select>
              </div>

              <div className="form-group">
                <label>State / District Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={`${formData.district}, ${formData.state}`}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating Lot...' : 'Publish Produce Lot'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
