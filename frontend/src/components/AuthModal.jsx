import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, ShieldCheck, Zap, Sparkles, Building, Tractor } from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, setCurrentUser }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('Farmer');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('Farmer');
  const [regOrg, setRegOrg] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const quickDemoAccounts = [
    { id: 'u-farmer', name: 'Ramesh Patel', email: 'ramesh@agrilink.in', role: 'Farmer', badge: 'Smallholder Farmer', icon: Tractor },
    { id: 'u-fpo', name: 'Gurpreet Singh', email: 'gurpreet@agrilink.in', role: 'FPO', badge: 'Malwa FPO Leader', icon: User },
    { id: 'u-buyer', name: 'ITC Procurement', email: 'buyer@itc.com', role: 'Buyer', badge: 'Verified Buyer', icon: Building },
    { id: 'u-admin', name: 'APMC Inspector', email: 'admin@mandi.gov.in', role: 'Admin', badge: 'Mandi Admin', icon: ShieldCheck }
  ];

  const handleQuickDemoSelect = (acc) => {
    setCurrentUser({
      id: acc.id,
      name: acc.name,
      email: acc.email,
      role: acc.role
    });
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.login({ email: loginEmail, role: loginRole });
      if (res.success) {
        setCurrentUser(res.user);
        onClose();
      } else {
        setErrorMsg(res.message || 'Login failed');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to authentication backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        role: regRole,
        organization: regOrg
      });
      if (res.success) {
        setCurrentUser(res.user);
        onClose();
      } else {
        setErrorMsg(res.message || 'Registration failed');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to authentication backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '540px', padding: '1.75rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles color="var(--primary)" size={22} />
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>KrishiLink Account Portal</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 1-Click Prototype Demo Accounts */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(245, 158, 11, 0.25) 100%)',
          border: '2px solid var(--primary)',
          padding: '1.15rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Zap size={16} /> QUICK DEMO PROTOTYPE ACCESS (FOR PRESENTATION & SPEECH)
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Select a live persona to immediately enter and demonstrate the KrishiLink ecosystem:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))', gap: '0.5rem' }}>
            {quickDemoAccounts.map(acc => (
              <button
                key={acc.id}
                type="button"
                onClick={() => handleQuickDemoSelect(acc)}
                style={{
                  background: 'rgba(9, 20, 14, 0.85)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.55rem 0.4rem',
                  color: '#fff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ color: 'var(--primary)', fontSize: '0.75rem', marginBottom: '2px' }}>{acc.role}</div>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.name.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Login / Register */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
          <button
            style={{
              flex: 1,
              padding: '0.65rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'login' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === 'login' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('login')}
          >
            Account Login
          </button>
          <button
            style={{
              flex: 1,
              padding: '0.65rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'register' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === 'register' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('register')}
          >
            Register New User
          </button>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--accent-red)', color: '#f87171', padding: '0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Select User Role</label>
              <select className="form-select" value={loginRole} onChange={e => setLoginRole(e.target.value)}>
                <option value="Farmer">Farmer (Smallholder)</option>
                <option value="FPO">Farmer Producer Organization (FPO)</option>
                <option value="Buyer">Institutional Buyer</option>
                <option value="Admin">Mandi Regulatory Inspector</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email / Username</label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g. farmer@agrilink.in"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In to KrishiLink'}
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name / Contact Person</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Balwinder Singh"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>User Role Category</label>
              <select className="form-select" value={regRole} onChange={e => setRegRole(e.target.value)}>
                <option value="Farmer">Farmer (Individual / Smallholder)</option>
                <option value="FPO">Farmer Producer Organization (FPO)</option>
                <option value="Buyer">Institutional / Corporate Buyer</option>
                <option value="Admin">APMC Mandi Officer</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number (for SMS & Payments)</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@domain.com"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '0.75rem' }} disabled={loading}>
              {loading ? 'Registering...' : 'Create Account & Access Platform'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
