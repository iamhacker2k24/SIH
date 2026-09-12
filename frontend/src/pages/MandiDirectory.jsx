import React, { useState } from 'react';
import { MapPin, PhoneCall, Search, Filter, Sprout, ArrowLeft, CheckCircle2, Award, Navigation, ExternalLink, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function MandiDirectory({ selectedState }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null); // { lat, lng, address }
  const [isLocating, setIsLocating] = useState(false);
  const [selectedMandiMap, setSelectedMandiMap] = useState(null);

  // Mandi Dataset with exact GPS Coordinates
  const [mandisList, setMandisList] = useState([
    { id: 1, name: 'Azadpur APMC Mandi', state: 'Delhi NCR', district: 'North Delhi', distanceKm: 4.2, lat: 28.7061, lng: 77.1772, address: 'Azadpur, GT Karnal Rd, Delhi 110033', majorCrops: 'Wheat, Paddy, Onion, Tomato', phone: '+91 11 2767 1122', status: 'Active Trading', license: 'WDRA & APMC Certified' },
    { id: 2, name: 'Khanna Grain Market APMC', state: 'Punjab', district: 'Ludhiana', distanceKm: 12.5, lat: 30.7028, lng: 76.2217, address: 'Grain Market Rd, Khanna, Punjab 141401', majorCrops: 'Basmati Rice, HD Wheat, Cotton', phone: '+91 1628 230044', status: 'Active Trading', license: 'APMC License #8821' },
    { id: 3, name: 'Vashi Wholesale APMC Market', state: 'Maharashtra', district: 'Navi Mumbai', distanceKm: 18.0, lat: 19.0760, lng: 73.0077, address: 'Sector 19, Vashi, Navi Mumbai, Maharashtra 400703', majorCrops: 'Red Onion, Potato, Alphonso Mangoes', phone: '+91 22 2788 4455', status: 'Active Trading', license: 'WDRA Grade-A' },
    { id: 4, name: 'Karnal Anaj Mandi', state: 'Haryana', district: 'Karnal', distanceKm: 24.0, lat: 29.6857, lng: 76.9905, address: 'Namaste Chowk, Karnal, Haryana 132001', majorCrops: 'PR-126 Paddy, Wheat, Mustard', phone: '+91 184 225 3322', status: 'Active Trading', license: 'APMC License #4412' },
    { id: 5, name: 'Nashik Onion APMC Market', state: 'Maharashtra', district: 'Nashik', distanceKm: 35.0, lat: 19.9975, lng: 73.7898, address: 'Panchavati, Nashik, Maharashtra 422003', majorCrops: 'Garlic, Red Onion, Grapes', phone: '+91 253 231 9900', status: 'Active Trading', license: 'APMC License #9931' }
  ]);

  // Haversine formula to compute exact distance in km between two GPS coordinates
  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  // Detect HTML5 Browser Geolocation
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

        // Update & sort all mandis relative to user's real GPS position
        const updated = mandisList.map(mandi => {
          const dist = calculateHaversineDistance(userLat, userLng, mandi.lat, mandi.lng);
          return { ...mandi, distanceKm: dist };
        }).sort((a, b) => a.distanceKm - b.distanceKm);

        setMandisList(updated);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        alert('Unable to fetch your GPS position. Showing default mandi distances.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const filtered = mandisList.filter(m =>
    (selectedState ? m.state.toLowerCase() === selectedState.toLowerCase() : true) &&
    (m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     m.majorCrops.toLowerCase().includes(searchTerm.toLowerCase()) ||
     m.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
     m.district.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeMapTarget = selectedMandiMap || (filtered.length > 0 ? filtered[0] : mandisList[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #0e243a 0%, #173b5e 100%)',
        border: '1px solid #3b82f640'
      }}>
        <button className="btn btn-outline" style={{ width: 'fit-content', marginBottom: '0.75rem' }} onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> {t('nav_home', 'Back to Farmer Hub')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-blue">📍 Google Maps GPS Mandi Finder</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin color="#3b82f6" size={26} /> {t('mandi_directory_title', 'Nearest APMC Mandis & Google Map Navigation')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px' }}>
          {t('mandi_directory_sub', 'Detect your current live GPS position to sort nearby APMC Mandis by distance and get turn-by-turn Google Maps driving directions.')}
        </p>
      </div>

      {/* Filter & GPS Control Bar */}
      <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.4rem' }}
            placeholder={t('search_mandi', 'Search Mandi name, crop, or district...')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* GPS Live Geolocation Button */}
        <button
          className="btn btn-primary"
          onClick={handleDetectLocation}
          disabled={isLocating}
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Compass size={18} className={isLocating ? 'animate-spin' : ''} />
          {isLocating ? 'Detecting Location...' : userLocation ? 'GPS Updated (Nearest First)' : 'Use My GPS Location'}
        </button>
      </div>

      {/* Main Layout: Left Mandi Directory Cards | Right Google Maps View */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'start' }}>
        {/* Left Column: Sorted Mandi Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(mandi => (
            <div
              key={mandi.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: activeMapTarget?.id === mandi.id ? '2px solid #3b82f6' : '1px solid var(--border-color)',
                background: activeMapTarget?.id === mandi.id ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-card)',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setSelectedMandiMap(mandi)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-blue">📍 {mandi.distanceKm} km away</span>
                  <span className="badge badge-green">{mandi.status}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>
                  {mandi.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  State: {mandi.state} • District: {mandi.district}
                </div>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  📍 {mandi.address}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <strong>Major Traded Crops:</strong> {mandi.majorCrops}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Award size={14} /> License: {mandi.license}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mandi.name + ', ' + mandi.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, textDecoration: 'none', textAlign: 'center', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                  onClick={e => e.stopPropagation()}
                >
                  <Navigation size={16} /> Get Directions (Google Maps)
                </a>
                <button
                  className="btn btn-outline"
                  style={{ width: 'fit-content' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Calling ${mandi.name} Inspector at ${mandi.phone}`);
                  }}
                >
                  <PhoneCall size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Google Maps iFrame Widget */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div className="glass-card" style={{ padding: '1rem', border: '1px solid #3b82f640' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
                  🗺️ Google Map Location
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                  Selected: {activeMapTarget?.name}
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
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '420px', border: '1px solid var(--border-color)' }}>
              <iframe
                title="Mandi Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${activeMapTarget?.lat},${activeMapTarget?.lng}&z=14&output=embed`}
              />
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
              <span>Distance: <strong>{activeMapTarget?.distanceKm} km</strong></span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeMapTarget?.name + ' ' + activeMapTarget?.address)}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--primary)', fontWeight: 600, marginLeft: 'auto' }}
              >
                Open Navigation ➔
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
