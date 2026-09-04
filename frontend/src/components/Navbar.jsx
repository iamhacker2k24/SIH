import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sprout, TrendingUp, Store, Zap, Warehouse, ShieldAlert, ShieldCheck, Menu, X, Globe, MapPin, UserCheck, Users } from 'lucide-react';

export default function Navbar({
  selectedLanguage,
  setSelectedLanguage,
  selectedState,
  setSelectedState,
  onOpenAuth,
  currentUser
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    { path: '/', label: 'Farmer Home Hub', icon: Sprout },
    { path: '/price', label: 'Check Live Prices', icon: TrendingUp },
    { path: '/marketplace', label: 'Sell & Buy Market', icon: Store },
    { path: '/match', label: 'Smart Match', icon: Zap },
    { path: '/logistics', label: 'Book Storage', icon: Warehouse },
    { path: '/orders', label: 'Payouts & Escrow', icon: ShieldCheck },
    { path: '/grievance', label: 'Report & Support', icon: ShieldAlert },
    ...(currentUser?.role === 'Admin' ? [{ path: '/admin', label: 'Admin Staff Portal', icon: Users }] : [])
  ];

  const handleNavClick = (path) => {
    navigate(path);
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
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)'
          }}>
            <Sprout size={24} color="#fff" />
          </div>

          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Krishi<span style={{ color: 'var(--primary)' }}>Link</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
              Agri Market & Price Discovery
            </div>
          </div>
        </div>

        {/* Global Controls: State Search & Language & Account Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* State Search Selector */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <MapPin size={16} color="var(--primary)" style={{ position: 'absolute', left: '0.6rem', zIndex: 2 }} />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="form-select"
              style={{
                paddingLeft: '2.1rem',
                paddingTop: '0.4rem',
                paddingBottom: '0.4rem',
                fontSize: '0.85rem',
                width: '160px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--border-color)',
                color: '#fff'
              }}
            >
              <option value="">Select State / Mandi...</option>
              {indianStates.map(state => (
                <option key={state} value={state} style={{ background: '#0a1f16', color: '#fff' }}>{state}</option>
              ))}
            </select>
          </div>

          {/* Multilingual Selector */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Globe size={16} color="var(--accent-gold)" style={{ position: 'absolute', left: '0.6rem', zIndex: 2 }} />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="form-select"
              style={{
                paddingLeft: '2.1rem',
                paddingTop: '0.4rem',
                paddingBottom: '0.4rem',
                fontSize: '0.85rem',
                width: '145px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--border-color)',
                color: '#fff'
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} style={{ background: '#0a1f16', color: '#fff' }}>{lang.label}</option>
              ))}
            </select>
          </div>

          {/* Persona Account Badge / Switcher */}
          <button
            onClick={onOpenAuth}
            className="btn btn-outline"
            style={{
              borderRadius: '20px',
              padding: '0.4rem 0.85rem',
              fontSize: '0.825rem',
              borderColor: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <UserCheck size={16} color="var(--primary)" />
            <span>{currentUser?.name || 'Login / Demo'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-outline"
            style={{
              padding: '0.4rem 0.6rem',
              borderRadius: '8px',
              color: '#fff',
              borderColor: 'var(--border-color)'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Drawer Menu for Page Links */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(5, 15, 10, 0.98)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
            Navigation Pages
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
