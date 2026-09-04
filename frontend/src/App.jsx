import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RoleBanner from './components/RoleBanner';
import AuthModal from './components/AuthModal';
import PriceDiscovery from './pages/PriceDiscovery';
import Marketplace from './pages/Marketplace';
import SmartMatch from './pages/SmartMatch';
import LogisticsStorage from './pages/LogisticsStorage';
import OrdersEscrow from './pages/OrdersEscrow';
import GrievanceDesk from './pages/GrievanceDesk';

export default function App() {
  const [activeTab, setActiveTab] = useState('price');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 'u-1',
    name: 'Gurpreet Singh (Malwa FPO)',
    role: 'FPO'
  });

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <RoleBanner
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <main className="main-content">
        {activeTab === 'price' && <PriceDiscovery />}
        {activeTab === 'marketplace' && <Marketplace currentUser={currentUser} />}
        {activeTab === 'match' && <SmartMatch currentUser={currentUser} />}
        {activeTab === 'logistics' && <LogisticsStorage currentUser={currentUser} />}
        {activeTab === 'orders' && <OrdersEscrow currentUser={currentUser} />}
        {activeTab === 'grievance' && <GrievanceDesk currentUser={currentUser} />}
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        setCurrentUser={setCurrentUser}
      />

      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.825rem',
        marginTop: '3rem',
        background: '#070f0b'
      }}>
        <div>🌾 <strong>KrishiLink SIH 2026</strong> — Market Linkages & Price Discovery Solution for Farmers</div>
        <div style={{ marginTop: '0.25rem', opacity: 0.7 }}>
          Built with Node.js, Express, Mongoose & React.js | Empowering Smallholders & FPOs across Mandis in India
        </div>
      </footer>
    </div>
  );
}
