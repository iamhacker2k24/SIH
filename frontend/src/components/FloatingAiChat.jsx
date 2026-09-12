import React, { useState, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Sprout, RefreshCw, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingAiChat({ selectedLanguage, selectedState }) {
  const { language: ctxLang, t } = useLanguage();
  const currentLanguage = selectedLanguage || ctxLang;

  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: t('ai_greeting', 'Namaste! I am KrishiAI powered by Gemini 1.5. How can I assist your crop sales or mandi price strategy today?')
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Update initial greeting if language changes and only initial message is present
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'bot') {
        return [{
          sender: 'bot',
          text: t('ai_greeting', 'Namaste! I am KrishiAI powered by Gemini 1.5. How can I assist your crop sales or mandi price strategy today?')
        }];
      }
      return prev;
    });
  }, [currentLanguage]);

  const quickPrompts = [
    'Optimal Wheat sale window?',
    'Azadpur Paddy Mandi trends',
    'WDRA Warehouse storage tips'
  ];

  const handleSend = async (e, customText = null) => {
    if (e) e.preventDefault();
    const query = customText || prompt;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    if (!customText) setPrompt('');
    setLoading(true);

    try {
      const res = await api.getAiAdvisory({
        prompt: query,
        state: selectedState,
        language: currentLanguage
      });

      if (res.success) {
        setMessages(prev => [...prev, { sender: 'bot', text: res.advisory, source: res.source }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Apologies, unable to fetch AI response right now.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to KrishiAI backend.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Floating Chat Box */}
      {isOpen && (
        <div style={{
          width: '380px',
          maxWidth: '90vw',
          height: '520px',
          maxHeight: '80vh',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginBottom: '12px',
          animation: 'modalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #092015 0%, #153e2d 100%)',
            padding: '0.85rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.60rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)'
              }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {t('ai_title', 'KrishiAI Assistant')}
                  <span className="badge badge-green" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>Gemini</span>
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Lang: {currentLanguage} • Region: {selectedState || t('nav_all_india', 'All India')}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.04)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  color: msg.sender === 'user' ? '#fff' : '#f0fdf4',
                  padding: '0.75rem 0.95rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.825rem',
                  lineHeight: '1.45',
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.sender === 'bot' && (
                  <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Sprout size={12} /> KrishiAI
                  </div>
                )}
                {msg.text}
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.775rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <RefreshCw size={14} className="animate-spin" /> KrishiAI is thinking...
              </div>
            )}
          </div>

          {/* Quick Prompts Pills */}
          <div style={{ padding: '0.4rem 0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.35rem', overflowX: 'auto' }} className="horizontal-scroll-container">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(null, qp)}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-full)',
                  color: '#34d399',
                  fontSize: '0.675rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.65rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} style={{ padding: '0.65rem 0.85rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', background: '#07120d' }}>
            <input
              type="text"
              className="form-input"
              placeholder={t('ai_placeholder', `Ask in ${currentLanguage}...`)}
              style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 0.85rem' }} disabled={loading}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.5)',
          transition: 'all 0.25s ease',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
        aria-label="KrishiAI Assistant Chat"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
      </button>
    </div>
  );
}
