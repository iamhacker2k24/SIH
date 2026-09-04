import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Truck, FileText, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function OrdersEscrow() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders();
      if (res.success) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvanceEscrow = async (orderId, currentStatus) => {
    const statusFlow = ['OFFER_ACCEPTED', 'FUNDS_LOCKED', 'INSPECTION_PASSED', 'IN_TRANSIT', 'DELIVERED', 'PAYMENT_RELEASED'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      try {
        const res = await api.updateEscrowStatus(orderId, nextStatus);
        if (res.success) {
          fetchOrders();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getEscrowStepBadge = (status, targetStep) => {
    const steps = ['OFFER_ACCEPTED', 'FUNDS_LOCKED', 'INSPECTION_PASSED', 'IN_TRANSIT', 'DELIVERED', 'PAYMENT_RELEASED'];
    const currentIdx = steps.indexOf(status);
    const targetIdx = steps.indexOf(targetStep);

    if (currentIdx >= targetIdx) {
      return { background: 'var(--primary)', color: '#fff', border: '1px solid var(--primary)' };
    }
    return { background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #091a13 0%, #153828 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <ShieldCheck color="var(--primary)" size={24} />
          <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Digital Escrow & Payment Tracking (AgriPay)</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Zero payment risk for farmers. Funds are locked in smart escrow upon contract agreement and disbursed automatically upon digital inspection and delivery verification.
        </p>
      </div>

      {/* Orders List */}
      <div>
        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>Active Orders & Escrow Pipelines</h3>

        {loading ? (
          <div className="glass-card" style={{ color: 'var(--text-muted)' }}>Loading active contracts...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map(order => (
              <div key={order.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="responsive-header-banner" style={{ alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-gold">Order #{order.id}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.trackingCode}</span>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem' }}>
                      {order.commodity} ({order.quantityQuintals} Quintals)
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Seller: <strong>{order.sellerName}</strong> | Buyer: <strong>{order.buyerCompany} ({order.buyerName})</strong>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Contract Escrow Value</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>Rate: ₹{order.agreedPricePerQuintal}/Qtl</div>
                  </div>
                </div>

                {/* Escrow Pipeline Timeline */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Lock size={14} color="var(--primary)" /> Escrow Milestone Pipeline:
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', textAlign: 'center' }}>
                    {[
                      { step: 'OFFER_ACCEPTED', label: '1. Offer Accepted' },
                      { step: 'FUNDS_LOCKED', label: '2. Funds Locked' },
                      { step: 'INSPECTION_PASSED', label: '3. Quality Pass' },
                      { step: 'IN_TRANSIT', label: '4. In Transit' },
                      { step: 'DELIVERED', label: '5. Delivered' },
                      { step: 'PAYMENT_RELEASED', label: '6. Payment Released' }
                    ].map(s => {
                      const style = getEscrowStepBadge(order.escrowStatus, s.step);
                      return (
                        <div key={s.step} style={{ ...style, padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600 }}>
                          {s.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions & Receipt */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <FileText size={14} /> Method: {order.paymentMethod}
                  </div>

                  {order.escrowStatus !== 'PAYMENT_RELEASED' && (
                    <button className="btn btn-outline" style={{ fontSize: '0.8rem' }} onClick={() => handleAdvanceEscrow(order.id, order.escrowStatus)}>
                      Simulate Next Milestone Step <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
