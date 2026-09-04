import React, { useState, useEffect } from 'react';
import { ShieldAlert, Plus, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import { api } from '../services/api';

export default function GrievanceDesk({ currentUser }) {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    category: 'Quality Mismatch',
    orderId: 'ord-8001',
    subject: '',
    description: ''
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const res = await api.getGrievances();
      if (res.success) {
        setGrievances(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createGrievance(formData, currentUser);
      if (res.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsSubmitOpen(false);
          setSubmitSuccess(false);
          fetchGrievances();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveTicket = async (id) => {
    try {
      const res = await api.updateGrievanceStatus(id, 'RESOLVED', 'Resolved by Mandi Regulatory Officer. Refund/Adjustment sanctioned.');
      if (res.success) {
        fetchGrievances();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'RESOLVED') return <span className="badge badge-green"><CheckCircle2 size={12} /> Resolved</span>;
    if (status === 'UNDER_REVIEW') return <span className="badge badge-gold"><Clock size={12} /> Under Review</span>;
    return <span className="badge badge-red"><AlertTriangle size={12} /> Open Ticket</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card responsive-header-banner" style={{
        background: 'linear-gradient(135deg, #2b1111 0%, #170a0a 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <ShieldAlert color="var(--accent-red)" size={24} />
            <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>Dispute & Grievance Redressal Desk</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Transparent ticket resolution for quality disputes, weight discrepancies, and payment delays monitored by Mandi Regulatory Inspectors.
          </p>
        </div>

        <button className="btn btn-outline" style={{ borderColor: 'var(--accent-red)', color: '#f87171' }} onClick={() => setIsSubmitOpen(true)}>
          <Plus size={16} /> File New Grievance Ticket
        </button>
      </div>

      {/* Tickets List */}
      <div>
        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>Submitted Disputes & Grievances</h3>

        {loading ? (
          <div className="glass-card" style={{ color: 'var(--text-muted)' }}>Loading grievance tickets...</div>
        ) : (
          <div className="grid-2">
            {grievances.map(ticket => (
              <div key={ticket.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Ticket {ticket.ticketId}</span>
                    {getStatusBadge(ticket.status)}
                  </div>

                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.35rem' }}>{ticket.subject}</h4>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Category: <strong>{ticket.category}</strong> | Filed by: <strong>{ticket.raisedByName} ({ticket.raisedByRole})</strong>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '0.85rem' }}>
                    "{ticket.description}"
                  </div>

                  {ticket.resolutionNotes && (
                    <div style={{ fontSize: '0.8rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.85rem' }}>
                      <strong>Officer Note:</strong> {ticket.resolutionNotes}
                    </div>
                  )}
                </div>

                {currentUser.role === 'Admin' && ticket.status !== 'RESOLVED' && (
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleResolveTicket(ticket.id)}>
                    Mark Ticket as Resolved & Sanction Settlement
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Grievance Modal */}
      {isSubmitOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>File Grievance Ticket</h3>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={48} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ color: '#fff' }}>Grievance Ticket Submitted!</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Dispute Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Quality Mismatch">Quality Grade Mismatch</option>
                    <option value="Weight Discrepancy">Weighbridge Reading Discrepancy</option>
                    <option value="Payment Delay">Payment Release Delay</option>
                    <option value="Logistics Delay">Logistics Pickup Delay</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Dispute Subject</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Brief summary of the issue"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Detailed Description & Evidence Notes</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="Provide exact details of the incident..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setIsSubmitOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold">Submit Ticket</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
