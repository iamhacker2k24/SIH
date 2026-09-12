import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, Sprout, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function AiAssistant({ selectedLanguage, selectedState }) {
  const { language: ctxLang, t } = useLanguage();
  const currentLanguage = selectedLanguage || ctxLang;

  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: t('ai_greeting', 'Namaste! I am your KrishiAI Market Advisor powered by Gemini 1.5. Ask me anything about current Mandi trends, optimal holding periods, grade specifications, or storage strategies across Indian states.')
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'bot') {
        return [{
          sender: 'bot',
          text: t('ai_greeting', 'Namaste! I am your KrishiAI Market Advisor powered by Gemini 1.5. Ask me anything about current Mandi trends, optimal holding periods, grade specifications, or storage strategies across Indian states.')
        }];
      }
      return prev;
    });
  }, [currentLanguage]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await api.getAiAdvisory({
        prompt: userText,
        state: selectedState,
        language: currentLanguage
      });

      if (res.success) {
        setMessages(prev => [...prev, { sender: 'bot', text: res.advisory, source: res.source }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Apologies, unable to retrieve AI response. Please try again.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to KrishiAI server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #092015 0%, #153e2d 100%)',
        border: '1px solid var(--border-glow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)'
          }}>
            <Bot size={26} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>{t('ai_copilot', 'KrishiAI Assistant & Price Advisor')}</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Gemini 1.5 Flash AI • Language: <strong>{currentLanguage}</strong> • Region: <strong>{selectedState || t('nav_all_india', 'All India')}</strong>
            </div>
          </div>
        </div>

        <div className="badge badge-green">
          <Sparkles size={12} /> Gemini AI Connected
        </div>
      </div>

      {/* Chat Messages */}
      <div className="glass-card" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '450px', paddingRight: '0.25rem' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                color: msg.sender === 'user' ? '#fff' : '#f0fdf4',
                padding: '0.9rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                whiteSpace: 'pre-line'
              }}
            >
              {msg.sender === 'bot' && (
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sprout size={14} /> KrishiAI {msg.source ? `(${msg.source})` : ''}
                </div>
              )}
              <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{msg.text}</div>
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={16} className="animate-spin" /> KrishiAI is analyzing mandi arrival trends...
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder={t('ai_placeholder_detailed', `Ask KrishiAI in ${currentLanguage} (e.g. Should I sell Onion now in Nashik Mandi?)`)}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            <Send size={16} /> Ask AI
          </button>
        </form>
      </div>
    </div>
  );
}
