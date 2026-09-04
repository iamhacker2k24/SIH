import React from 'react';
import { Sprout, TrendingUp, Store, Zap, Warehouse, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, setCurrentUser }) {
  const navItems = [
    { id: 'price', label: 'Price Discovery & AI Window', icon: TrendingUp },
    { id: 'marketplace', label: 'Produce Marketplace', icon: Store },
    { id: 'match', label: 'Smart Matchmaker', icon: Zap },
    { id: 'logistics', label: 'Logistics & Storage', icon: Warehouse },
    { id: 'orders', label: 'Escrow & Contracts', icon: ShieldCheck },
    { id: 'grievance', label: 'Dispute Desk', icon: ShieldAlert }
  ];

  return (
    <header style={{
      background: 'rgba(11, 24, 18, 0.95)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)'
          }}>
            <Sprout size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#f0fdf4' }}>
              Krishi<span style={{ color: 'var(--primary)' }}>Link</span> <span style={{ fontSize: '0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--border-glow)' }}>SIH 2026</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Market Linkages & Dynamic Price Discovery Platform
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  fontWeight: '600',
                  border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
