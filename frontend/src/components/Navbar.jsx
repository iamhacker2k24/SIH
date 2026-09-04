import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sprout, TrendingUp, Store, Zap, Warehouse, ShieldAlert, ShieldCheck,
  Globe, MapPin, UserCheck, Users, Building2, ChevronDown
} from 'lucide-react';

export default function Navbar({
  selectedLanguage,
  setSelectedLanguage,
  selectedState,
  setSelectedState,
  onOpenAuth,
  currentUser
}) {
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
    { code: 'Hindi', label: 'हिन्दी' },
    { code: 'Punjabi', label: 'ਪੰਜਾਬੀ' },
    { code: 'Gujarati', label: 'ગુજરાતી' },
    { code: 'Marathi', label: 'ਮਰਾਠੀ' },
    { code: 'Telugu', label: 'తెలుగు' },
    { code: 'Tamil', label: 'தமிழ்' }
  ];

  const navItems = [
    { path: '/', label: 'Home', icon: Sprout },
    { path: '/price', label: 'Prices', icon: TrendingUp },
    { path: '/marketplace', label: 'Market', icon: Store },
    { path: '/buyer', label: 'Buyer', icon: Building2 },
    { path: '/fpo', label: 'FPO Hub', icon: Users },
    { path: '/match', label: 'Match', icon: Zap },
    { path: '/logistics', label: 'Logistics', icon: Warehouse },
    { path: '/orders', label: 'Escrow', icon: ShieldCheck },
    { path: '/grievance', label: 'Support', icon: ShieldAlert },
    ...(currentUser?.role === 'Admin' ? [{ path: '/admin', label: 'Admin', icon: Users }] : [])
  ];

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
      {/* Single Ultra-Compact Header Bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.4rem 0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.6rem'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/')}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)'
          }}>
            <Sprout size={16} color="#fff" />
          </div>

          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Krishi<span style={{ color: 'var(--primary)' }}>Link</span>
            </div>
          </div>
        </div>

        {/* Center Navigation Links (Inline Single Line) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          padding: '0.1rem 0'
        }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.45rem',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  color: isActive ? '#34d399' : 'var(--text-muted)',
                  border: isActive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <Icon size={12} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Global Selectors & Profile Button (Zero Gap Design) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
          {/* State Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.2rem 0.4rem',
            cursor: 'pointer'
          }}>
            <MapPin size={12} color="var(--primary)" style={{ flexShrink: 0 }} />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.75rem',
                outline: 'none',
                cursor: 'pointer',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                padding: 0,
                margin: 0
              }}
            >
              <option value="" style={{ background: '#0a1f16', color: '#fff' }}>State</option>
              {indianStates.map(state => (
                <option key={state} value={state} style={{ background: '#0a1f16', color: '#fff' }}>{state}</option>
              ))}
            </select>
            <ChevronDown size={11} color="var(--text-muted)" style={{ flexShrink: 0, pointerEvents: 'none' }} />
          </div>

          {/* Language Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.2rem 0.4rem',
            cursor: 'pointer'
          }}>
            <Globe size={12} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.75rem',
                outline: 'none',
                cursor: 'pointer',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                padding: 0,
                margin: 0
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} style={{ background: '#0a1f16', color: '#fff' }}>{lang.label}</option>
              ))}
            </select>
            <ChevronDown size={11} color="var(--text-muted)" style={{ flexShrink: 0, pointerEvents: 'none' }} />
          </div>

          {/* User Profile Button */}
          <button
            onClick={onOpenAuth}
            className="btn btn-outline"
            style={{
              borderRadius: '10px',
              padding: '0.2rem 0.5rem',
              fontSize: '0.75rem',
              borderColor: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <UserCheck size={12} color="var(--primary)" />
            <span>{currentUser?.name ? currentUser.name.split(' ')[0] : 'Login'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
