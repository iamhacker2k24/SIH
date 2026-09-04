import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RoleBanner from './components/RoleBanner';
import AuthModal from './components/AuthModal';
import FloatingAiChat from './components/FloatingAiChat';
import PriceDiscovery from './pages/PriceDiscovery';
import Marketplace from './pages/Marketplace';
import SmartMatch from './pages/SmartMatch';
import LogisticsStorage from './pages/LogisticsStorage';
import OrdersEscrow from './pages/OrdersEscrow';
import GrievanceDesk from './pages/GrievanceDesk';

export default function App() {
  const [activeTab, setActiveTab] = useState('price');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedState, setSelectedState] = useState('');

  // Persistent User Session (localStorage + Cookie)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('krishilink_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      id: 'u-1',
      name: 'Gurpreet Singh (Malwa FPO)',
      role: 'FPO'
    };
  });

  // Only show auth modal if user session has never been saved
  const [isAuthOpen, setIsAuthOpen] = useState(() => {
    return !localStorage.getItem('krishilink_user');
  });

  const handleSetUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('krishilink_user', JSON.stringify(user));
    document.cookie = `krishilink_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=2592000`;
  };

  const handleLogout = () => {
    localStorage.removeItem('krishilink_user');
    document.cookie = `krishilink_user=; path=/; max-age=0`;
    setIsAuthOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <RoleBanner
        currentUser={currentUser}
        setCurrentUser={handleSetUser}
      />

      <main className="main-content">
        {activeTab === 'price' && <PriceDiscovery selectedState={selectedState} />}
        {activeTab === 'marketplace' && <Marketplace currentUser={currentUser} selectedState={selectedState} />}
        {activeTab === 'match' && <SmartMatch currentUser={currentUser} selectedState={selectedState} />}
        {activeTab === 'logistics' && <LogisticsStorage currentUser={currentUser} selectedState={selectedState} />}
        {activeTab === 'orders' && <OrdersEscrow currentUser={currentUser} />}
        {activeTab === 'grievance' && <GrievanceDesk currentUser={currentUser} />}
      </main>

      <FloatingAiChat
        selectedLanguage={selectedLanguage}
        selectedState={selectedState}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        setCurrentUser={handleSetUser}
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
        <div>🌾 <strong>KrishiLink</strong> — Market Linkages & Price Discovery Platform</div>
        <div style={{ marginTop: '0.25rem', opacity: 0.7 }}>
          Built with Node.js, Express, Mongoose & React.js | Language: {selectedLanguage} | Region: {selectedState || 'All India'}
        </div>
      </footer>
    </div>
  );
}
