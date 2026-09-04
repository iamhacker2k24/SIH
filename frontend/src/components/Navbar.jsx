import React, { useState } from 'react';
import { Sprout, TrendingUp, Store, Zap, Warehouse, ShieldAlert, ShieldCheck, Menu, X, Sparkles, UserCheck, LogIn } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, onOpenAuth }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'price', label: 'Price Discovery & AI', icon: TrendingUp, tag: 'Live' },
    { id: 'marketplace', label: 'Produce Market', icon: Store, tag: 'Bidding' },
    { id: 'match', label: 'Smart Match', icon: Zap, tag: 'AI' },
    { id: 'logistics', label: 'Storage & Freight', icon: Warehouse, tag: 'WDRA' },
    { id: 'orders', label: 'Escrow & Pay', icon: ShieldCheck, tag: 'Protected' },
    { id: 'grievance', label: 'Dispute Desk', icon: ShieldAlert, tag: 'Support' }
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
        gap: '1rem'
      }}>
        {/* Cute Brand Logo */}
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
            <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#f0fdf4', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Krishi<span style={{ color: 'var(--primary)' }}>Link</span>
              <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '1px 7px' }}>
                <Sparkles size={10} /> SIH 2026
              </span>
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

        {/* Prototype Demo & Auth Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onOpenAuth}
            className="btn btn-gold"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.775rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)'
            }}
          >
            <Zap size={14} /> Demo Prototype Logins
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
                <span className={`badge ${isActive ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.65rem' }}>
                  {item.tag}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => { setMobileOpen(false); onOpenAuth(); }}
            className="btn btn-gold"
            style={{ marginTop: '0.5rem', width: '100%', borderRadius: 'var(--radius-md)' }}
          >
            <Zap size={16} /> Open Prototype Quick Logins
          </button>
        </div>
      )}
    </header>
  );
}
