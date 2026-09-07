import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Stethoscope } from 'lucide-react';

// Paramedic quick-select clinical scenarios
const PARAMEDIC_PRESETS = [
  { label: 'Chest Pain (STEMI)', icon: '❤️‍🔥', text: 'Severe chest pain radiating to left arm, diaphoresis, age 55 male. Suspected STEMI.' },
  { label: 'Major Trauma', icon: '🚗', text: 'Road traffic accident. Multiple fractures, significant blood loss, consciousness declining.' },
  { label: 'Stroke (CVA)', icon: '🧠', text: 'Sudden facial droop right side, slurred speech, cannot lift right arm. Onset 20 minutes ago.' },
  { label: 'Breathing Distress', icon: '🫁', text: 'SpO2 dropping to 82%, severe dyspnea, patient cyanotic, COPD history. Needs ventilator.' },
  { label: 'Pediatric High Fever', icon: '👶', text: 'Infant 8 months, high fever 104°F, seizures, not responsive to stimulation.' },
  { label: 'Severe Burns', icon: '🔥', text: 'Kitchen gas explosion, 40% body surface area burns, patient conscious but in severe pain.' },
];

export default function ChatInput({ mode, onSubmit, isProcessing }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = () => {
    if (!message.trim() || isProcessing) return;
    onSubmit(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePreset = (text) => {
    onSubmit(text);
  };

  return (
    <div className="card animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
      {/* Mode Label */}
      <div style={{
        background: mode === 'citizen' ? 'var(--navy-800)' : 'var(--green-600)',
        padding: '8px 16px',
        display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        {mode === 'citizen' ? <User size={14} color="#fff" /> : <Stethoscope size={14} color="#fff" />}
        <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.02em' }}>
          {mode === 'citizen' ? 'Citizen Intake' : 'Paramedic 1122 Intake'}
        </span>
      </div>

      {/* Paramedic Quick-Select */}
      {mode === 'paramedic' && (
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--gray-200)', background: 'var(--navy-50)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {PARAMEDIC_PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => handlePreset(p.text)}
                disabled={isProcessing}
                style={{
                  padding: '5px 10px',
                  background: 'var(--white)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-full)',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: 'var(--navy-800)',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.15s ease',
                  opacity: isProcessing ? 0.5 : 1
                }}
                onMouseEnter={(e) => { if (!isProcessing) { e.target.style.background = 'var(--navy-100)'; }}}
                onMouseLeave={(e) => { e.target.style.background = 'var(--white)'; }}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: '10px',
        padding: '12px 16px'
      }}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe emergency in Urdu, Roman Urdu, or English..."
          disabled={isProcessing}
          rows={1}
          style={{
            flex: 1,
            resize: 'none',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '0.88rem',
            fontFamily: 'var(--font-sans)',
            color: 'var(--navy-800)',
            background: 'var(--gray-50)',
            outline: 'none',
            transition: 'border-color 0.15s',
            lineHeight: 1.5
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--navy-400)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
        />
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || isProcessing}
          style={{
            width: '42px', height: '42px',
            borderRadius: 'var(--radius-md)',
            background: message.trim() ? 'var(--green-600)' : 'var(--gray-200)',
            border: 'none',
            cursor: message.trim() && !isProcessing ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
            flexShrink: 0
          }}
        >
          {isProcessing ? (
            <div style={{
              width: '18px', height: '18px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite'
            }} />
          ) : (
            <Send size={18} color={message.trim() ? '#fff' : 'var(--gray-400)'} />
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
