import React, { useState } from 'react';
import {
  Users, Sprout, TrendingUp, Store, DollarSign, ShieldCheck, Plus, FileText,
  Search, Filter, CheckCircle2, AlertCircle, MapPin, X, Award, HelpCircle,
  Building2, ArrowRight, UserPlus, UserMinus, ShoppingCart, Send, Headphones, Download, ChevronRight, BarChart2
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

export default function FpoPanel({ currentUser }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  // Joined Groups Tracking
  const [myJoinedGroupIds, setMyJoinedGroupIds] = useState(['fpo-101']);

  // Modals state
  const [isCreateFpoModalOpen, setIsCreateFpoModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddPoolProductModalOpen, setIsAddPoolProductModalOpen] = useState(false);
  const [isApplySchemeModalOpen, setIsApplySchemeModalOpen] = useState(false);
  const [isFpoSupportModalOpen, setIsFpoSupportModalOpen] = useState(false);

  const [selectedFpoForMember, setSelectedFpoForMember] = useState(null);
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState(null);

  // Form State: Create FPO
  const [fpoName, setFpoName] = useState('');
  const [fpoState, setFpoState] = useState('Punjab');
  const [fpoDistrict, setFpoDistrict] = useState('Ludhiana');
  const [fpoCropSpecialty, setFpoCropSpecialty] = useState('Basmati Rice & Wheat');
  const [fpoRegistrationNo, setFpoRegistrationNo] = useState('FPO/PB/2024/8812');

  // Form State: Add Member Farmer
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newFarmerAadhaar, setNewFarmerAadhaar] = useState('');
  const [newFarmerAcres, setNewFarmerAcres] = useState('5.5');
  const [newFarmerVillage, setNewFarmerVillage] = useState('Khanna Village');

  // Form State: Pool Produce
  const [poolCommodity, setPoolCommodity] = useState('Basmati Paddy (1121)');
  const [poolQuantity, setPoolQuantity] = useState('500');
  const [poolFarmerPrice, setPoolFarmerPrice] = useState('4400');
  const [poolTargetBuyerPrice, setPoolTargetBuyerPrice] = useState('4650');

  // Form State: Support Query
  const [fpoQueryType, setFpoQueryType] = useState('Equity Grant Application Guidance');
  const [fpoQueryText, setFpoQueryText] = useState('');

  // 1. FPO Groups Directory
  const [fpoGroups, setFpoGroups] = useState([
    {
      id: 'fpo-101',
      name: 'Malwa Farmers Producer Collective',
      registrationNo: 'FPO/PB/2022/4120',
      state: 'Punjab',
      district: 'Ludhiana',
      specialty: 'Basmati Rice & Sharbati Wheat',
      memberCount: 340,
      totalPooledAcres: 2450,
      pooledStockQuintals: 4500,
      annualTurnoverLakhs: 185,
      presidentName: 'Gurpreet Singh',
      contactPhone: '+91 98765 43210',
      isVerifiedGovt: true,
      membersList: [
        { id: 'm-1', name: 'Gurpreet Singh (President)', aadhaar: '4829-9182-1092', acres: 12, village: 'Khanna' },
        { id: 'm-2', name: 'Ramesh Patel', aadhaar: '8910-2234-5512', acres: 6, village: 'Samrala' },
        { id: 'm-3', name: 'Harbhajan Singh', aadhaar: '3341-9920-1123', acres: 8, village: 'Doraha' }
      ]
    },
    {
      id: 'fpo-102',
      name: 'Nashik Red Onion & Grape Farmers FPO',
      registrationNo: 'FPO/MH/2023/1092',
      state: 'Maharashtra',
      district: 'Nashik',
      specialty: 'Export Grade Onion & Grapes',
      memberCount: 520,
      totalPooledAcres: 3800,
      pooledStockQuintals: 8200,
      annualTurnoverLakhs: 340,
      presidentName: 'Sanjay Deshmukh',
      contactPhone: '+91 98220 11992',
      isVerifiedGovt: true,
      membersList: [
        { id: 'm-10', name: 'Sanjay Deshmukh', aadhaar: '6610-8829-1029', acres: 15, village: 'Pimpalgaon' },
        { id: 'm-11', name: 'Vijay Patil', aadhaar: '7729-1029-4412', acres: 9, village: 'Niphad' }
      ]
    },
    {
      id: 'fpo-103',
      name: 'Gujarat Cotton & Groundnut Producer Alliance',
      registrationNo: 'FPO/GJ/2021/6619',
      state: 'Gujarat',
      district: 'Rajkot',
      specialty: 'Medium Cotton & Groundnut',
      memberCount: 290,
      totalPooledAcres: 1900,
      pooledStockQuintals: 3100,
      annualTurnoverLakhs: 140,
      presidentName: 'Bhavesh Bhai Patel',
      contactPhone: '+91 99099 88123',
      isVerifiedGovt: true,
      membersList: [
        { id: 'm-20', name: 'Bhavesh Bhai Patel', aadhaar: '1129-8839-4019', acres: 10, village: 'Gondal' }
      ]
    }
  ]);

  // 2. FPO Aggregated Bulk Products Inventory
  const [fpoProducts, setFpoProducts] = useState([
    {
      id: 'prod-501',
      fpoId: 'fpo-101',
      fpoName: 'Malwa Farmers Producer Collective',
      commodity: 'Basmati Paddy 1121 (AGMARK Grade A)',
      totalQuantityQuintals: 2500,
      memberFarmerPrice: 4400,
      targetBuyerPrice: 4650,
      location: 'Ludhiana Central FPO Warehouse',
      status: 'AVAILABLE_FOR_INSTITUTIONAL_BUYERS',
      qualityReport: 'Passed - 10.5% Moisture'
    },
    {
      id: 'prod-502',
      fpoId: 'fpo-102',
      fpoName: 'Nashik Red Onion & Grape Farmers FPO',
      commodity: 'Nashik Export Quality Red Onion (55mm+)',
      totalQuantityQuintals: 4200,
      memberFarmerPrice: 2400,
      targetBuyerPrice: 2650,
      location: 'Pimpalgaon Cold Storage Depot',
      status: 'AVAILABLE_FOR_INSTITUTIONAL_BUYERS',
      qualityReport: 'Export Grade Certified'
    }
  ]);

  // 3. Govt FPO Schemes & Subsidies Dataset
  const fpoGovtSchemes = [
    {
      id: 'sch-1',
      name: 'Central Sector Scheme for 10,000 FPOs - Equity Grant Scheme',
      offeredBy: 'Ministry of Agriculture & Farmers Welfare',
      grantAmount: 'Up to ₹15 Lakhs Matching Equity Grant',
      eligibility: 'Registered FPOs with minimum 300 farmer shareholders',
      deadline: '2026-10-31',
      status: 'OPEN'
    },
    {
      id: 'sch-2',
      name: 'NABARD Credit Guarantee Fund Scheme (CGFS)',
      offeredBy: 'NABARD & NCDC',
      grantAmount: 'Collateral-Free Credit up to ₹2.00 Crore',
      eligibility: 'FPOs with 1+ year operating audit track record',
      deadline: '2026-12-15',
      status: 'OPEN'
    },
    {
      id: 'sch-3',
      name: 'PM-KUSUM Solar Cold Storage & Processing Subsidy',
      offeredBy: 'MNRE & Ministry of Food Processing',
      grantAmount: '75% Capital Subsidy on Packhouse Units',
      eligibility: 'FPOs setting up on-farm solar cold chains',
      deadline: '2026-11-20',
      status: 'OPEN'
    }
  ];

  // Market Spread Analytics Data
  const priceSpreadData = [
    { commodity: 'Basmati Paddy', individualFarmerPrice: 4250, fpoAggregatedPrice: 4650, profitMargin: 400 },
    { commodity: 'Sharbati Wheat', individualFarmerPrice: 2350, fpoAggregatedPrice: 2550, profitMargin: 200 },
    { commodity: 'Nashik Red Onion', individualFarmerPrice: 2200, fpoAggregatedPrice: 2650, profitMargin: 450 },
    { commodity: 'Cotton', individualFarmerPrice: 6900, fpoAggregatedPrice: 7400, profitMargin: 500 }
  ];

  // Toggle Join / Leave FPO Group
  const handleToggleJoinGroup = (fpoId, fpoName) => {
    if (myJoinedGroupIds.includes(fpoId)) {
      setMyJoinedGroupIds(prev => prev.filter(id => id !== fpoId));
      alert(`ℹ️ You have left ${fpoName}.`);
    } else {
      setMyJoinedGroupIds(prev => [...prev, fpoId]);
      alert(`🎉 SUCCESS: You have joined ${fpoName}! You can now pool crops and access shared tractor/cold storage machinery.`);
    }
  };

  // Create New FPO Group Submit
  const handleCreateFpoSubmit = (e) => {
    e.preventDefault();
    if (!fpoName) return;

    const newFpo = {
      id: `fpo-${Math.floor(104 + Math.random() * 100)}`,
      name: fpoName,
      registrationNo: fpoRegistrationNo || `FPO/${fpoState.substring(0,2).toUpperCase()}/2026/${Math.floor(1000 + Math.random()*9000)}`,
      state: fpoState,
      district: fpoDistrict,
      specialty: fpoCropSpecialty,
      memberCount: 1,
      totalPooledAcres: 10,
      pooledStockQuintals: 0,
      annualTurnoverLakhs: 0,
      presidentName: currentUser?.name || 'Lead Farmer Director',
      contactPhone: '+91 98000 11223',
      isVerifiedGovt: true,
      membersList: [
        { id: 'm-owner', name: currentUser?.name || 'Lead Farmer', aadhaar: '4829-9182-1092', acres: 10, village: `${fpoDistrict} Village` }
      ]
    };

    setFpoGroups(prev => [newFpo, ...prev]);
    setMyJoinedGroupIds(prev => [...prev, newFpo.id]);
    setIsCreateFpoModalOpen(false);
    setFpoName('');
    alert(`🎉 FPO COALITION CREATED: ${newFpo.name} is now registered on KrishiLink B2B Network!`);
  };

  // Add Member to FPO Submit
  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!selectedFpoForMember || !newFarmerName) return;

    const newMember = {
      id: `m-${Math.floor(100 + Math.random() * 900)}`,
      name: newFarmerName,
      aadhaar: newFarmerAadhaar || '4829-1029-4412',
      acres: parseFloat(newFarmerAcres),
      village: newFarmerVillage
    };

    setFpoGroups(prev => prev.map(fpo => {
      if (fpo.id === selectedFpoForMember.id) {
        return {
          ...fpo,
          memberCount: fpo.memberCount + 1,
          totalPooledAcres: fpo.totalPooledAcres + parseFloat(newFarmerAcres),
          membersList: [...fpo.membersList, newMember]
        };
      }
      return fpo;
    }));

    setIsAddMemberModalOpen(false);
    setNewFarmerName('');
    alert(`✅ MEMBER ADDED: ${newMember.name} added to ${selectedFpoForMember.name}. Total members: ${selectedFpoForMember.memberCount + 1}`);
  };

  // Add Pooled Produce Lot Submit
  const handleAddPoolProductSubmit = (e) => {
    e.preventDefault();
    if (!poolCommodity || !poolQuantity) return;

    const newProd = {
      id: `prod-${Math.floor(503 + Math.random() * 100)}`,
      fpoId: fpoGroups[0]?.id || 'fpo-101',
      fpoName: fpoGroups[0]?.name || 'Malwa Farmers Producer Collective',
      commodity: poolCommodity,
      totalQuantityQuintals: parseFloat(poolQuantity),
      memberFarmerPrice: parseFloat(poolFarmerPrice),
      targetBuyerPrice: parseFloat(poolTargetBuyerPrice),
      location: `${fpoGroups[0]?.district || 'Ludhiana'} FPO Central Hub`,
      status: 'AVAILABLE_FOR_INSTITUTIONAL_BUYERS',
      qualityReport: 'AGMARK Grade A Certified'
    };

    setFpoProducts(prev => [newProd, ...prev]);
    setIsAddPoolProductModalOpen(false);
    alert(`📢 FPO BULK LOT LISTED: ${newProd.totalQuantityQuintals} Qtl ${newProd.commodity} listed for institutional buyers @ ₹${newProd.targetBuyerPrice}/Qtl!`);
  };

  // Apply for FPO Scheme Submit
  const handleApplySchemeSubmit = (e) => {
    e.preventDefault();
    setIsApplySchemeModalOpen(false);
    alert(`📜 SCHEME APPLICATION SUBMITTED: Application for ${selectedSchemeForApply?.name} submitted to Ministry of Agriculture portal! Reference ID: APP-FPO-2026-9912.`);
  };

  const filteredFpos = fpoGroups.filter(fpo =>
    (stateFilter ? fpo.state.toLowerCase() === stateFilter.toLowerCase() : true) &&
    (fpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     fpo.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
     fpo.district.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-card responsive-header-banner" style={{
        background: 'linear-gradient(135deg, #091a13 0%, #15803d 100%)',
        border: '1px solid #10b98150'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-green">
              🌾 FPO Collective & Farmers Group Hub
            </span>
            <span className="badge badge-blue">
              Joined Groups: {myJoinedGroupIds.length} Active FPOs
            </span>
          </div>

          <h1 style={{ fontSize: '1.75rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users color="#34d399" size={28} /> {t('fpo_panel_title', 'Farmer Producer Organizations (FPO) Portal')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '780px' }}>
            {t('fpo_panel_sub', 'Join local farmer groups, pool crop yields for higher bulk bargaining power, sell aggregated FPO produce to B2B buyers, apply for ₹15 Lakhs Govt Equity Grants, and access market spread intelligence.')}
          </p>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={() => setIsCreateFpoModalOpen(true)}
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}
          >
            <Plus size={16} /> Register New FPO Group
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setIsAddPoolProductModalOpen(true)}
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff' }}
          >
            <Store size={16} /> Pool Bulk Produce Lot
          </button>
        </div>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid-4">
        <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)', background: 'linear-gradient(135deg, #07150e 0%, #0e2417 100%)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Registered FPO Groups</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            {fpoGroups.length} Active Coalitions
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Total Farmers Joined: <strong>1,150+ Shareholders</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>FPO Pooled Bulk Stock</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60a5fa' }}>
            {fpoProducts.reduce((acc, p) => acc + p.totalQuantityQuintals, 0).toLocaleString('en-IN')} Quintals
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Aggregated Value: <strong>₹3.15 Crore</strong>
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>FPO Price Benefit Premium</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
            +12.5% Higher MSP
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            vs Individual Farmer Local Bids
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Govt Equity Grants</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c084fc' }}>
            ₹15 Lakhs Matching Grant
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Status: <strong>Scheme Open for FPOs</strong>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="glass-card" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.75rem' }}>
        <button
          className={`btn ${activeTab === 'groups' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('groups')}
          style={{ fontSize: '0.85rem' }}
        >
          🌾 Farmers Groups Directory ({fpoGroups.length})
        </button>
        <button
          className={`btn ${activeTab === 'mygroup' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('mygroup')}
          style={{ fontSize: '0.85rem' }}
        >
          👥 My Joined FPO Roster ({myJoinedGroupIds.length})
        </button>
        <button
          className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('inventory')}
          style={{ fontSize: '0.85rem' }}
        >
          📦 FPO Pooled Produce Market ({fpoProducts.length})
        </button>
        <button
          className={`btn ${activeTab === 'schemes' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('schemes')}
          style={{ fontSize: '0.85rem' }}
        >
          📜 FPO Govt Equity Schemes ({fpoGovtSchemes.length})
        </button>
        <button
          className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('analytics')}
          style={{ fontSize: '0.85rem' }}
        >
          📊 Market Price Spread Intelligence
        </button>
        <button
          className={`btn ${activeTab === 'support' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('support')}
          style={{ fontSize: '0.85rem' }}
        >
          🎧 FPO Legal & Advisory Support
        </button>
      </div>

      {/* TAB 1: FARMER GROUPS DIRECTORY */}
      {activeTab === 'groups' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} color="var(--primary)" /> Registered Farmer Producer Organizations (FPOs)
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Browse verified state farmer collectives, join group pools, or contact group directors.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="form-input"
                style={{ width: '180px', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                placeholder="Search FPO name, district..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <select
                className="form-select"
                style={{ width: '140px', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                value={stateFilter}
                onChange={e => setStateFilter(e.target.value)}
              >
                <option value="">All States</option>
                <option value="Punjab">Punjab</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
          </div>

          <div className="grid-3">
            {filteredFpos.map(fpo => {
              const isJoined = myJoinedGroupIds.includes(fpo.id);

              return (
                <div key={fpo.id} className="glass-card" style={{
                  border: isJoined ? '1px solid #10b98150' : '1px solid var(--border-color)',
                  background: isJoined ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(255,255,255,0.02) 100%)' : 'var(--bg-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.85rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="badge badge-green">{fpo.district}, {fpo.state}</span>
                      <span className="badge badge-blue">✓ Govt Verified</span>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '0.25rem' }}>
                      {fpo.name}
                    </h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                      Reg No: {fpo.registrationNo}
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div><strong>Crop Specialty:</strong> <span style={{ color: 'var(--primary)' }}>{fpo.specialty}</span></div>
                      <div><strong>Farmer Members:</strong> {fpo.memberCount} Shareholders</div>
                      <div><strong>Total Land Pool:</strong> {fpo.totalPooledAcres} Acres</div>
                      <div><strong>Annual Turnover:</strong> ₹{fpo.annualTurnoverLakhs} Lakhs</div>
                      <div><strong>President:</strong> {fpo.presidentName}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className={`btn ${isJoined ? 'btn-outline' : 'btn-primary'}`}
                      style={{ flex: 1, borderColor: isJoined ? '#ef4444' : undefined, color: isJoined ? '#f87171' : undefined }}
                      onClick={() => handleToggleJoinGroup(fpo.id, fpo.name)}
                    >
                      {isJoined ? <UserMinus size={16} /> : <UserPlus size={16} />}
                      {isJoined ? 'Leave FPO Group' : 'Join FPO Group'}
                    </button>

                    <button
                      className="btn btn-outline"
                      title="Manage Members"
                      style={{ padding: '0.4rem 0.6rem', borderColor: '#3b82f6', color: '#60a5fa' }}
                      onClick={() => {
                        setSelectedFpoForMember(fpo);
                        setIsAddMemberModalOpen(true);
                      }}
                    >
                      + Member
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MY JOINED FPO ROSTER & MEMBERSHIP MANAGEMENT */}
      {activeTab === 'mygroup' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} color="#60a5fa" /> My Active FPO Memberships & Shareholder Roster
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                View registered farmer shareholders, land acreages, Aadhaar documentation, and group voting rights.
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => setIsCreateFpoModalOpen(true)}>
              <Plus size={16} /> Register New FPO Group
            </button>
          </div>

          {fpoGroups.filter(f => myJoinedGroupIds.includes(f.id)).map(fpo => (
            <div key={fpo.id} className="glass-card" style={{ marginBottom: '1.5rem', border: '1px solid #10b98150' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
                    {fpo.name} <span className="badge badge-green">Member Active</span>
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    District: {fpo.district}, {fpo.state} | Reg: {fpo.registrationNo} | President: {fpo.presidentName} ({fpo.contactPhone})
                  </div>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ fontSize: '0.8rem', borderColor: '#3b82f6', color: '#60a5fa' }}
                  onClick={() => {
                    setSelectedFpoForMember(fpo);
                    setIsAddMemberModalOpen(true);
                  }}
                >
                  <UserPlus size={14} /> Add Farmer Member
                </button>
              </div>

              {/* Members Table */}
              <div className="responsive-table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.6rem' }}>Member Name</th>
                      <th style={{ padding: '0.6rem' }}>Verified Aadhaar Document ID</th>
                      <th style={{ padding: '0.6rem' }}>Land Holding (Acres)</th>
                      <th style={{ padding: '0.6rem' }}>Village / Location</th>
                      <th style={{ padding: '0.6rem', textAlign: 'right' }}>Shareholder Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fpo.membersList.map(member => (
                      <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.6rem', fontWeight: 700, color: '#fff' }}>{member.name}</td>
                        <td style={{ padding: '0.6rem', color: 'var(--primary)', fontFamily: 'monospace' }}>💳 {member.aadhaar}</td>
                        <td style={{ padding: '0.6rem', color: 'var(--accent-gold)' }}>{member.acres} Acres</td>
                        <td style={{ padding: '0.6rem', color: 'var(--text-muted)' }}>{member.village}</td>
                        <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                          <span className="badge badge-green">✓ Verified Shareholder</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FPO POOLED BULK PRODUCE MARKET */}
      {activeTab === 'inventory' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Store size={20} color="var(--primary)" /> FPO Pooled Crop Stock Available for Bulk Buyers
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Aggregated crop lots pooled from hundreds of member farmers for direct B2B institutional sales.
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => setIsAddPoolProductModalOpen(true)}>
              <Plus size={16} /> Pool Bulk Produce Lot
            </button>
          </div>

          <div className="grid-2">
            {fpoProducts.map(prod => (
              <div key={prod.id} className="glass-card" style={{
                border: '1px solid #3b82f650',
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.15) 0%, rgba(255,255,255,0.02) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.85rem'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-blue">{prod.fpoName}</span>
                    <span className="badge badge-green">✓ {prod.qualityReport}</span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {prod.commodity}
                  </h4>

                  <div style={{ fontSize: '1.35rem', color: 'var(--accent-gold)', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Target Bulk Rate: ₹{prod.targetBuyerPrice} / Quintal
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div><strong>Total Pooled Volume:</strong> {prod.totalQuantityQuintals.toLocaleString('en-IN')} Quintals</div>
                    <div><strong>Member Payout Rate:</strong> ₹{prod.memberFarmerPrice} / Qtl</div>
                    <div><strong>FPO Profit Spread:</strong> <strong style={{ color: 'var(--primary)' }}>+₹{prod.targetBuyerPrice - prod.memberFarmerPrice} / Qtl</strong></div>
                    <div><strong>Warehouse Storage:</strong> {prod.location}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff' }}
                    onClick={() => alert(`📢 B2B SALE BROADCAST: Lot ${prod.id} for ${prod.totalQuantityQuintals} Qtl ${prod.commodity} broadcast to Institutional Buyers portal!`)}
                  >
                    🚀 Broadcast to B2B Buyer Portal (/buyer)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GOVT FPO SCHEMES & EQUITY GRANTS */}
      {activeTab === 'schemes' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="var(--accent-gold)" /> Government Schemes & Subsidies for FPOs
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Apply for Ministry Equity Grants (up to ₹15 Lakhs), NABARD Working Capital Loans, and Cold Storage Subsidies.
              </div>
            </div>

            <span className="badge badge-gold">Central FPO Scheme Portal Active</span>
          </div>

          <div className="grid-3">
            {fpoGovtSchemes.map(scheme => (
              <div key={scheme.id} className="glass-card" style={{
                border: '1px solid var(--accent-gold)',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(255,255,255,0.02) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.85rem'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-gold">{scheme.offeredBy}</span>
                    <span className="badge badge-green">✓ {scheme.status}</span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {scheme.name}
                  </h4>

                  <div style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {scheme.grantAmount}
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div><strong>Eligibility:</strong> {scheme.eligibility}</div>
                    <div><strong>Application Deadline:</strong> {scheme.deadline}</div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff' }}
                  onClick={() => {
                    setSelectedSchemeForApply(scheme);
                    setIsApplySchemeModalOpen(true);
                  }}
                >
                  📜 Apply for Scheme Grant
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MARKET PRICE SPREAD INTELLIGENCE */}
      {activeTab === 'analytics' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={20} color="#60a5fa" /> FPO Collective Bargaining Power vs Local Mandi Prices
          </h3>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Comparison of price rates achieved by individual farmers vs pooled FPO bulk institutional contracts (₹/Quintal).
          </div>

          <div style={{ width: '100%', height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceSpreadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="commodity" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#091326', border: '1px solid #3b82f6', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="individualFarmerPrice" name="Individual Local Rate (₹/Qtl)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fpoAggregatedPrice" name="FPO Bulk Rate (₹/Qtl)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 6: FPO LEGAL & ADVISORY SUPPORT */}
      {activeTab === 'support' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Headphones size={20} color="#34d399" /> FPO Legal, Statutory Audit & Advisory Support
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Dedicated support desk for Chartered Accountant (CA) filing, ROC compliance, and NABARD grant applications.
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => setIsFpoSupportModalOpen(true)}>
              <Plus size={16} /> Request Legal / CA Advisory
            </button>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, #091a13 0%, #10b98120 100%)', border: '1px solid #10b98150' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                📞 Dedicated FPO Helpline Hotline
              </h4>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                1800-FPO-HELP (1800-376-4357)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Free legal consultation for FPO Board Directors & CA auditors.
              </div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #3b82f620 100%)', border: '1px solid #3b82f650' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                ✉️ FPO Nodal Cell Desk
              </h4>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#60a5fa', marginBottom: '0.25rem' }}>
                fpo-cell@krishilink.gov.in
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Direct email for SFAC (Small Farmers Agri-Business Consortium) filings.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: REGISTER NEW FPO GROUP */}
      {isCreateFpoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateFpoModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', border: '1px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={22} color="var(--primary)" /> Register New FPO Group / Coalition
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsCreateFpoModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateFpoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>FPO / Collective Name:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Malwa Organic Wheat & Rice Producer Co-op"
                  value={fpoName}
                  onChange={e => setFpoName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>State:</label>
                  <select
                    className="form-select"
                    value={fpoState}
                    onChange={e => setFpoState(e.target.value)}
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>District:</label>
                  <input
                    type="text"
                    className="form-input"
                    value={fpoDistrict}
                    onChange={e => setFpoDistrict(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Crop Specialty & Focus Commodities:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Basmati Paddy, Cotton, Red Onion"
                  value={fpoCropSpecialty}
                  onChange={e => setFpoCropSpecialty(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Govt Registration Number (CIN / ROC):</label>
                <input
                  type="text"
                  className="form-input"
                  value={fpoRegistrationNo}
                  onChange={e => setFpoRegistrationNo(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}>
                  🌾 Register FPO Group
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsCreateFpoModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD FARMER MEMBER TO FPO */}
      {isAddMemberModalOpen && selectedFpoForMember && (
        <div className="modal-overlay" onClick={() => setIsAddMemberModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', border: '1px solid #3b82f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserPlus size={22} color="#60a5fa" /> Add Farmer Shareholder to {selectedFpoForMember.name}
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsAddMemberModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Farmer Full Name:</label>
                <input
                  type="text"
                  className="form-input"
                  value={newFarmerName}
                  onChange={e => setNewFarmerName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Aadhaar Number:</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="xxxx-xxxx-xxxx"
                    value={newFarmerAadhaar}
                    onChange={e => setNewFarmerAadhaar(e.target.value)}
                    required
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Land Holding (Acres):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newFarmerAcres}
                    onChange={e => setNewFarmerAcres(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Village / Gram Panchayat:</label>
                <input
                  type="text"
                  className="form-input"
                  value={newFarmerVillage}
                  onChange={e => setNewFarmerVillage(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff' }}>
                  👥 Add Member to Roster
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsAddMemberModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: POOL BULK PRODUCE LOT */}
      {isAddPoolProductModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddPoolProductModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', border: '1px solid #2563eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Store size={22} color="#60a5fa" /> Pool Bulk Produce for B2B Institutional Sales
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsAddPoolProductModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddPoolProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Commodity Name:</label>
                <input
                  type="text"
                  className="form-input"
                  value={poolCommodity}
                  onChange={e => setPoolCommodity(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Total Volume (Quintals):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={poolQuantity}
                    onChange={e => setPoolQuantity(e.target.value)}
                    required
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Farmer Member Rate (₹/Qtl):</label>
                  <input
                    type="number"
                    className="form-input"
                    value={poolFarmerPrice}
                    onChange={e => setPoolFarmerPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Target Institutional Buyer Rate (₹/Qtl):</label>
                <input
                  type="number"
                  className="form-input"
                  value={poolTargetBuyerPrice}
                  onChange={e => setPoolTargetBuyerPrice(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff' }}>
                  🚀 Broadcast FPO Bulk Lot
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsAddPoolProductModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: APPLY FOR GOVT SCHEME */}
      {isApplySchemeModalOpen && selectedSchemeForApply && (
        <div className="modal-overlay" onClick={() => setIsApplySchemeModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', border: '1px solid #f59e0b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={22} color="var(--accent-gold)" /> Apply for FPO Equity Grant
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsApplySchemeModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b50', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', color: '#fef08a', fontSize: '0.85rem' }}>
              Scheme: <strong>{selectedSchemeForApply.name}</strong><br />
              Benefit: <strong>{selectedSchemeForApply.grantAmount}</strong>
            </div>

            <form onSubmit={handleApplySchemeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Select Applying FPO Group:</label>
                <select className="form-select">
                  {fpoGroups.map(fpo => (
                    <option key={fpo.id} value={fpo.id}>{fpo.name} ({fpo.registrationNo})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Board Resolution Date:</label>
                <input type="date" className="form-input" defaultValue="2026-09-01" required />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff' }}>
                  📜 Confirm Scheme Application
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsApplySchemeModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: REQUEST FPO SUPPORT / LEGAL ADVISORY */}
      {isFpoSupportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFpoSupportModalOpen(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', border: '1px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Headphones size={22} color="var(--primary)" /> Request FPO Legal & Advisory Support
              </h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsFpoSupportModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={e => { e.preventDefault(); setIsFpoSupportModalOpen(false); alert('🎧 FPO ADVISORY REQUESTED: A chartered accountant will call your board team within 24 hours.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Consultation Topic:</label>
                <select className="form-select" value={fpoQueryType} onChange={e => setFpoQueryType(e.target.value)}>
                  <option value="Equity Grant Application Guidance">Equity Grant Application Guidance</option>
                  <option value="Statutory ROC Audit & Filing">Statutory ROC Audit & Filing</option>
                  <option value="NABARD Credit Line Consultation">NABARD Credit Line Consultation</option>
                  <option value="AGMARK Quality Lab Setup">AGMARK Quality Lab Setup</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ color: '#fff', fontSize: '0.85rem' }}>Specific Advisory Details:</label>
                <textarea
                  className="form-input"
                  style={{ height: '90px', resize: 'vertical' }}
                  placeholder="Describe your FPO registration, shareholder count, or legal audit question..."
                  value={fpoQueryText}
                  onChange={e => setFpoQueryText(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}>
                  <Send size={16} /> Request CA Advisory Call
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsFpoSupportModalOpen(false)}>
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
