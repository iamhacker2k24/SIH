import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, CheckCircle2, ArrowRight, Building2, UserCheck, Scale, Award } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function SmartMatch({ currentUser }) {
  const { t } = useLanguage();
  const [matches, setMatches] = useState([]);
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, [currentUser]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await api.getSmartMatches(currentUser.role);
      if (res.success) {
        setMatches(res.data);
        setDemands(res.buyerDemands || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #102d20 0%, #0c1a13 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Zap color="var(--accent-gold)" size={24} />
          <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>{t('smart_match_title', 'Smart Matchmaker: FPO & Institutional Buyer Engine')}</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {t('smart_match_sub', 'AI-assisted direct linkage pairing Farmer/FPO produce lots with verified institutional buyer procurement tenders to cut out intermediaries.')}
        </p>
      </div>

      {/* Verified Buyer Tenders Bar */}
      <div>
        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={18} color="var(--primary)" /> Active Verified Buyer Demand Tenders
        </h3>

        <div className="grid-3">
          {demands.map(demand => (
            <div key={demand.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{demand.buyerCompany}</div>
                <div className="badge badge-green">
                  <ShieldCheck size={12} /> {demand.verificationScore}% Trust Score
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Requirement: {demand.commodity} ({demand.requiredGrade})
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <div>Target Volume: <strong style={{ color: '#fff' }}>{demand.targetVolumeQuintals} Qtl</strong></div>
                <div>Max Budget: <strong style={{ color: 'var(--accent-gold)' }}>₹{demand.maxPricePerQuintal}/Qtl</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Match Results */}
      <div>
        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserCheck size={18} color="var(--accent-gold)" /> Match Recommendations for {currentUser.name} ({currentUser.role})
        </h3>

        {loading ? (
          <div className="glass-card" style={{ color: 'var(--text-muted)' }}>Calculating matches...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {matches.map(match => (
              <div key={match.matchId} className="glass-card match-item-card">
                {/* Farmer / FPO Produce Side */}
                <div>
                  <div className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>Produce Seller Lot</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{match.produceLot.sellerName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {match.produceLot.commodity} | {match.produceLot.quantityQuintals} Quintals @ ₹{match.produceLot.askingPricePerQuintal}/Qtl
                  </div>
                </div>

                {/* Match Icon */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--primary-light)',
                    border: '1px solid var(--primary)',
                    borderRadius: '50%',
                    width: '54px',
                    height: '54px',
                    color: 'var(--primary)',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    {match.matchScorePercent}%
                    <span style={{ fontSize: '0.65rem' }}>Match</span>
                  </div>
                </div>

                {/* Buyer Demand Side */}
                <div>
                  <div className="badge badge-blue" style={{ marginBottom: '0.35rem' }}>Verified Buyer Requirement</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{match.buyerDemand.buyerCompany}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Target Max: ₹{match.buyerDemand.maxPricePerQuintal}/Qtl | {match.buyerDemand.targetState}
                  </div>
                </div>

                {/* Action & Profit Delta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                    {match.recommendation}
                  </div>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: '100%' }}>
                    Initiate Direct Linkage Deal <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
