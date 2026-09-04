import React, { useState } from 'react';
import { CreditCard, ArrowLeft, CheckCircle2, ShieldCheck, Zap, Calculator, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AgriLoans({ currentUser }) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(150000);
  const [tenure, setTenure] = useState(12);
  const [purpose, setPurpose] = useState('Seeds & Crop Input Purchase');
  const [submitted, setSubmitted] = useState(false);

  // Instant pre-approved credit calculation
  const interestRate = 4.0; // 4% after 3% prompt repayment subsidy
  const monthlyInterest = (amount * (interestRate / 100)) / 12;
  const totalRepayment = amount + (monthlyInterest * tenure);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #2b0b1c 0%, #541738 100%)',
        border: '1px solid #ec489940'
      }}>
        <button className="btn btn-outline" style={{ width: 'fit-content', marginBottom: '0.75rem' }} onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Farmer Hub
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-gold">💳 Kisan Credit Card (KCC) Portal</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard color="#ec4899" size={26} /> Instant Low-Interest Agri Loan & Credit Line
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px' }}>
          Apply for instant pre-approved Kisan Credit Card funds at 4% effective interest rate with government prompt repayment subvention.
        </p>
      </div>

      {submitted ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', border: '1px solid var(--primary)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <CheckCircle2 color="var(--primary)" size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Agri Loan Application Submitted!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
            Your KCC Loan Request of <strong>₹{amount.toLocaleString('en-IN')}</strong> for <em>{purpose}</em> has been sent to the Lead Bank Officer. Disbursement within 24 hours directly to your Aadhaar-linked bank account.
          </p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
            Apply for Another Facility
          </button>
        </div>
      ) : (
        <div className="grid-2">
          {/* Loan Calculator Form */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator color="var(--primary)" size={20} /> KCC Loan Calculator & Application
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Select Loan Purpose:</label>
                <select className="form-select" value={purpose} onChange={e => setPurpose(e.target.value)}>
                  <option>Seeds & Crop Input Purchase</option>
                  <option>Tractor & Farm Machinery Rental/Purchase</option>
                  <option>Post-Harvest Warehouse & Freight Storage</option>
                  <option>Solar Irrigation Pump Installation</option>
                </select>
              </div>

              <div>
                <label className="form-label">Required Loan Amount: ₹{amount.toLocaleString('en-IN')}</label>
                <input
                  type="range"
                  min="20000"
                  max="300000"
                  step="10000"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#ec4899', height: '6px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  <span>₹20,000</span>
                  <span>Max ₹3,00,000</span>
                </div>
              </div>

              <div>
                <label className="form-label">Repayment Tenure: {tenure} Months</label>
                <select className="form-select" value={tenure} onChange={e => setTenure(Number(e.target.value))}>
                  <option value={6}>6 Months (Short Harvest Crop Cycle)</option>
                  <option value={12}>12 Months (1 Year Standard KCC)</option>
                  <option value={24}>24 Months (2 Year Equipment Line)</option>
                </select>
              </div>

              <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid #ec489940', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Effective Interest Rate:</span>
                  <strong style={{ color: '#f472b6' }}>4.0% p.a. (Subsidized)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Repayment Amount:</span>
                  <strong style={{ color: '#fff' }}>₹{Math.round(totalRepayment).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <button className="btn btn-primary" type="submit" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', marginTop: '0.5rem' }}>
                Submit Direct Loan Request
              </button>
            </form>
          </div>

          {/* Benefits Info Card */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255, 255, 255, 0.02)' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>
              🌾 Why Choose KrishiLink Kisan Credit Line?
            </h3>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Zap color="var(--accent-gold)" size={20} style={{ shrink: 0 }} />
              <div>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Zero Collateral Up to ₹1.6 Lakhs</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No mortgage or land hypothecation needed for small-holder farmers.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldCheck color="var(--primary)" size={20} style={{ shrink: 0 }} />
              <div>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Government Interest Subvention</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Original 7% interest rate reduced to 4% upon prompt crop harvest repayment.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Landmark color="#3b82f6" size={20} style={{ shrink: 0 }} />
              <div>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Direct Bank Transfer (DBT)</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Funds disbursed directly into your PM-KISAN verified bank account.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
