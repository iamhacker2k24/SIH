import React from 'react';
import { UserCheck, Tractor, Users, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function RoleBanner({ currentUser, setCurrentUser }) {
  const roles = [
    { id: 'Farmer', label: 'Farmer (Smallholder)', name: 'Ramesh Patel', icon: Tractor, badge: 'Malwa, Punjab' },
    { id: 'FPO', label: 'Farmer Producer Org (FPO)', name: 'Gurpreet Singh (FPO Pres.)', icon: Users, badge: '500+ Members' },
    { id: 'Buyer', label: 'Institutional Buyer', name: 'ITC Procurement Division', icon: ShoppingBag, badge: 'Verified Buyer' },
    { id: 'Admin', label: 'Mandi Admin / Inspector', name: 'APMC Regulatory Cell', icon: ShieldCheck, badge: 'Inspector' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(90deg, #091a13 0%, #102d20 50%, #091a13 100%)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.65rem 1.5rem',
      fontSize: '0.825rem'
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <UserCheck size={16} color="var(--primary)" />
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>SIH Live Persona Switcher:</span>
          <span>(Click a role to test specific user workflows)</span>
        </div>

        <div className="horizontal-scroll-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: '100%' }}>
          {roles.map(r => {
            const Icon = r.icon;
            const isSelected = currentUser.role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentUser({ id: `u-${r.id.toLowerCase()}`, name: r.name, role: r.id })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--primary-light)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#34d399' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <Icon size={14} color={isSelected ? '#34d399' : 'var(--text-muted)'} />
                {r.id}: {r.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
