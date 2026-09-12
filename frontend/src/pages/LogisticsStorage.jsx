import React, { useState, useEffect } from 'react';
import { Warehouse, Truck, ShieldCheck, Thermometer, MapPin, Phone, Calendar, CheckCircle2, Navigation, Compass, ExternalLink, Search } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function LogisticsStorage({ currentUser, selectedState }) {
  const { t } = useLanguage();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // GPS Location & Google Maps state
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedMapTarget, setSelectedMapTarget] = useState(null);

  // Booking Form State
  const [requiredTonnes, setRequiredTonnes] = useState(25);
  const [durationDays, setDurationDays] = useState(30);

  // Facility dataset with GPS coordinates
  const facilityCoords = {
    'log-1': { lat: 30.9010, lng: 75.8573, address: 'GT Road, Khanna, Ludhiana, Punjab 141401' },
    'log-2': { lat: 29.6857, lng: 76.9905, address: 'Industrial Area, Karnal, Haryana 132001' },
    'log-3': { lat: 22.3039, lng: 70.8022, address: 'GIDC Phase-2, Rajkot, Gujarat 360003' }
  };

  useEffect(() => {
    fetchFacilities();
  }, [filterType]);

  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await api.getLogistics({ type: filterType });
      if (res.success) {
        const enriched = res.data.map(item => {
          const coords = facilityCoords[item.id] || { lat: 28.6139, lng: 77.2090, address: `${item.district}, ${item.state}` };
          return { ...item, ...coords, distanceKm: 12.4 };
        });
        setFacilities(enriched);
        if (enriched.length > 0 && !selectedMapTarget) {
          setSelectedMapTarget(enriched[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

        const updated = facilities.map(fac => {
          const dist = calculateHaversineDistance(userLat, userLng, fac.lat, fac.lng);
          return { ...fac, distanceKm: dist };
        }).sort((a, b) => a.distanceKm - b.distanceKm);

        setFacilities(updated);
        if (updated.length > 0) setSelectedMapTarget(updated[0]);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        alert('Unable to access GPS location. Showing standard facility distances.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
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
        setBookingSuccess(res.data || { bookingId: 'LOG-BOOK-9912', status: 'CONFIRMED' });
        setTimeout(() => {
          setSelectedFacility(null);
          setBookingSuccess(null);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeMapTarget = selectedMapTarget || (facilities.length > 0 ? facilities[0] : null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #10291d 0%, #0d1e15 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Warehouse color="var(--primary)" size={24} />
          <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>{t('logistics_title', 'Cold Storage & Agri-Logistics Booking')}</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {t('logistics_sub', 'Reserve WDRA-certified cold storage, climate-controlled warehouses, and transport trucks with real-time Google Maps GPS directions.')}
        </p>
      </div>

      {/* Filter & GPS Control Bar */}
      <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)', flexShrink: 0 }}>Facility Type:</span>
          <button
            className={`btn ${filterType === '' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
            onClick={() => setFilterType('')}
          >
            All Facilities
          </button>
          <button
            className={`btn ${filterType === 'Cold Storage' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
            onClick={() => setFilterType('Cold Storage')}
          >
            <Thermometer size={14} /> Cold Storage
          </button>
          <button
            className={`btn ${filterType === 'Dry Warehouse' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
            onClick={() => setFilterType('Dry Warehouse')}
          >
            <Warehouse size={14} /> Dry WDRA Warehouse
          </button>
          <button
            className={`btn ${filterType === 'Transport Provider' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
            onClick={() => setFilterType('Transport Provider')}
          >
            <Truck size={14} /> Transport Provider
          </button>
        </div>

        {/* Live GPS Detection Button */}
        <button
          className="btn btn-primary"
          onClick={handleDetectLocation}
          disabled={isLocating}
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Compass size={16} className={isLocating ? 'animate-spin' : ''} />
          {isLocating ? 'Detecting Location...' : userLocation ? 'GPS Updated (Nearest First)' : 'Use My GPS Location'}
        </button>
      </div>

      {/* Main Grid: Left Facilities Cards | Right Google Maps Navigation */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'start' }}>
        {/* Left Column: Facilities List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? (
            <div className="glass-card" style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>
              Loading storage facilities...
            </div>
          ) : (
            facilities.map(facility => (
              <div
                key={facility.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: activeMapTarget?.id === facility.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: activeMapTarget?.id === facility.id ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
                  gap: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedMapTarget(facility)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span className="badge badge-green">{facility.type}</span>
                    <span className="badge badge-blue">📍 {facility.distanceKm} km away</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>{facility.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    <MapPin size={14} color="var(--primary)" /> {facility.address}
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

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div><Phone size={12} style={{ display: 'inline', marginRight: '4px' }} /> {facility.contactPhone}</div>
                    <div>Rating: <strong style={{ color: 'var(--accent-gold)' }}>★ {facility.rating} / 5.0</strong></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFacility(facility);
                    }}
                  >
                    Reserve Storage Capacity
                  </button>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(facility.name + ', ' + facility.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <Navigation size={14} /> Directions
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Embedded Google Maps Navigation Widget */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div className="glass-card" style={{ padding: '1rem', border: '1px solid var(--border-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
                  🗺️ Storage Google Map Location
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                  Target: {activeMapTarget?.name}
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeMapTarget?.name + ' ' + activeMapTarget?.address)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
              >
                Full Map <ExternalLink size={12} />
              </a>
            </div>

            {/* Embedded Google Map iframe */}
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '380px', border: '1px solid var(--border-color)' }}>
              <iframe
                title="Logistics Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${activeMapTarget?.lat || 28.6139},${activeMapTarget?.lng || 77.2090}&z=14&output=embed`}
              />
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Distance: <strong>{activeMapTarget?.distanceKm} km</strong></span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeMapTarget?.name + ' ' + activeMapTarget?.address)}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                Open Google Directions ➔
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {selectedFacility && (
        <div className="modal-overlay" onClick={() => setSelectedFacility(null)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Reserve Capacity at {selectedFacility.name}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              WDRA Registered Facility • Rate: ₹{selectedFacility.costPerQuintalPerDay}/Quintal/Day
            </div>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)' }}>
                <CheckCircle2 color="var(--primary)" size={32} style={{ margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Booking Request Confirmed!</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Booking Token: {bookingSuccess.bookingId || 'LOG-9901'}</div>
              </div>
            ) : (
              <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">Required Quantity (Tonnes):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={requiredTonnes}
                    onChange={e => setRequiredTonnes(Number(e.target.value))}
                    min="1"
                    max={selectedFacility.capacityAvailableTonnes}
                  />
                </div>

                <div>
                  <label className="form-label">Storage Duration (Days):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={durationDays}
                    onChange={e => setDurationDays(Number(e.target.value))}
                    min="1"
                    max="180"
                  />
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  Total Estimated Fee: <strong style={{ color: 'var(--primary)' }}>₹{Math.round(requiredTonnes * 10 * durationDays * selectedFacility.costPerQuintalPerDay).toLocaleString('en-IN')}</strong>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm Storage Reservation</button>
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedFacility(null)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
