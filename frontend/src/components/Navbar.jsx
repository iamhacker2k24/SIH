import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sprout, TrendingUp, Store, Zap, Warehouse, ShieldAlert, ShieldCheck,
  Globe, MapPin, UserCheck, Users, Building2, ChevronDown, Menu, X, Sun, Moon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language: ctxLang, setLanguage: ctxSetLang, t, languages } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

  const currentLanguage = selectedLanguage || ctxLang;
  const handleLanguageChange = (code) => {
    if (setSelectedLanguage) setSelectedLanguage(code);
    ctxSetLang(code);
  };

  const indianStates = [
    'All India', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh',
    'Gujarat', 'Maharashtra', 'Rajasthan', 'Bihar', 'West Bengal',
    'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala',
    'Odisha', 'Assam', 'Chhattisgarh', 'Jharkhand', 'Uttarakhand',
    'Himachal Pradesh', 'Jammu & Kashmir'
  ];

  const navItems = [
    { path: '/', label: t('nav_home', 'Home'), icon: Sprout },
    { path: '/price', label: t('nav_prices', 'Prices'), icon: TrendingUp },
    { path: '/marketplace', label: t('nav_market', 'Market'), icon: Store },
    { path: '/buyer', label: t('nav_buyer', 'Buyer'), icon: Building2 },
    { path: '/fpo', label: t('nav_fpo', 'FPO Hub'), icon: Users },
    { path: '/match', label: t('nav_match', 'Match'), icon: Zap },
    { path: '/logistics', label: t('nav_logistics', 'Logistics'), icon: Warehouse },
    { path: '/orders', label: t('nav_orders', 'Escrow'), icon: ShieldCheck },
    { path: '/grievance', label: t('nav_support', 'Support'), icon: ShieldAlert },
    ...(currentUser?.role === 'Admin' ? [{ path: '/admin', label: t('nav_admin', 'Admin'), icon: Users }] : [])
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
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
      {/* Top Header Container */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.4rem 0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', flexShrink: 0 }} onClick={() => handleNavClick('/')}>
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

        {/* Desktop Navigation Links */}
        <div className="nav-desktop">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
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

        {/* Global Selectors & Profile Button (Desktop) */}
        <div className="nav-desktop-controls">
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
              <option value="" style={{ background: '#0a1f16', color: '#fff' }}>{t('nav_state', 'State')}</option>
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
            gap: '0.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.25rem 0.5rem',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <Globe size={13} color="var(--accent-gold)" style={{ flexShrink: 0, pointerEvents: 'none' }} />
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              aria-label="Select Language"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                paddingRight: '0.9rem',
                margin: 0
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} style={{ background: '#0a1f16', color: '#fff' }}>{lang.label}</option>
              ))}
            </select>
            <ChevronDown size={11} color="var(--text-muted)" style={{ position: 'absolute', right: '0.35rem', pointerEvents: 'none' }} />
          </div>

          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={isDark ? t('theme_light', 'Switch to Light Mode') : t('theme_dark', 'Switch to Dark Mode')}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#3b82f6" />}
          </button>

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
            <span>{currentUser?.name ? currentUser.name.split(' ')[0] : t('nav_login', 'Login')}</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr auto', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
            {/* Mobile State Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.4rem 0.6rem'
            }}>
              <MapPin size={14} color="var(--primary)" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none',
                  width: '100%'
                }}
              >
                <option value="" style={{ background: '#0a1f16', color: '#fff' }}>{t('nav_state', 'Select State')}</option>
                {indianStates.map(state => (
                  <option key={state} value={state} style={{ background: '#0a1f16', color: '#fff' }}>{state}</option>
                ))}
              </select>
            </div>

            {/* Mobile Language Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.4rem 0.6rem',
              position: 'relative'
            }}>
              <Globe size={14} color="var(--accent-gold)" style={{ flexShrink: 0, pointerEvents: 'none' }} />
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                aria-label="Mobile Select Language"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  outline: 'none',
                  width: '100%',
                  cursor: 'pointer'
                }}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} style={{ background: '#0a1f16', color: '#fff' }}>{lang.label}</option>
                ))}
              </select>
            </div>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              style={{ width: '38px', height: '38px' }}
              title={isDark ? t('theme_light', 'Switch to Light Mode') : t('theme_dark', 'Switch to Dark Mode')}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#3b82f6" />}
            </button>
          </div>

          {/* Mobile Navigation Links Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`mobile-nav-item ${isActive ? 'mobile-nav-item-active' : 'mobile-nav-item-inactive'}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Profile Button */}
          <button
            onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            <UserCheck size={16} />
            <span>{currentUser?.name ? `Account (${currentUser.name})` : 'Login / Register'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
