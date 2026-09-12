import React, { useState } from 'react';
import { Landmark, ArrowLeft, CheckCircle2, ShieldCheck, Zap, Sparkles, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function GovernmentSchemes() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState('All');

  const schemesList = [
    {
      id: 'scheme-1',
      title: 'PM-KISAN Samman Nidhi',
      category: 'Financial Support',
      benefit: '₹6,000 / year',
      eligibility: 'Small & Marginal Farmers with land ownership records',
      desc: 'Direct cash benefit transferred into farmer bank accounts in 3 equal installments of ₹2,000 every 4 months.',
      badge: 'Active & Verified',
      color: '#10b981'
    },
    {
      id: 'scheme-2',
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Crop Insurance',
      benefit: '100% Loss Coverage',
      eligibility: 'All Farmers growing notified crops in notified areas',
      desc: 'Comprehensive crop risk cover against drought, flood, pests, and unseasonal rainfall from pre-sowing to harvest.',
      badge: 'Enrolling Now',
      color: '#3b82f6'
    },
    {
      id: 'scheme-3',
      title: 'PM-KUSUM Solar Irrigation Pump Subsidy',
      category: 'Solar Subsidy',
      benefit: '60% Capital Subsidy',
      eligibility: 'Individual Farmers, Water User Associations & FPOs',
      desc: 'Financial support to replace diesel pumps with standalone solar agriculture pumps for reliable daytime irrigation.',
      badge: '60% Subsidy',
      color: '#f59e0b'
    },
    {
      id: 'scheme-4',
      title: 'Soil Health Card Scheme',
      category: 'Soil Health',
      benefit: 'Free Soil Testing',
      eligibility: 'All Land-holding Farmers across all States',
      desc: 'Custom soil analysis report providing dosage guidance for N, P, K, micro-nutrients, and organic fertilizers.',
      badge: 'Free Testing',
      color: '#8b5cf6'
    },
    {
      id: 'scheme-5',
      title: 'Agriculture Infrastructure Fund (AIF)',
      category: 'Infrastructure',
      benefit: '3% Interest Subvention',
      eligibility: 'FPOs, Agri-Entrepreneurs, Cooperatives & Farmers',
      desc: 'Medium-long term debt financing facility for post-harvest management infrastructure and community farming assets.',
      badge: 'Low Interest',
      color: '#ec4899'
    }
  ];

  const filtered = schemesList.filter(s =>
    filterCategory === 'All' ? true : s.category === filterCategory
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #1f1035 0%, #3b1c61 100%)',
        border: '1px solid #8b5cf640'
      }}>
        <button className="btn btn-outline" style={{ width: 'fit-content', marginBottom: '0.75rem' }} onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> {t('nav_home', 'Back to Farmer Hub')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-gold">🏛️ Direct Beneficiary Transfer</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Landmark color="#8b5cf6" size={26} /> {t('schemes_title', 'Government Farmer Schemes & Subsidies')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px' }}>
          {t('schemes_sub', 'Explore central and state government agricultural schemes, DBT financial assistance, and subsidy portals.')}
        </p>
      </div>

      {/* Categories Filter Bar */}
      <div className="glass-card" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.85rem' }}>
        {['All', 'Financial Support', 'Crop Insurance', 'Solar Subsidy', 'Soil Health', 'Infrastructure'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`btn ${filterCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem', whiteSpace: 'nowrap' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Schemes Grid */}
      <div className="grid-2">
        {filtered.map(scheme => (
          <div key={scheme.id} className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: `1px solid ${scheme.color}40`,
            background: `linear-gradient(135deg, ${scheme.color}10 0%, rgba(255,255,255,0.02) 100%)`,
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge" style={{ background: `${scheme.color}25`, color: scheme.color, border: `1px solid ${scheme.color}40` }}>
                  {scheme.category}
                </span>
                <span className="badge badge-green">{scheme.badge}</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>
                {scheme.title}
              </h3>
              <div style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', fontWeight: 800, marginBottom: '0.5rem' }}>
                Benefit: {scheme.benefit}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                {scheme.desc}
              </p>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <strong>Eligibility:</strong> {scheme.eligibility}
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', background: `linear-gradient(135deg, ${scheme.color} 0%, #059669 100%)` }}
              onClick={() => alert(`Redirecting to official government portal for ${scheme.title}`)}
            >
              Apply via Direct DBT Portal <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
