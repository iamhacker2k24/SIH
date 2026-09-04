import React from 'react';
import { ShieldCheck, Activity, Users, Settings, Bell, Sliders, Database, AlertCircle } from 'lucide-react';

export default function AdminPanel({ currentUser }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Dedicated Admin Portal Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #170c24 0%, #0c121e 100%)',
        border: '1px solid var(--accent-pink)',
        padding: '1.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-red" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', borderColor: '#ec4899' }}>
                🛡️ APMC Central Regulatory Authority
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck color="#ec4899" size={30} /> APMC Mandi Admin Command Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px' }}>
              Dedicated APMC Regulatory & Staff Control Portal. Ready for customized admin modules, license approvals, price compliance monitoring, and staff management.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-blue" style={{ padding: '0.5rem 0.85rem' }}>
              Logged as: {currentUser?.name || 'APMC Admin'}
            </span>
          </div>
        </div>
      </div>

      {/* Placeholder Workspace Container Ready For Custom Admin Modules */}
      <div className="glass-card" style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        border: '2px dashed rgba(236, 72, 153, 0.3)',
        background: 'rgba(236, 72, 153, 0.03)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <Sliders size={48} color="#ec4899" style={{ margin: '0 auto 1.25rem auto' }} />
        <h2 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
          Admin Dashboard Shell Ready
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          This dedicated Admin page (`/admin`) is initialized. Please specify the exact admin features, staff management tables, verification workflows, or regulatory controls you want built here!
        </p>

        <div style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="badge badge-green" style={{ padding: '0.5rem 0.85rem' }}>✓ Farmer UI Intact</span>
          <span className="badge badge-gold" style={{ padding: '0.5rem 0.85rem' }}>✓ Separate Admin Context</span>
          <span className="badge badge-blue" style={{ padding: '0.5rem 0.85rem' }}>✓ Route: /admin</span>
        </div>
      </div>
    </div>
  );
}
