import React, { useState } from 'react';
import {
  Building2, Store, DollarSign, ShieldCheck, Truck, TrendingUp, Plus, FileText, Download,
  Search, Filter, CheckCircle2, AlertCircle, Clock, MapPin, ExternalLink, X, ChevronRight, Award, Lock, Zap,
  Flag, Headphones, MessageSquare, ShieldAlert, Phone, Mail, HelpCircle, Send
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BuyerPanel({ currentUser }) {
  const [activeTab, setActiveTab] = useState('tenders');
  const [searchTerm, setSearchTerm] = useState('');
  const [commodityFilter, setCommodityFilter] = useState('');

  // Modals state
  const [isPostTenderModalOpen, setIsPostTenderModalOpen] = useState(false);
  const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const [selectedLotForBid, setSelectedLotForBid] = useState(null);
  const [selectedItemForReport, setSelectedItemForReport] = useState(null);

  // Form State for Posting New Buyer Tender
  const [tenderCommodity, setTenderCommodity] = useState('Basmati Paddy (1121)');
  const [tenderQuantity, setTenderQuantity] = useState('500');
  const [tenderMaxPrice, setTenderMaxPrice] = useState('4600');
  const [tenderQuality, setTenderQuality] = useState('Export Grade A (Max 11% Moisture)');
  const [tenderLocation, setTenderLocation] = useState('Azadpur APMC Depot, Delhi');
  const [tenderDeadline, setTenderDeadline] = useState('2026-09-15');

  // Form State for Bidding on Farmer Lot
  const [bidPrice, setBidPrice] = useState('');
  const [bidQuantity, setBidQuantity] = useState('');
  const [deliveryWarehouse, setDeliveryWarehouse] = useState('Karnal Processing Mill');

  // Form State for Reporting Issue / Scam
  const [reportCategory, setReportCategory] = useState('Quality Mismatch / Moisture Failure');
  const [reportComments, setReportComments] = useState('');

  // Form State for Priority Support Ticket
  const [supportSubject, setSupportSubject] = useState('Escrow Hold Verification');
  const [supportMessage, setSupportMessage] = useState('');

  // Support Tickets List
  const [supportTickets, setSupportTickets] = useState([
    {
      id: 'TKT-881',
      subject: 'AGMARK Grade Certificate Delay - Lot #881',
      category: 'Quality Certification',
      status: 'UNDER_INVESTIGATION',
      date: '2026-09-03',
      priority: 'HIGH'
    },
    {
      id: 'TKT-882',
      subject: 'Transport GPS Tracking Calibration',
      category: 'Logistics',
      status: 'RESOLVED',
      date: '2026-08-28',
      priority: 'NORMAL'
    }
  ]);

  // 1. My Buyer Tenders Dataset
  const [buyerTenders, setBuyerTenders] = useState([
    {
      id: 'tnd-901',
      buyerCompany: currentUser?.name || 'ITC Agri Business Division',
      commodity: 'Basmati Paddy (1121)',
      targetQuantity: 1000,
      fulfilledQuantity: 450,
      maxPriceQuintal: 4600,
      qualityGrade: 'Export Grade A (Moisture < 11%)',
      deliveryLocation: 'Karnal Processing Hub, Haryana',
      deadline: '2026-09-15',
      status: 'OPEN_PROCUREMENT',
      escrowBudget: 4600000
    },
    {
      id: 'tnd-902',
      buyerCompany: currentUser?.name || 'ITC Agri Business Division',
      commodity: 'Wheat (Sharbati)',
      targetQuantity: 1500,
      fulfilledQuantity: 800,
      maxPriceQuintal: 2500,
      qualityGrade: 'AGMARK Grade I (Protein > 12%)',
      deliveryLocation: 'Ludhiana Central Grain Depot',
      deadline: '2026-09-20',
      status: 'OPEN_PROCUREMENT',
      escrowBudget: 3750000
    },
    {
      id: 'tnd-903',
      buyerCompany: currentUser?.name || 'ITC Agri Business Division',
      commodity: 'Medium Staple Cotton',
      targetQuantity: 600,
      fulfilledQuantity: 600,
      maxPriceQuintal: 7400,
      qualityGrade: 'Superfine Long Fiber',
      deliveryLocation: 'Rajkot Textile Mill Yard',
      deadline: '2026-09-05',
      status: 'FULFILLED',
      escrowBudget: 4440000
    }
  ]);

  // 2. Active Farmer Crop Lots Available for Bidding
  const [availableFarmerLots, setAvailableFarmerLots] = useState([
    {
      id: 'lot-881',
      sellerName: 'Gurpreet Singh',
      sellerGroup: 'Malwa Farmers Producer Org',
      commodity: 'Basmati Paddy (1121)',
      quantityQuintals: 450,
      askingPrice: 4550,
      apmcModalPrice: 4520,
      location: 'Ludhiana, Punjab',
      qualityGrade: 'AGMARK Grade A Certified',
      harvestDate: '2026-09-01',
      status: 'OPEN_FOR_BIDS'
    },
    {
      id: 'lot-882',
      sellerName: 'Ramesh Patel',
      sellerGroup: 'Individual Farmer',
      commodity: 'Cotton (Medium Staple)',
      quantityQuintals: 120,
      askingPrice: 7300,
      apmcModalPrice: 7200,
      location: 'Rajkot, Gujarat',
      qualityGrade: 'Clean Fiber Grade I',
      harvestDate: '2026-09-02',
      status: 'OPEN_FOR_BIDS'
    },
    {
      id: 'lot-883',
      sellerName: 'Kishan Kumar',
      sellerGroup: 'Karnal Agri Produce Group',
      commodity: 'Wheat (Sharbati)',
      quantityQuintals: 800,
      askingPrice: 2480,
      apmcModalPrice: 2450,
      location: 'Karnal, Haryana',
      qualityGrade: 'High Gluten Grade A',
      harvestDate: '2026-09-03',
      status: 'OPEN_FOR_BIDS'
    },
    {
      id: 'lot-884',
      sellerName: 'Sukhwinder Kaur',
      sellerGroup: 'Doaba Organic Collective',
      commodity: 'Red Onion (Nashik Quality)',
      quantityQuintals: 480,
      askingPrice: 2550,
      apmcModalPrice: 2500,
      location: 'Nashik, Maharashtra',
      qualityGrade: 'Export Grade 55mm+',
      harvestDate: '2026-09-04',
      status: 'OPEN_FOR_BIDS'
    }
  ]);

  // 3. My Procurement Contracts & Escrow Pipeline
  const [buyerContracts, setBuyerContracts] = useState([
    {
      id: 'cnt-301',
      lotId: 'lot-881',
      sellerName: 'Gurpreet Singh (Malwa FPO)',
      commodity: 'Basmati Paddy (1121)',
      quantity: 450,
      agreedPrice: 4550,
      totalValue: 2047500,
      escrowStatus: 'ESCROW_LOCKED',
      logisticsStatus: 'IN_TRANSIT',
      dispatchDate: '2026-09-03',
      expectedDelivery: '2026-09-05'
    },
    {
      id: 'cnt-302',
      lotId: 'lot-883',
      sellerName: 'Kishan Kumar (Karnal FPO)',
      commodity: 'Wheat (Sharbati)',
      quantity: 800,
      agreedPrice: 2480,
      totalValue: 1984000,
      escrowStatus: 'QUALITY_VERIFIED',
      logisticsStatus: 'ARRIVED_AT_WAREHOUSE',
      dispatchDate: '2026-09-02',
      expectedDelivery: '2026-09-04'
    }
  ]);

  // Analytics Chart Data
  const procurementSpendTrend = [
    { month: 'Apr', spendLakhs: 45, volumeQtl: 1200 },
    { month: 'May', spendLakhs: 62, volumeQtl: 1650 },
    { month: 'Jun', spendLakhs: 88, volumeQtl: 2300 },
    { month: 'Jul', spendLakhs: 75, volumeQtl: 1900 },
    { month: 'Aug', spendLakhs: 110, volumeQtl: 2800 },
    { month: 'Sep (Live)', spendLakhs: 145, volumeQtl: 3600 }
  ];

  // Calculated Metrics
  const totalBudget = 15000000;
  const lockedEscrowTotal = buyerContracts.reduce((acc, c) => acc + c.totalValue, 0);
  const remainingBudget = totalBudget - lockedEscrowTotal;

  // Submit Handler for Posting New Procurement Tender
  const handlePostTenderSubmit = (e) => {
    e.preventDefault();
    if (!tenderCommodity || !tenderQuantity) return;

    const qty = parseFloat(tenderQuantity);
    const maxP = parseFloat(tenderMaxPrice);
    const totalTenderBudget = qty * maxP;

    const newTender = {
      id: `tnd-${Math.floor(900 + Math.random() * 100)}`,
      buyerCompany: currentUser?.name || 'ITC Agri Business Division',
      commodity: tenderCommodity,
      targetQuantity: qty,
      fulfilledQuantity: 0,
      maxPriceQuintal: maxP,
      qualityGrade: tenderQuality,
      deliveryLocation: tenderLocation,
      deadline: tenderDeadline,
      status: 'OPEN_PROCUREMENT',
      escrowBudget: totalTenderBudget
    };

    setBuyerTenders(prev => [newTender, ...prev]);
    setIsPostTenderModalOpen(false);
    setTenderQuantity('');
    alert(`📢 PROCUREMENT TENDER PUBLISHED: Tender ${newTender.id} for ${newTender.targetQuantity} Quintals ${newTender.commodity} is live on Farmer Marketplace!`);
  };

  // Open Bid Modal for specific farmer lot
  const handleOpenBidModal = (lot) => {
    setSelectedLotForBid(lot);
    setBidPrice(lot.askingPrice.toString());
    setBidQuantity(lot.quantityQuintals.toString());
    setIsPlaceBidModalOpen(true);
  };

  // Submit Handler for Placing Bid & Locking Escrow
  const handlePlaceBidSubmit = (e) => {
    e.preventDefault();
    if (!selectedLotForBid) return;

    const price = parseFloat(bidPrice);
    const qty = parseFloat(bidQuantity);
    const totalVal = price * qty;

    const newContract = {
      id: `cnt-${Math.floor(300 + Math.random() * 100)}`,
      lotId: selectedLotForBid.id,
      sellerName: `${selectedLotForBid.sellerName} (${selectedLotForBid.sellerGroup})`,
      commodity: selectedLotForBid.commodity,
      quantity: qty,
      agreedPrice: price,
      totalValue: totalVal,
      escrowStatus: 'ESCROW_LOCKED',
      logisticsStatus: 'DISPATCH_SCHEDULED',
      dispatchDate: new Date().toISOString().split('T')[0],
      expectedDelivery: 'In 2 Days'
    };

    setBuyerContracts(prev => [newContract, ...prev]);
    setAvailableFarmerLots(prev => prev.map(l => l.id === selectedLotForBid.id ? { ...l, status: 'CONTRACT_LOCKED' } : l));

    setIsPlaceBidModalOpen(false);
    setSelectedLotForBid(null);
    alert(`🔒 ESCROW LOCKED: ₹${totalVal.toLocaleString('en-IN')} deposited in KrishiLink Vault for ${qty} Qtl ${newContract.commodity}! Contract ${newContract.id} created.`);
  };

  // Open Report Modal for specific lot or contract
  const handleOpenReportModal = (item) => {
    setSelectedItemForReport(item);
    setReportComments('');
    setIsReportModalOpen(true);
  };

  // Submit Report / Flag Scam Handler
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportComments) return;

    const newTicket = {
      id: `TKT-${Math.floor(885 + Math.random() * 100)}`,
      subject: `Report on ${selectedItemForReport?.id || 'Trade Transaction'}: ${reportCategory}`,
      category: reportCategory,
      status: 'UNDER_INVESTIGATION',
      date: new Date().toISOString().split('T')[0],
      priority: 'HIGH'
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    setIsReportModalOpen(false);
    setSelectedItemForReport(null);
    setReportComments('');

    alert(`🚩 DISPUTE FILED: Ticket ${newTicket.id} has been submitted to the APMC Admin Grievance Desk. Escrow payout locked pending APMC inspector audit.`);
  };

  // Submit Support Ticket Handler
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportMessage) return;

    const newTicket = {
      id: `TKT-${Math.floor(900 + Math.random() * 100)}`,
      subject: supportSubject,
      category: 'Institutional Buyer Support',
      status: 'OPEN',
      date: new Date().toISOString().split('T')[0],
      priority: 'NORMAL'
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    setIsSupportModalOpen(false);
    setSupportMessage('');
    alert(`🎧 PRIORITY SUPPORT TICKET CREATED: Ticket ${newTicket.id} assigned to APMC Helpdesk. An agent will contact your registered phone shortly.`);
  };

  // Contract Invoice PDF Exporter
  const handleExportContractPDF = (contract) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download the Purchase Contract GST Invoice.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Institutional Purchase Contract & GST Invoice - ${contract.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 25px; color: #111; line-height: 1.5; }
            h1 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; margin-bottom: 5px; }
            .company-info { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; color: #444; }
            .contract-box { background: #eff6ff; border: 1px solid #3b82f6; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            th { background-color: #1e3a8a; color: white; }
            .stamp { text-align: right; margin-top: 40px; font-weight: bold; color: #1e3a8a; }
          </style>
        </head>
        <body>
          <h1>📄 Institutional Agriculture Purchase Contract</h1>
          <div class="company-info">
            <div>
              <strong>Buyer:</strong> ${currentUser?.name || 'ITC Agri Business Division'}<br>
              <strong>GSTIN:</strong> 07AAAAA0000A1Z5<br>
              <strong>Terminal:</strong> KrishiLink Institutional B2B Network
            </div>
            <div>
              <strong>Contract ID:</strong> ${contract.id}<br>
              <strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
              <strong>Escrow Guarantee:</strong> 100% Funds Locked
            </div>
          </div>

          <div class="contract-box">
            <div>Seller: <strong>${contract.sellerName}</strong></div>
            <div>Commodity: <strong>${contract.commodity}</strong></div>
            <div>Contract Volume: <strong>${contract.quantity} Quintals</strong></div>
            <div>Agreed Unit Rate: <strong>₹${contract.agreedPrice} / Quintal</strong></div>
            <div>Total Contract Value: <strong>₹${contract.totalValue.toLocaleString('en-IN')}</strong></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Rate/Qtl</th>
                <th>Taxable Amount</th>
                <th>Escrow Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${contract.commodity} (AGMARK Certified)</td>
                <td>${contract.quantity} Qtl</td>
                <td>₹${contract.agreedPrice}</td>
                <td>₹${contract.totalValue.toLocaleString('en-IN')}</td>
                <td>${contract.escrowStatus}</td>
              </tr>
            </tbody>
          </table>

          <div class="stamp">
            Digitally Signed & Verified via KrishiLink Smart Escrow Vault
          </div>

          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const filteredLots = availableFarmerLots.filter(l =>
    (commodityFilter ? l.commodity.toLowerCase().includes(commodityFilter.toLowerCase()) : true) &&
    (l.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.sellerGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-card responsive-header-banner" style={{
        background: 'linear-gradient(135deg, #0b192e 0%, #1e3a8a 100%)',
        border: '1px solid #3b82f650'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-blue" style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa', borderColor: '#3b82f6' }}>
              🏢 Institutional B2B Bulk Procurement Hub
            </span>
            <span className="badge badge-green">
              Verified Buyer: {currentUser?.name || 'ITC Agri Business'}
            </span>
          </div>

          <h1 style={{ fontSize: '1.75rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 color="#60a5fa" size={28} /> Institutional Buyer & Bulk Procurement Portal
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '750px' }}>
            Post bulk crop tenders, bid directly on verified farmer lots, lock funds in KrishiLink Escrow Vault, report quality issues, and access 24/7 priority support.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={() => setIsPostTenderModalOpen(true)}
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff' }}
          >
            <Plus size={16} /> Post Procurement Tender
          </button>
          <button
            className="btn btn-outline"
            onClick={() => handleOpenReportModal({ id: 'General Trade Query' })}
            style={{ borderColor: '#ef4444', color: '#f87171' }}
          >
            <Flag size={16} /> Report Issue / Scam
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setIsSupportModalOpen(true)}
            style={{ borderColor: '#10b981', color: '#34d399' }}
          >
            <Headphones size={16} /> 24x7 Priority Support
          </button>
        </div>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid-4">
        <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, #091326 0%, #0d1e15 100%)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Total Allocated Budget</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60a5fa' }}>
            ₹{(totalBudget / 10000000).toFixed(2)} Cr
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Available Balance: <strong>₹{(remainingBudget / 100000).toFixed(2)} Lakhs</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Locked Escrow Payouts</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            ₹{(lockedEscrowTotal / 100000).toFixed(2)} Lakhs
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Escrow Status: <strong>100% Vault Protected</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Active Buyer Tenders</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
            {buyerTenders.filter(t => t.status === 'OPEN_PROCUREMENT').length} Tenders Live
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Target Volume: <strong>2,500 Quintals</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Support & Disputes Desk</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f87171' }}>
            {supportTickets.length} Active Tickets
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Helpdesk Helpline: <strong>1800-572-KRISHI</strong>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="glass-card" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.75rem' }}>
        <button
          className={`btn ${activeTab === 'tenders' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('tenders')}
          style={{ fontSize: '0.85rem' }}
        >
          📢 My Bulk Tenders ({buyerTenders.length})
        </button>
        <button
          className={`btn ${activeTab === 'marketplace' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('marketplace')}
          style={{ fontSize: '0.85rem' }}
        >
          🌾 Direct Farmer Lots Bidding ({availableFarmerLots.length})
        </button>
        <button
          className={`btn ${activeTab === 'contracts' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('contracts')}
          style={{ fontSize: '0.85rem' }}
        >
          📄 Purchase Contracts & Escrow ({buyerContracts.length})
        </button>
        <button
          className={`btn ${activeTab === 'support' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('support')}
          style={{ fontSize: '0.85rem' }}
        >
          🎧 Report & Priority Support ({supportTickets.length})
        </button>
        <button
          className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('analytics')}
          style={{ fontSize: '0.85rem' }}
        >
          📊 Spend Analytics
        </button>
      </div>

      {/* TAB 1: MY BULK PROCUREMENT TENDERS */}
      {activeTab === 'tenders' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Store size={20} color="#60a5fa" /> Institutional Procurement Tenders Published
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Tenders published directly to thousands of verified Farmers & FPO Coalitions across India.
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => setIsPostTenderModalOpen(true)}>
              <Plus size={16} /> Post Procurement Tender
            </button>
          </div>

          <div className="grid-3">
            {buyerTenders.map(tender => (
              <div key={tender.id} className="glass-card" style={{
                border: tender.status === 'FULFILLED' ? '1px solid #10b98150' : '1px solid #3b82f650',
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(255,255,255,0.02) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '0.85rem'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-blue">{tender.id}</span>
                    <span className={`badge ${tender.status === 'FULFILLED' ? 'badge-green' : 'badge-gold'}`}>
                      {tender.status === 'FULFILLED' ? '✓ FULFILLED' : '📢 LIVE PROCUREMENT'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {tender.commodity}
                  </h4>

                  <div style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Target: {tender.targetQuantity} Quintals @ Max ₹{tender.maxPriceQuintal}/Qtl
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div><strong>Quality Spec:</strong> {tender.qualityGrade}</div>
                    <div><strong>Delivery Depot:</strong> {tender.deliveryLocation}</div>
                    <div><strong>Fulfilled So Far:</strong> {tender.fulfilledQuantity} / {tender.targetQuantity} Qtl</div>
                    <div><strong>Deadline:</strong> {tender.deadline}</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                  <span>Escrow Allocation:</span>
                  <strong style={{ color: 'var(--primary)' }}>₹{tender.escrowBudget.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DIRECT FARMER LOTS BIDS MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} color="var(--primary)" /> Verified Farmer Produce Lots Available for Direct Bidding
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Browse AGMARK certified crop lots directly from Punjab, Haryana, Gujarat, and Maharashtra farmers.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="form-input"
                style={{ width: '180px', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                placeholder="Search farmer, FPO..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <select
                className="form-select"
                style={{ width: '150px', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                value={commodityFilter}
                onChange={e => setCommodityFilter(e.target.value)}
              >
                <option value="">All Commodities</option>
                <option value="Basmati">Basmati Paddy</option>
                <option value="Wheat">Sharbati Wheat</option>
                <option value="Cotton">Medium Cotton</option>
                <option value="Onion">Nashik Onion</option>
              </select>
            </div>
          </div>

          <div className="grid-3">
            {filteredLots.map(lot => (
              <div key={lot.id} className="glass-card" style={{
                border: lot.status === 'CONTRACT_LOCKED' ? '1px solid #ef444450' : '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.85rem'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-green">{lot.id}</span>
                    <span className="badge badge-gold">{lot.qualityGrade}</span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {lot.commodity}
                  </h4>
                  <div style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {lot.sellerName} ({lot.sellerGroup})
                  </div>

                  <div style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 800, marginBottom: '0.4rem' }}>
                    Asking Rate: ₹{lot.askingPrice} / Qtl
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div><strong>Lot Quantity:</strong> {lot.quantityQuintals} Quintals</div>
                    <div><strong>APMC Benchmark Rate:</strong> ₹{lot.apmcModalPrice}/Qtl</div>
                    <div><strong>Location:</strong> {lot.location}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {lot.status === 'CONTRACT_LOCKED' ? (
                    <button className="btn btn-outline" disabled style={{ flex: 1, opacity: 0.6 }}>
                      🔒 Contract Locked
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                      onClick={() => handleOpenBidModal(lot)}
                    >
                      🤝 Place Bid & Lock Escrow
                    </button>
                  )}

                  <button
                    className="btn btn-outline"
                    title="Report Lot / Quality Mismatch"
                    style={{ borderColor: '#ef4444', color: '#f87171', padding: '0.4rem 0.6rem' }}
                    onClick={() => handleOpenReportModal(lot)}
                  >
                    <Flag size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PURCHASE CONTRACTS & ESCROW PIPELINE */}
      {activeTab === 'contracts' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="var(--primary)" /> My Active Procurement Contracts & Escrow Vault
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Track locked escrow payments, dispatch transit status, and download GST tax invoices.
              </div>
            </div>

            <span className="badge badge-green">{buyerContracts.length} Locked Contracts</span>
          </div>

          <div className="responsive-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Contract ID</th>
                  <th style={{ padding: '0.75rem' }}>Seller FPO / Farmer</th>
                  <th style={{ padding: '0.75rem' }}>Commodity</th>
                  <th style={{ padding: '0.75rem' }}>Contract Volume</th>
                  <th style={{ padding: '0.75rem' }}>Rate / Qtl</th>
                  <th style={{ padding: '0.75rem' }}>Total Value</th>
                  <th style={{ padding: '0.75rem' }}>Escrow Status</th>
                  <th style={{ padding: '0.75rem' }}>Logistics Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions & GST Invoice</th>
                </tr>
              </thead>
              <tbody>
                {buyerContracts.map(contract => (
                  <tr key={contract.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 700 }}>{contract.id}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#fff' }}>{contract.sellerName}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--primary)' }}>{contract.commodity}</td>
                    <td style={{ padding: '0.75rem', color: '#fff' }}>{contract.quantity} Qtl</td>
                    <td style={{ padding: '0.75rem', color: '#fff' }}>₹{contract.agreedPrice}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                      ₹{contract.totalValue.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-green">
                        🔒 {contract.escrowStatus}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-blue">
                        🚚 {contract.logisticsStatus}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderColor: '#3b82f6', color: '#60a5fa' }}
                        onClick={() => handleExportContractPDF(contract)}
                      >
                        📄 Invoice
                      </button>

                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderColor: '#ef4444', color: '#f87171' }}
                        onClick={() => handleOpenReportModal(contract)}
                        title="Flag Trade Issue / Escrow Freeze"
                      >
                        🚩 Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: REPORT & PRIORITY SUPPORT DESK */}
      {activeTab === 'support' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Headphones size={20} color="#34d399" /> Buyer Priority Support & Dispute Redressal Desk
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Dedicated 24/7 B2B Institutional Support for Escrow Verification, AGMARK Quality Disputes, and Transport Delays.
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => setIsSupportModalOpen(true)}>
              <Plus size={16} /> Open Support Ticket
            </button>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Helpline Card */}
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, #091a13 0%, #1e3a8a30 100%)', border: '1px solid #10b98150' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} color="#34d399" /> 24/7 B2B Institutional Hotline
              </h4>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                1800-572-KRISHI (57474)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Priority Hotline for Bulk Buyers, APMC Inspectors, & Transport Dispatchers.
              </div>
            </div>

            {/* Email Support Card */}
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a30 100%)', border: '1px solid #3b82f650' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} color="#60a5fa" /> APMC Escrow Officer Direct Desk
              </h4>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#60a5fa', marginBottom: '0.25rem' }}>
                escrow-support@krishilink.gov.in
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Official email channel for legal trade disputes & APMC audit reports.
              </div>
            </div>
          </div>

          {/* Active Tickets Table */}
          <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            📋 My Active Support & Dispute Tickets
          </h4>

          <div className="responsive-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Ticket ID</th>
                  <th style={{ padding: '0.75rem' }}>Subject / Issue</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Date Filed</th>
                  <th style={{ padding: '0.75rem' }}>Priority</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map(tkt => (
                  <tr key={tkt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 700 }}>{tkt.id}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#fff' }}>{tkt.subject}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--primary)' }}>{tkt.category}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{tkt.date}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${tkt.priority === 'HIGH' ? 'badge-gold' : 'badge-blue'}`}>
                        {tkt.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      <span className={`badge ${tkt.status === 'RESOLVED' ? 'badge-green' : 'badge-gold'}`}>
                        {tkt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SPEND ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} color="#60a5fa" /> Procurement Budget & Monthly Spend Graph (Lakhs INR)
          </h3>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Institutional bulk purchase volume and expenditure trajectory across agricultural seasons.
          </div>

          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={procurementSpendTrend}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#091326', border: '1px solid #3b82f6', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`₹${val} Lakhs`, 'Procurement Spend']}
                />
                <Area type="monotone" dataKey="spendLakhs" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* MODAL 1: POST NEW PROCUREMENT TENDER */}
      {isPostTenderModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPostTenderModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', border: '1px solid #3b82f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={22} color="#60a5fa" /> Post Institutional Procurement Tender
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsPostTenderModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handlePostTenderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Commodity Name:</label>
                <input
                  type="text"
                  className="form-input"
                  value={tenderCommodity}
                  onChange={e => setTenderCommodity(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Required Bulk Quantity (Qtl):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={tenderQuantity}
                    onChange={e => setTenderQuantity(e.target.value)}
                    required
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Max Target Price (₹/Qtl):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={tenderMaxPrice}
                    onChange={e => setTenderMaxPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Quality Grade Specification:</label>
                <input
                  type="text"
                  className="form-input"
                  value={tenderQuality}
                  onChange={e => setTenderQuality(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Delivery Warehouse / Depot:</label>
                  <input
                    type="text"
                    className="form-input"
                    value={tenderLocation}
                    onChange={e => setTenderLocation(e.target.value)}
                    required
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Tender Deadline:</label>
                  <input
                    type="date"
                    className="form-input"
                    value={tenderDeadline}
                    onChange={e => setTenderDeadline(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff' }}>
                  📢 Publish Procurement Tender
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsPostTenderModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PLACE BID & LOCK ESCROW ON FARMER LOT */}
      {isPlaceBidModalOpen && selectedLotForBid && (
        <div className="modal-overlay" onClick={() => setIsPlaceBidModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', border: '1px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={22} color="var(--primary)" /> Lock Escrow Funds & Place Bid
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsPlaceBidModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem', color: '#fff' }}>
              <div>Seller: <strong>{selectedLotForBid.sellerName} ({selectedLotForBid.sellerGroup})</strong></div>
              <div>Commodity: <strong>{selectedLotForBid.commodity}</strong></div>
              <div>Asking Rate: <strong style={{ color: 'var(--accent-gold)' }}>₹{selectedLotForBid.askingPrice}/Qtl</strong></div>
            </div>

            <form onSubmit={handlePlaceBidSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Your Bid Rate (₹/Qtl):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={bidPrice}
                    onChange={e => setBidPrice(e.target.value)}
                    required
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Quantity to Purchase (Qtl):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={bidQuantity}
                    onChange={e => setBidQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Destination Mill / Delivery Yard:</label>
                <input
                  type="text"
                  className="form-input"
                  value={deliveryWarehouse}
                  onChange={e => setDeliveryWarehouse(e.target.value)}
                  required
                />
              </div>

              {bidPrice && bidQuantity && (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: '#34d399', fontSize: '0.9rem', textAlign: 'center', fontWeight: 700 }}>
                  Escrow Deposit Required: ₹{(parseFloat(bidPrice) * parseFloat(bidQuantity)).toLocaleString('en-IN')}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}>
                  🔒 Lock Escrow & Create Contract
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsPlaceBidModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: REPORT ISSUE / FLAG SCAM */}
      {isReportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsReportModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', border: '1px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Flag size={22} color="#f87171" /> Report Trade Issue / Flag Fraud
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsReportModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef444450', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem', color: '#fca5a5' }}>
              Reporting Target: <strong>{selectedItemForReport?.id || 'Trade Transaction'}</strong>
              <div>Filing a report will immediately flag the transaction for APMC Inspector Review and hold escrow funds.</div>
            </div>

            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Dispute Category:</label>
                <select
                  className="form-select"
                  value={reportCategory}
                  onChange={e => setReportCategory(e.target.value)}
                >
                  <option value="Quality Mismatch / Moisture Failure">Quality Mismatch / Moisture Failure</option>
                  <option value="Delayed Dispatch / Transport Default">Delayed Dispatch / Transport Default</option>
                  <option value="Weighbridge Weight Variance">Weighbridge Weight Variance</option>
                  <option value="Suspicious Seller Account / Fraud Flag">Suspicious Seller Account / Fraud Flag</option>
                  <option value="Other Trade Grievance">Other Trade Grievance</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Issue Explanation & Evidence Details:</label>
                <textarea
                  className="form-input"
                  style={{ height: '90px', resize: 'vertical' }}
                  placeholder="Describe the discrepancy, AGMARK test results, or delivery status..."
                  value={reportComments}
                  onChange={e => setReportComments(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#fff' }}>
                  🚩 Submit Report & Freeze Escrow
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsReportModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: 24X7 PRIORITY SUPPORT TICKET */}
      {isSupportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSupportModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', border: '1px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Headphones size={22} color="#34d399" /> Contact B2B Priority Support Desk
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsSupportModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Support Topic:</label>
                <input
                  type="text"
                  className="form-input"
                  value={supportSubject}
                  onChange={e => setSupportSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Describe Your Query:</label>
                <textarea
                  className="form-input"
                  style={{ height: '90px', resize: 'vertical' }}
                  placeholder="Tell us what you need assistance with (GST Invoice, Mandi Pass, Logistics)..."
                  value={supportMessage}
                  onChange={e => setSupportMessage(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}>
                  <Send size={16} /> Submit Ticket
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsSupportModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
