import React, { useState, useEffect } from 'react';
import { Warehouse, Truck, ShieldCheck, Thermometer, MapPin, Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function LogisticsStorage({ currentUser }) {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Booking Form State
  const [requiredTonnes, setRequiredTonnes] = useState(25);
  const [durationDays, setDurationDays] = useState(30);

  useEffect(() => {
    fetchFacilities();
  }, [filterType]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await api.getLogistics({ type: filterType });
      if (res.success) {
        setFacilities(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedFacility) return;

    try {
      const res = await api.bookLogistics({
        logisticsId: selectedFacility.id,
        requiredTonnes,
        durationDays
      }, currentUser);

      if (res.success) {
        setBookingSuccess(res.data);
        setTimeout(() => {
          setSelectedFacility(null);
          setBookingSuccess(null);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #10291d 0%, #0d1e15 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Warehouse color="var(--primary)" size={24} />
          <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Cold Storage & Agri-Logistics Booking</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Prevent panic distress sales by reserving WDRA-certified cold storage facilities, climate-controlled warehouses, and agri-transport trucks.
        </p>
      </div>

      {/* Type Filters */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Facility Type:</span>
        <button
          className={`btn ${filterType === '' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilterType('')}
        >
          All Facilities
        </button>
        <button
          className={`btn ${filterType === 'Cold Storage' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilterType('Cold Storage')}
        >
          <Thermometer size={16} /> Cold Storage
        </button>
        <button
          className={`btn ${filterType === 'Dry Warehouse' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilterType('Dry Warehouse')}
        >
          <Warehouse size={16} /> Dry WDRA Warehouse
        </button>
        <button
          className={`btn ${filterType === 'Transport Provider' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilterType('Transport Provider')}
        >
          <Truck size={16} /> Transport Provider
        </button>
      </div>

      {/* Facilities Grid */}
      <div className="grid-3">
        {loading ? (
          <div style={{ color: 'var(--text-muted)' }}>Loading storage facilities...</div>
        ) : (
          facilities.map(facility => (
            <div key={facility.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span className="badge badge-green">{facility.type}</span>
                  {facility.isGovtCertified && (
                    <span className="badge badge-gold"><ShieldCheck size={12} /> WDRA Certified</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.35rem' }}>{facility.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.85rem' }}>
                  <MapPin size={14} color="var(--primary)" /> {facility.district}, {facility.state}
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Capacity Available</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{facility.capacityAvailableTonnes} Tonnes</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rate</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {facility.type === 'Transport Provider' ? `₹${facility.transportRatePerKmQuintal}/Km/Qtl` : `₹${facility.costPerQuintalPerDay}/Qtl/Day`}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
                  <div><Phone size={12} style={{ display: 'inline', marginRight: '4px' }} /> Contact: {facility.contactPhone}</div>
                  <div>Rating: <strong style={{ color: 'var(--accent-gold)' }}>★ {facility.rating} / 5.0</strong></div>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedFacility(facility)}>
                Book Storage / Transport Space
              </button>
            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      {selectedFacility && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>
              Reserve Capacity at {selectedFacility.name}
            </h3>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={48} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ color: '#fff' }}>{bookingSuccess.facilityName} Reserved!</h4>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Booking Ref: {bookingSuccess.bookingId}</p>
              </div>
            ) : (
              <form onSubmit={handleBook}>
                <div className="form-group">
                  <label>Required Capacity (Tonnes)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={requiredTonnes}
                    onChange={e => setRequiredTonnes(e.target.value)}
                    required
                  />
                </div>

                {selectedFacility.type !== 'Transport Provider' && (
                  <div className="form-group">
                    <label>Duration (Days)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={durationDays}
                      onChange={e => setDurationDays(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedFacility(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Confirm Booking Reservation</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
