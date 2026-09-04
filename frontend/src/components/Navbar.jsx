import React, { useState } from 'react';
import { Sprout, TrendingUp, Store, Zap, Warehouse, ShieldAlert, ShieldCheck, Menu, X, Globe, MapPin, UserCheck, LogOut } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  selectedState,
  setSelectedState,
  onOpenAuth,
  currentUser
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const indianStates = [
    'All India', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh',
    'Gujarat', 'Maharashtra', 'Rajasthan', 'Bihar', 'West Bengal',
    'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala',
    'Odisha', 'Assam', 'Chhattisgarh', 'Jharkhand', 'Uttarakhand',
    'Himachal Pradesh', 'Jammu & Kashmir'
  ];

  const languages = [
    { code: 'English', label: 'English' },
    { code: 'Hindi', label: 'हिन्दी (Hindi)' },
    { code: 'Punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'Gujarati', label: 'ગુજરાતી (Gujarati)' },
    { code: 'Marathi', label: 'मराठी (Marathi)' },
    { code: 'Telugu', label: 'తెలుగు (Telugu)' },
    { code: 'Tamil', label: 'தமிழ் (Tamil)' }
  ];

  const navItems = [
    { id: 'price', label: 'Price Discovery & AI', icon: TrendingUp },
    { id: 'marketplace', label: 'Produce Market', icon: Store },
    { id: 'match', label: 'Smart Match', icon: Zap },
    { id: 'logistics', label: 'Storage & Freight', icon: Warehouse },
    { id: 'orders', label: 'Escrow & Pay', icon: ShieldCheck },
    { id: 'grievance', label: 'Dispute Desk', icon: ShieldAlert }
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <header style={{
      background: 'rgba(7, 18, 13, 0.95)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('price')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 18px rgba(16, 185, 129, 0.45)',
            transform: 'rotate(-2deg)'
          }}>
            <Sprout size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#f0fdf4' }}>
              Krishi<span style={{ color: 'var(--primary)' }}>Link</span>
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Market Linkages & Price Discovery Platform
            </div>
          </div>
        </div>

        {/* Desktop Navigation Pills */}
        <nav className="nav-desktop">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`nav-pill-btn ${isActive ? 'nav-pill-btn-active' : 'nav-pill-btn-inactive'}`}
              >
                <Icon size={16} color={isActive ? '#34d399' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* State Filter & Multilingual & Account Switcher Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* State Search Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#05100b', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <MapPin size={14} color="var(--primary)" />
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.75rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
            >
              {indianStates.map(st => (
                <option key={st} value={st === 'All India' ? '' : st} style={{ background: '#0e2017', color: '#fff' }}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Multilingual Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#05100b', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Globe size={14} color="var(--accent-gold)" />
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} style={{ background: '#0e2017', color: '#fff' }}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Account & Persona Button */}
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'var(--primary-light)',
                border: '1px solid var(--primary)',
                color: '#34d399',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <UserCheck size={14} /> {currentUser?.name ? currentUser.name.split(' ')[0] : 'Account'} ({currentUser?.role || 'User'})
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="nav-mobile-drawer">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', paddingLeft: '0.5rem' }}>
            NAVIGATION MENU:
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`mobile-nav-item ${isActive ? 'mobile-nav-item-active' : 'mobile-nav-item-inactive'}`}
              >
                <Icon size={18} color={isActive ? '#34d399' : 'var(--text-muted)'} />
                <span style={{ flex: 1 }}>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => { setMobileOpen(false); if (onOpenAuth) onOpenAuth(); }}
            className="btn btn-outline"
            style={{ marginTop: '0.5rem', width: '100%', borderRadius: 'var(--radius-md)' }}
          >
            <UserCheck size={16} /> Switch Account / Demo Persona
          </button>
        </div>
      )}
    </header>
  );
}
