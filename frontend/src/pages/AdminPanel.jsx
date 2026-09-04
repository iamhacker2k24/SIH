import React, { useState } from 'react';
import {
  ShieldCheck, Activity, Users, FileText, Download, Printer, TrendingUp,
  Store, DollarSign, CheckCircle2, AlertCircle, Building2, MapPin, Search, Filter, RefreshCw,
  Ban, ShieldAlert, UserX, AlertTriangle, Plus, X, Lock, Unlock, Bell, CloudRain, Sun, Wind,
  Thermometer, UserCheck, Send, Calendar, Clock, Megaphone, Check, Landmark, CreditCard, ExternalLink, Award
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function AdminPanel({ currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Modals state
  const [isAddScamModalOpen, setIsAddScamModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isAddSchemeModalOpen, setIsAddSchemeModalOpen] = useState(false);

  // Form State for Adding New Scam / Fraud Incident
  const [accusedName, setAccusedName] = useState('');
  const [accusedRole, setAccusedRole] = useState('Buyer');
  const [scamCategory, setScamCategory] = useState('Payment Default / Non-release');
  const [affectedLotId, setAffectedLotId] = useState('');
  const [riskSeverity, setRiskSeverity] = useState('CRITICAL');
  const [scamDescription, setScamDescription] = useState('');

  // Form State for Broadcast Alert
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('All Farmers & Buyers');
  const [broadcastLevel, setBroadcastLevel] = useState('URGENT');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Form State for New Staff Member
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Mandi Quality Inspector');
  const [newStaffYard, setNewStaffYard] = useState('Azadpur APMC Depot');
  const [newStaffShift, setNewStaffShift] = useState('Morning (06:00 - 14:00)');
  const [newStaffPhone, setNewStaffPhone] = useState('+91 98888 77766');

  // Form State for New Government Scheme
  const [schemeTitle, setSchemeTitle] = useState('');
  const [schemeCategory, setSchemeCategory] = useState('Financial Support');
  const [schemeBenefit, setSchemeBenefit] = useState('₹10,000 / Hectare Subsidy');
  const [schemeEligibility, setSchemeEligibility] = useState('Landholding Farmers with Verified Aadhaar & Patta');
  const [schemeDesc, setSchemeDesc] = useState('');
  const [schemePortalUrl, setSchemePortalUrl] = useState('https://pmkisan.gov.in');

  // 1. Registered Farmers, FPOs & Buyers Data with Aadhaar Numbers
  const [farmersAndFpos, setFarmersAndFpos] = useState([
    { id: 'usr-101', name: 'Gurpreet Singh', role: 'FPO', coalition: 'Malwa Farmers Producer Org', district: 'Ludhiana', state: 'Punjab', phone: '+91 98765 43210', aadhaarNumber: '4829-9182-1092', kycStatus: 'VERIFIED', isBanned: false, registeredDate: '2026-09-01' },
    { id: 'usr-102', name: 'Ramesh Patel', role: 'Farmer', coalition: 'Individual Farmer', district: 'Rajkot', state: 'Gujarat', phone: '+91 98123 45678', aadhaarNumber: '7829-1928-3341', kycStatus: 'VERIFIED', isBanned: false, registeredDate: '2026-09-02' },
    { id: 'usr-103', name: 'Fake Trading Corp', role: 'Buyer', coalition: 'Unverified Trader Agency', district: 'Delhi', state: 'Delhi NCR', phone: '+91 99000 00111', aadhaarNumber: '9182-3847-5512', kycStatus: 'REJECTED', isBanned: true, registeredDate: '2026-09-03' },
    { id: 'usr-104', name: 'Sukhwinder Kaur', role: 'Farmer', coalition: 'Doaba Organic Collective', district: 'Jalandhar', state: 'Punjab', phone: '+91 98555 66778', aadhaarNumber: '6712-9012-4411', kycStatus: 'PENDING_KYC', isBanned: false, registeredDate: '2026-09-04' },
    { id: 'usr-105', name: 'Venkatesh Rao', role: 'FPO', coalition: 'Deccan Spices & Cotton FPO', district: 'Warangal', state: 'Telangana', phone: '+91 97000 88990', aadhaarNumber: '3819-2019-8812', kycStatus: 'VERIFIED', isBanned: false, registeredDate: '2026-09-04' }
  ]);

  // 2. Government Schemes Management Dataset
  const [govSchemesList, setGovSchemesList] = useState([
    {
      id: 'scheme-101',
      title: 'PM-KISAN Samman Nidhi',
      category: 'Financial Support',
      benefit: '₹6,000 / Year Cash Benefit',
      eligibility: 'Small & Marginal Farmers with land patta',
      desc: 'Direct cash benefit transferred into farmer bank accounts in 3 equal installments of ₹2,000.',
      status: 'ACTIVE_GOVT',
      totalBeneficiaries: 14200
    },
    {
      id: 'scheme-102',
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Crop Insurance',
      benefit: '100% Loss Risk Coverage',
      eligibility: 'All Farmers growing notified crops',
      desc: 'Comprehensive crop insurance against drought, pest attack, and unseasonal rainfall.',
      status: 'ACTIVE_GOVT',
      totalBeneficiaries: 9800
    },
    {
      id: 'scheme-103',
      title: 'PM-KUSUM Solar Pump Subsidy',
      category: 'Solar Subsidy',
      benefit: '60% Capital Subsidy',
      eligibility: 'Farmers & Water User Associations',
      desc: 'Financial support to replace diesel pumps with standalone solar agriculture pumps.',
      status: 'ACTIVE_GOVT',
      totalBeneficiaries: 3400
    }
  ]);

  // 3. Staff & Duty Roster Data
  const [staffMembers, setStaffMembers] = useState([
    { id: 'stf-201', name: 'Inspector Satish Kumar', role: 'Mandi Quality Inspector', yard: 'Azadpur APMC Gate 4', shift: 'Morning (06:00 - 14:00)', phone: '+91 98888 77766', isOnDuty: true },
    { id: 'stf-202', name: 'Rakesh Verma', role: 'Weighbridge Supervisor', yard: 'Karnal Anaj Mandi', shift: 'Morning (06:00 - 14:00)', phone: '+91 98777 66554', isOnDuty: true },
    { id: 'stf-203', name: 'Anil Deshmukh', role: 'Dispute Resolution Officer', yard: 'Vashi APMC Terminal', shift: 'Evening (14:00 - 22:00)', phone: '+91 99111 22334', isOnDuty: false },
    { id: 'stf-204', name: 'Priya Sharma', role: 'APMC Assistant Secretary', yard: 'Ludhiana Grain Hub', shift: 'Morning (06:00 - 14:00)', phone: '+91 98222 33445', isOnDuty: true }
  ]);

  // 4. Interactive Graphs Data
  const tradeTrendData = [
    { month: 'Apr', salesLakhs: 280, volumeQuintals: 11000 },
    { month: 'May', salesLakhs: 340, volumeQuintals: 13500 },
    { month: 'Jun', salesLakhs: 410, volumeQuintals: 16000 },
    { month: 'Jul', salesLakhs: 380, volumeQuintals: 14800 },
    { month: 'Aug', salesLakhs: 490, volumeQuintals: 19200 },
    { month: 'Sep (Live)', salesLakhs: 540, volumeQuintals: 21500 }
  ];

  const commodityVolumeData = [
    { commodity: 'Basmati Paddy', volumeQuintals: 2500, avgRate: 4620 },
    { commodity: 'Wheat Sharbati', volumeQuintals: 1800, avgRate: 2520 },
    { commodity: 'Cotton Medium', volumeQuintals: 1200, avgRate: 7400 },
    { commodity: 'Nashik Red Onion', volumeQuintals: 950, avgRate: 2550 },
    { commodity: 'Hybrid Tomato', volumeQuintals: 600, avgRate: 2250 }
  ];

  // 5. User Report History & Fraud Alerts Dataset
  const [userReportHistory, setUserReportHistory] = useState([
    {
      id: 'rpt-501',
      ticketId: 'RPT-2026-101',
      reporterName: 'Gurpreet Singh (Malwa FPO)',
      accusedUser: 'Fake Trading Corp',
      category: 'Escrow Payment Bouncing & Fake Offer',
      lotId: 'lot-881',
      riskLevel: 'CRITICAL',
      status: 'USER_BANNED',
      reportedDate: '2026-09-03',
      description: 'Trader submitted forged bank receipt without depositing escrow funds for 450 Quintals Basmati Rice.'
    },
    {
      id: 'rpt-502',
      ticketId: 'RPT-2026-102',
      reporterName: 'Karnal Anaj Mandi Inspector',
      accusedUser: 'Subhash Mandi Unloader',
      category: 'Weighbridge Calibration Fraud',
      lotId: 'lot-883',
      riskLevel: 'HIGH',
      status: 'UNDER_INVESTIGATION',
      reportedDate: '2026-09-04',
      description: 'Net weight reading manipulated by 40 Quintals at receiving bay.'
    }
  ]);

  // 6. Selling Crop Lots Data
  const [recentSales, setRecentSales] = useState([
    {
      id: 'lot-881',
      commodity: 'Paddy (Basmati 1121)',
      sellerName: 'Gurpreet Singh (Malwa FPO)',
      quantityQuintals: 450,
      askingPrice: 4550,
      apmcModalPrice: 4520,
      spreadPercent: '+0.7%',
      location: 'Ludhiana, Punjab',
      status: 'CONTRACT_LOCKED',
      totalValue: 2047500,
      isScamFlagged: false
    },
    {
      id: 'lot-882',
      commodity: 'Cotton (Medium Staple)',
      sellerName: 'Ramesh Patel (Farmer)',
      quantityQuintals: 120,
      askingPrice: 7300,
      apmcModalPrice: 7200,
      spreadPercent: '+1.3%',
      location: 'Rajkot, Gujarat',
      status: 'OPEN',
      totalValue: 876000,
      isScamFlagged: false
    },
    {
      id: 'lot-883',
      commodity: 'Wheat (Sharbati)',
      sellerName: 'Kishan Kumar (Karnal FPO)',
      quantityQuintals: 800,
      askingPrice: 2480,
      apmcModalPrice: 2450,
      spreadPercent: '+1.2%',
      location: 'Karnal, Haryana',
      status: 'OPEN',
      totalValue: 1984000,
      isScamFlagged: false
    }
  ]);

  // Summary Metrics
  const totalSalesToday = recentSales.reduce((acc, curr) => acc + curr.totalValue, 0);
  const totalQuintalsSold = recentSales.reduce((acc, curr) => acc + curr.quantityQuintals, 0);
  const bannedUserCount = farmersAndFpos.filter(u => u.isBanned).length;

  // Handlers
  const handleToggleBanUser = (userId) => {
    setFarmersAndFpos(prev => prev.map(u => {
      if (u.id === userId) {
        const nextState = !u.isBanned;
        alert(nextState ? `🚫 USER BLACKLISTED: ${u.name} has been BANNED from APMC Trading!` : `🟢 USER UNBANNED: ${u.name} access restored to Verified status!`);
        return { ...u, isBanned: nextState };
      }
      return u;
    }));
  };

  const handleToggleStaffDuty = (staffId) => {
    setStaffMembers(prev => prev.map(s => {
      if (s.id === staffId) {
        const nextState = !s.isOnDuty;
        return { ...s, isOnDuty: nextState };
      }
      return s;
    }));
  };

  // Add Scheme Form Submit
  const handleAddSchemeSubmit = (e) => {
    e.preventDefault();
    if (!schemeTitle.trim()) return;

    const newScheme = {
      id: `scheme-${Date.now()}`,
      title: schemeTitle,
      category: schemeCategory,
      benefit: schemeBenefit,
      eligibility: schemeEligibility,
      desc: schemeDesc || 'New Government Agriculture & DBT Subsidy Scheme published by APMC Central Ministry.',
      status: 'ACTIVE_GOVT',
      totalBeneficiaries: 0
    };

    setGovSchemesList(prev => [newScheme, ...prev]);
    setIsAddSchemeModalOpen(false);
    setSchemeTitle('');
    setSchemeDesc('');
    alert(`🏛️ GOVERNMENT SCHEME ADDED: "${newScheme.title}" published successfully!`);
  };

  // Generic Excel CSV Exporter for any dataset
  const exportToExcelCSV = (filename, headers, rows) => {
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export 1: Farmers & FPOs Excel Export (With Aadhaar)
  const exportFarmersExcel = () => {
    const headers = ['User ID', 'Name', 'Role', 'Coalition Group', 'District', 'State', 'Phone', 'Aadhaar Number', 'KYC Status', 'Banned Status'];
    const rows = farmersAndFpos.map(f => [
      f.id, f.name, f.role, f.coalition, f.district, f.state, f.phone, f.aadhaarNumber, f.kycStatus, f.isBanned ? 'BANNED' : 'ACTIVE'
    ]);
    exportToExcelCSV('Govt_Audit_Farmers_FPOs_Aadhaar_Directory', headers, rows);
  };

  // Export 2: Government Schemes Excel Export
  const exportSchemesExcel = () => {
    const headers = ['Scheme ID', 'Title', 'Category', 'Benefit Rate', 'Eligibility', 'Beneficiaries Count', 'Status'];
    const rows = govSchemesList.map(s => [
      s.id, s.title, s.category, s.benefit, s.eligibility, s.totalBeneficiaries, s.status
    ]);
    exportToExcelCSV('Govt_Audit_Schemes_Subsidies_Report', headers, rows);
  };

  // Export 3: Produce Sales & Price Spread Excel Export
  const exportSalesExcel = () => {
    const headers = ['Lot ID', 'Commodity', 'Seller', 'Quantity (Qtl)', 'Asking Price (INR)', 'APMC Modal Price (INR)', 'Total Value (INR)', 'Status'];
    const rows = recentSales.map(s => [
      s.id, s.commodity, s.sellerName, s.quantityQuintals, s.askingPrice, s.apmcModalPrice, s.totalValue, s.status
    ]);
    exportToExcelCSV('Govt_Audit_Produce_Sales_Market_Prices', headers, rows);
  };

  // PDF Master Export
  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export the PDF Audit Report.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>APMC Master Government Compliance Audit Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 25px; color: #111; line-height: 1.5; }
            h1 { color: #059669; border-bottom: 2px solid #059669; padding-bottom: 8px; margin-bottom: 5px; }
            .header-info { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; color: #555; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 7px 10px; text-align: left; }
            th { background-color: #059669; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .footer { margin-top: 30px; font-size: 11px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; text-align: center; }
          </style>
        </head>
        <body>
          <h1>🛡️ APMC Central Regulatory Master Audit Report</h1>
          <div class="header-info">
            <div>Official Government Beneficiary & Aadhaar Audit Log</div>
            <div>Generated Date: ${new Date().toLocaleString('en-IN')}</div>
          </div>

          <h2>1. Registered Farmers & FPOs Directory (With Aadhaar Document IDs)</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>State & District</th>
                <th>Aadhaar Number</th>
                <th>Phone</th>
                <th>KYC Status</th>
              </tr>
            </thead>
            <tbody>
              ${farmersAndFpos.map(f => `
                <tr>
                  <td>${f.id}</td>
                  <td><strong>${f.name}</strong></td>
                  <td>${f.role}</td>
                  <td>${f.district}, ${f.state}</td>
                  <td><strong>${f.aadhaarNumber}</strong></td>
                  <td>${f.phone}</td>
                  <td>${f.kycStatus}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            KrishiLink APMC Central Master Command Hub • Government Compliant
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const filteredFarmers = farmersAndFpos.filter(f =>
    (roleFilter ? f.role === roleFilter : true) &&
    (f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.coalition.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.aadhaarNumber.includes(searchTerm) ||
     f.state.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card responsive-header-banner" style={{
        background: 'linear-gradient(135deg, #170a24 0%, #0d121c 100%)',
        border: '1px solid #ec489950'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-red" style={{ background: 'rgba(236, 72, 153, 0.25)', color: '#ec4899', borderColor: '#ec4899' }}>
              🛡️ APMC Central Regulatory & Govt Audit Command Portal
            </span>
            <span className="badge badge-blue">
              Officer: {currentUser?.name || 'APMC Admin'}
            </span>
          </div>

          <h1 style={{ fontSize: '1.75rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="#ec4899" size={28} /> APMC Mandi Regulatory & Govt Audit Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '750px' }}>
            Aadhaar document verification, Government Schemes creation & management, Excel audit exports, and staff rosters.
          </p>
        </div>

        {/* Action Button Group */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-gold"
            onClick={() => setIsAddSchemeModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Landmark size={16} /> Add Government Scheme
          </button>

          <button
            className="btn btn-primary"
            onClick={exportFarmersExcel}
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <Download size={16} /> Export Aadhaar Excel
          </button>

          <button
            className="btn btn-outline"
            onClick={handleExportPDF}
          >
            <FileText size={16} /> PDF Audit Report
          </button>
        </div>
      </div>

      {/* KPI STATS ROW */}
      <div className="grid-4">
        <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)', background: 'linear-gradient(135deg, #092015 0%, #0e2017 100%)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Verified Aadhaar Farmers</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            14,700+ Verified
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Aadhaar Document Status: <strong>100% Audited</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #8b5cf6', background: 'linear-gradient(135deg, #1d0f33 0%, #0e2017 100%)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Active Govt Schemes</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8b5cf6' }}>
            {govSchemesList.length} Active Schemes
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Beneficiaries Enrolled: <strong>27,400+</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Today's Produce Sales</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
            ₹{totalSalesToday.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Volume Traded: <strong>{totalQuintalsSold} Qtl</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-red)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Govt Audit Excel Export</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>
            Ready (.XLSX)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Format: <strong>Ministry Compliant</strong>
          </div>
        </div>
      </div>

      {/* NEW SECTION 1: REGISTERED FARMERS DIRECTORY WITH AADHAAR NUMBERS & EXCEL EXPORT */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={20} color="var(--primary)" /> Registered Farmers & FPOs Aadhaar Document ID Directory
            </h3>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Verified government Aadhaar card numbers for DBT subsidy validation and direct payout auditing.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="form-input"
              style={{ width: '220px', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              placeholder="Search by Aadhaar, name, state..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
              onClick={exportFarmersExcel}
            >
              <Download size={14} /> Export Excel (.XLSX)
            </button>
          </div>
        </div>

        <div className="responsive-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>User ID</th>
                <th style={{ padding: '0.75rem' }}>Farmer / FPO Name</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Govt Aadhaar Number</th>
                <th style={{ padding: '0.75rem' }}>Location</th>
                <th style={{ padding: '0.75rem' }}>Phone Contact</th>
                <th style={{ padding: '0.75rem' }}>KYC Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: user.isBanned ? 'rgba(239, 68, 68, 0.06)' : 'transparent' }}>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{user.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: user.isBanned ? '#f87171' : '#fff' }}>{user.name}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={`badge ${user.role === 'Farmer' ? 'badge-green' : user.role === 'FPO' ? 'badge-gold' : 'badge-blue'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>
                    💳 {user.aadhaarNumber}
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{user.district}, {user.state}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{user.phone}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {user.isBanned ? (
                      <span className="badge badge-red" style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#f87171' }}>
                        🚫 BANNED
                      </span>
                    ) : (
                      <span className="badge badge-green">✓ {user.kycStatus}</span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', borderColor: user.isBanned ? '#10b981' : '#ef4444', color: user.isBanned ? '#34d399' : '#f87171' }}
                      onClick={() => handleToggleBanUser(user.id)}
                    >
                      {user.isBanned ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW SECTION 2: GOVERNMENT SCHEMES MANAGEMENT & SCHEME ADDING */}
      <div className="glass-card" style={{ border: '1px solid #8b5cf650' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Landmark size={20} color="#8b5cf6" /> Government Schemes Management & Beneficiary Audit
            </h3>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Publish new central/state agriculture schemes and export beneficiary reports for ministry audits.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-gold"
              onClick={() => setIsAddSchemeModalOpen(true)}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            >
              <Plus size={14} /> Add Government Scheme
            </button>
            <button
              className="btn btn-outline"
              onClick={exportSchemesExcel}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderColor: '#8b5cf6', color: '#c084fc' }}
            >
              <Download size={14} /> Export Schemes Excel
            </button>
          </div>
        </div>

        <div className="responsive-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Scheme Title</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Benefit Subsidy Rate</th>
                <th style={{ padding: '0.75rem' }}>Target Eligibility</th>
                <th style={{ padding: '0.75rem' }}>Enrolled Farmers</th>
                <th style={{ padding: '0.75rem' }}>Govt Status</th>
              </tr>
            </thead>
            <tbody>
              {govSchemesList.map(scheme => (
                <tr key={scheme.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#fff' }}>{scheme.title}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
                      {scheme.category}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{scheme.benefit}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{scheme.eligibility}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{scheme.totalBeneficiaries.toLocaleString()} Farmers</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-green">✓ Active Govt DBT</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MULTIPLE DYNAMIC CHARTS */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--primary)" /> Monthly Mandi Revenue Trend (Lakhs INR)
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              6-Month historical trade volume and revenue graph across APMC mandi terminals.
            </div>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tradeTrendData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#0d1e15', border: '1px solid var(--primary)', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`₹${val} Lakhs`, 'Sales Volume']}
                />
                <Area type="monotone" dataKey="salesLakhs" stroke="var(--primary)" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Store size={18} color="var(--accent-gold)" /> Top Commodity Volume Breakdown (Quintals)
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Distribution of major traded crops in APMC electronic auction bays.
            </div>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commodityVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="commodity" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#1c1507', border: '1px solid var(--accent-gold)', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val} Quintals`, 'Traded Volume']}
                />
                <Bar dataKey="volumeQuintals" fill="var(--accent-gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* APMC STAFF MANAGEMENT & DUTY ROSTER */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={20} color="var(--primary)" /> Deployed APMC Mandi Staff & Field Duty Roster
            </h3>
          </div>

          <button className="btn btn-primary" onClick={() => setIsAddStaffModalOpen(true)}>
            <Plus size={16} /> Deploy Staff Member
          </button>
        </div>

        <div className="responsive-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Staff ID</th>
                <th style={{ padding: '0.75rem' }}>Staff Name</th>
                <th style={{ padding: '0.75rem' }}>Designation / Role</th>
                <th style={{ padding: '0.75rem' }}>Assigned Yard</th>
                <th style={{ padding: '0.75rem' }}>Duty Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map(staff => (
                <tr key={staff.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{staff.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#fff' }}>{staff.name}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>{staff.role}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{staff.yard}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {staff.isOnDuty ? (
                      <span className="badge badge-green">🟢 ON DUTY</span>
                    ) : (
                      <span className="badge badge-red" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>🔴 OFF DUTY</span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                      onClick={() => handleToggleStaffDuty(staff.id)}
                    >
                      {staff.isOnDuty ? 'Set OFF Duty' : 'Set ON Duty'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD GOVERNMENT SCHEME */}
      {isAddSchemeModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddSchemeModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', border: '1px solid #8b5cf6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Landmark size={22} color="#8b5cf6" /> Publish New Government Scheme & Subsidy
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsAddSchemeModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSchemeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Government Scheme Title:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. PM-PRANAM Organic Fertilizer Subvention"
                  value={schemeTitle}
                  onChange={e => setSchemeTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Scheme Category:</label>
                  <select className="form-select" value={schemeCategory} onChange={e => setSchemeCategory(e.target.value)}>
                    <option value="Financial Support">Financial Support (DBT)</option>
                    <option value="Crop Insurance">Crop Insurance</option>
                    <option value="Solar Subsidy">Solar Pump Subsidy</option>
                    <option value="Fertilizer Subvention">Fertilizer Subvention</option>
                    <option value="Soil Health">Soil Health</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Benefit / Subsidy Rate:</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 75% Capital Subsidy"
                    value={schemeBenefit}
                    onChange={e => setSchemeBenefit(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Target Eligibility Criteria:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Landholding Farmers with Verified Aadhaar & Patta"
                  value={schemeEligibility}
                  onChange={e => setSchemeEligibility(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Scheme Description & Guidelines:</label>
                <textarea
                  className="form-input"
                  style={{ height: '75px', resize: 'vertical' }}
                  placeholder="Enter scheme details, disbursement terms, and application process..."
                  value={schemeDesc}
                  onChange={e => setSchemeDesc(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#fff' }}>
                  Publish Scheme to Farmer Hub
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsAddSchemeModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DEPLOY APMC STAFF */}
      {isAddStaffModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddStaffModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>Deploy APMC Staff Member</h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsAddStaffModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={e => {
              e.preventDefault();
              if (!newStaffName.trim()) return;
              setStaffMembers(prev => [...prev, { id: `stf-${Date.now()}`, name: newStaffName, role: newStaffRole, yard: newStaffYard, shift: newStaffShift, phone: newStaffPhone, isOnDuty: true }]);
              setIsAddStaffModalOpen(false);
              setNewStaffName('');
              alert(`✓ APMC Staff Member ${newStaffName} deployed!`);
            }}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Staff Member Name:</label>
                <input type="text" className="form-input" value={newStaffName} onChange={e => setNewStaffName(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Deploy Staff Member</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
