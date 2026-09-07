import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  Stethoscope, 
  HeartPulse, 
  AlertTriangle, 
  Activity, 
  Wind, 
  Baby, 
  Flame,
  CornerDownLeft
} from 'lucide-react';

const CLINICAL_PRESETS = [
  { label: 'STEMI / Cardiac', icon: HeartPulse, text: 'Severe chest pain radiating to left arm, diaphoresis, age 55 male. Suspected STEMI.' },
  { label: 'Major Trauma', icon: AlertTriangle, text: 'Road traffic accident. Multiple fractures, significant blood loss, declining consciousness.' },
  { label: 'Acute Stroke', icon: Activity, text: 'Sudden facial droop right side, slurred speech, cannot lift right arm. Onset 20 minutes ago.' },
  { label: 'Respiratory Failure', icon: Wind, text: 'SpO2 dropping to 82%, severe dyspnea, patient cyanotic, COPD history. Needs ventilator.' },
  { label: 'Pediatric Critical', icon: Baby, text: 'Infant 8 months, high fever 104°F, seizures, not responsive to stimulation.' },
  { label: 'Severe Burns', icon: Flame, text: 'Kitchen gas explosion, 40% body surface area burns, patient conscious in severe pain.' },
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

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-medium)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)',
      transition: 'border-color 0.2s'
    }}>
      {/* Console Bar Header */}
      <div style={{
        background: mode === 'citizen' ? 'rgba(16, 38, 63, 0.7)' : 'rgba(0, 137, 123, 0.25)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {mode === 'citizen' ? (
            <User size={14} color="var(--cyan-400)" />
          ) : (
            <Stethoscope size={14} color="var(--green-400)" />
          )}
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: mode === 'citizen' ? 'var(--cyan-300)' : 'var(--green-300)'
          }}>
            {mode === 'citizen' ? 'Citizen Tele-Report Channel' : 'Paramedic 1122 CAD Channel'}
          </span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)'
        }}>
          <span>URDU / ROMAN / EN</span>
          <span>•</span>
          <span style={{ color: 'var(--green-400)' }}>ONLINE</span>
        </div>
      </div>

      {/* Paramedic Fast Presets */}
      {mode === 'paramedic' && (
        <div style={{
          padding: '10px 14px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px'
        }}>
          {CLINICAL_PRESETS.map((p, i) => {
            const Icon = p.icon;
            return (
              <button
                key={i}
                onClick={() => onSubmit(p.text)}
                disabled={isProcessing}
                style={{
                  padding: '5px 10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.15s ease',
                  opacity: isProcessing ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'var(--cyan-400)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Icon size={12} color="var(--green-400)" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Intake Textarea & Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '14px 16px',
        background: 'var(--bg-input)'
      }}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe symptoms, patient vitals, or emergency scene..."
          disabled={isProcessing}
          rows={1}
          style={{
            flex: 1,
            resize: 'none',
            border: 'none',
            padding: '4px 0',
            fontSize: '0.92rem',
            fontFamily: 'var(--font-sans)',
            color: '#fff',
            background: 'transparent',
            outline: 'none',
            lineHeight: 1.5
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span style={{
            fontSize: '0.66rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            padding: '4px 6px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '4px',
            border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', gap: '3px'
          }}>
            <span>Enter</span>
            <CornerDownLeft size={10} />
          </span>

          <button
            onClick={handleSubmit}
            disabled={!message.trim() || isProcessing}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              background: message.trim() ? 'var(--green-600)' : 'rgba(255,255,255,0.08)',
              color: message.trim() ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: message.trim() && !isProcessing ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              transition: 'all 0.15s ease',
              boxShadow: message.trim() ? 'var(--shadow-glow)' : 'none'
            }}
          >
            {isProcessing ? (
              <div style={{
                width: '14px', height: '14px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite'
              }} />
            ) : (
              <>
                <span>Dispatch</span>
                <Send size={13} />
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
