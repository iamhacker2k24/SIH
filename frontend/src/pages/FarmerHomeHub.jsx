import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Store, MapPin, Warehouse, ShieldAlert, Landmark,
  CreditCard, Sparkles, Sprout, ChevronRight
} from 'lucide-react';
import CreateLotModal from '../components/CreateLotModal';

export default function FarmerHomeHub({ currentUser, selectedState }) {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Rectangular Action Cards Config with URL routing
  const rectCards = [
    {
      id: 'sell',
      title: 'Sell Produce',
      subtitle: 'Post harvested crop & set your desire asking price',
      icon: Store,
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
      action: () => navigate('/marketplace'),
      tag: 'Direct Buyer Sale'
    },
    {
      id: 'price',
      title: 'Check Live Price',
      subtitle: 'Real-time Mandi price discovery & AI sale forecasts',
      icon: TrendingUp,
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
      action: () => navigate('/price'),
      tag: 'Live Analytics'
    },
    {
      id: 'mandi',
      title: 'Find Nearest Mandi',
      subtitle: 'Locate local APMC grain markets & active traders',
      icon: MapPin,
      color: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(29, 78, 216, 0.05) 100%)',
      action: () => navigate('/mandis'),
      tag: 'APMC Directory'
    },
    {
      id: 'schemes',
      title: 'Government Schemes',
      subtitle: 'PM-KISAN, PMFBY crop insurance & solar pump subsidies',
      icon: Landmark,
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(109, 40, 217, 0.05) 100%)',
      action: () => navigate('/schemes'),
      tag: 'Sarkari Subsidy'
    },
    {
      id: 'loan',
      title: 'Take Agri Loan',
      subtitle: 'Low-interest 4% Kisan Credit Line & instant loan approval',
      icon: CreditCard,
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(190, 24, 93, 0.05) 100%)',
      action: () => navigate('/loans'),
      tag: '4% KCC Credit'
    },
    {
      id: 'rates',
      title: 'Live Commodity Rates',
      subtitle: 'Detailed commodity rate charts & historical 30-day trends',
      icon: Sprout,
      color: '#14b8a6',
      bgGradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(13, 148, 136, 0.05) 100%)',
      action: () => navigate('/price'),
      tag: '30-Day Trends'
    },
    {
      id: 'storage',
      title: 'Book Cold Storage',
      subtitle: 'WDRA certified warehouses & climate control chambers',
      icon: Warehouse,
      color: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 116, 144, 0.05) 100%)',
      action: () => navigate('/logistics'),
      tag: 'Storage & Freight'
    },
    {
      id: 'support',
      title: 'Support & Dispute',
      subtitle: 'APMC helpline & payment/quality dispute resolution desk',
      icon: ShieldAlert,
      color: '#ef4444',
      bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.05) 100%)',
      action: () => navigate('/grievance'),
      tag: 'Helpline Desk'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #09261a 0%, #113c29 50%, #0d1e15 100%)',
        border: '2px solid var(--primary)',
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        padding: '1.75rem'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-green">
              <Sparkles size={12} /> KrishiLink Farmer Portal
            </span>
            <span className="badge badge-gold">
              Namaste, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Kisan'} Ji!
            </span>
          </div>

          <h1 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
            Select an Option Below to Access Krishi Services
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px' }}>
            Instant direct access to produce sales, live Mandi rates, nearest APMC markets, government crop subsidies, low-interest Kisan credit loans, and cold storage booking.
          </p>
        </div>
      </div>

      {/* RECTANGULAR ACTION CARDS GRID */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>
            🌾 Krishi Services Hub
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click any card to open page</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {rectCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={card.action}
                className="glass-card"
                style={{
                  background: card.bgGradient,
                  border: `1px solid ${card.color}40`,
                  padding: '1.35rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: `0 4px 15px ${card.color}15`
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = card.color;
                  e.currentTarget.style.boxShadow = `0 8px 25px ${card.color}35`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${card.color}40`;
                  e.currentTarget.style.boxShadow = `0 4px 15px ${card.color}15`;
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: `${card.color}25`,
                      border: `1px solid ${card.color}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} color={card.color} />
                    </div>

                    <span className="badge" style={{
                      background: `${card.color}20`,
                      color: card.color,
                      border: `1px solid ${card.color}40`,
                      fontWeight: 600
                    }}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.4' }}>
                    {card.subtitle}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginTop: '1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: card.color
                }}>
                  Open Page <ChevronRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Produce Lot Creation Modal */}
      <CreateLotModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        currentUser={currentUser}
        onLotCreated={() => navigate('/marketplace')}
      />
    </div>
  );
}
