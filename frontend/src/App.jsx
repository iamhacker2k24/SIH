import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import FloatingAiChat from './components/FloatingAiChat';
import FarmerHomeHub from './pages/FarmerHomeHub';
import PriceDiscovery from './pages/PriceDiscovery';
import Marketplace from './pages/Marketplace';
import SmartMatch from './pages/SmartMatch';
import LogisticsStorage from './pages/LogisticsStorage';
import OrdersEscrow from './pages/OrdersEscrow';
import GrievanceDesk from './pages/GrievanceDesk';
import AdminPanel from './pages/AdminPanel';
import MandiDirectory from './pages/MandiDirectory';
import GovernmentSchemes from './pages/GovernmentSchemes';
import AgriLoans from './pages/AgriLoans';
import BuyerPanel from './pages/BuyerPanel';
import FpoPanel from './pages/FpoPanel';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language: selectedLanguage, setLanguage: setSelectedLanguage, t } = useLanguage();
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
      name: 'Ramesh Patel (Farmer)',
      role: 'Farmer'
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

  return (
    <div className="app-container">
      <Navbar
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<FarmerHomeHub currentUser={currentUser} selectedState={selectedState} />} />
          <Route path="/price" element={<PriceDiscovery selectedState={selectedState} />} />
          <Route path="/marketplace" element={<Marketplace currentUser={currentUser} selectedState={selectedState} />} />
          <Route path="/mandis" element={<MandiDirectory selectedState={selectedState} />} />
          <Route path="/schemes" element={<GovernmentSchemes />} />
          <Route path="/loans" element={<AgriLoans currentUser={currentUser} />} />
          <Route path="/match" element={<SmartMatch currentUser={currentUser} selectedState={selectedState} />} />
          <Route path="/logistics" element={<LogisticsStorage currentUser={currentUser} selectedState={selectedState} />} />
          <Route path="/orders" element={<OrdersEscrow currentUser={currentUser} />} />
          <Route path="/grievance" element={<GrievanceDesk currentUser={currentUser} />} />
          <Route path="/buyer" element={<BuyerPanel currentUser={currentUser} />} />
          <Route path="/fpo" element={<FpoPanel currentUser={currentUser} />} />
          <Route path="/admin" element={<AdminPanel currentUser={currentUser} />} />
          <Route path="*" element={<FarmerHomeHub currentUser={currentUser} selectedState={selectedState} />} />
        </Routes>
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
        <div>{t('footer_text', '🌾 KrishiLink — Market Linkages & Price Discovery Platform')}</div>
      </footer>
    </div>
  );
}
