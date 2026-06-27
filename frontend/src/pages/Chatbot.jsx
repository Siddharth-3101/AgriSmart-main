import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Chatbot({
  chatLanguage,
  setChatLanguage,
  chatMessages,
  chatInput,
  setChatInput,
  handleChatSend
}) {
  return (
    <div className="glass-card" style={{ height: '580px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f4faf6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
          <div style={{ background: '#e2f3e9', padding: '6px', borderRadius: '8px' }}>
            <MessageSquare size={20} color="var(--primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>AgriSmart Bot</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>AI Agronomist Assistant</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Language:</span>
          <select value={chatLanguage} onChange={e => setChatLanguage(e.target.value)} style={{ width: '130px', padding: '6px 10px', background: '#ffffff', border: '1px solid #cbdcd0', borderRadius: '4px' }}>
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="pun">ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>
      </div>

      <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
        {chatMessages.map((msg, index) => (
          <div 
            key={index} 
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              animation: 'fadeIn 0.25s ease'
            }}
          >
            <div 
              style={{
                maxWidth: '70%',
                background: msg.sender === 'user' ? 'var(--primary)' : '#f4faf6',
                color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                border: msg.sender === 'user' ? 'none' : '1px solid #cbdcd0',
                textAlign: 'left'
              }}
            >
              <p style={{ fontSize: '14.5px', lineHeight: '1.5', margin: 0 }}>{msg.text}</p>
              <span style={{ display: 'block', fontSize: '9px', marginTop: '6px', opacity: 0.7, textAlign: 'right' }}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleChatSend} style={{ padding: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px', background: '#f4faf6' }}>
        <input 
          type="text" 
          placeholder="Ask about fertilizer doses, soil health, weather, disease treatments..." 
          value={chatInput} 
          onChange={e => setChatInput(e.target.value)}
          style={{ background: '#ffffff', border: '1px solid #cbdcd0', flexGrow: 1, padding: '10px 14px', borderRadius: '6px', outline: 'none' }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '0 24px' }}>
          Send
        </button>
      </form>
    </div>
  );
}
