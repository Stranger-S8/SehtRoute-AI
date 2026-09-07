import React, { useState } from 'react';
import { Key, X, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey }) {
  const envKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) 
    ? import.meta.env.VITE_GEMINI_API_KEY.trim() 
    : '';
  const [inputKey, setInputKey] = useState(apiKey || envKey || '');
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputKey.trim());
    onClose();
  };

  const handleClear = () => {
    setInputKey('');
    onSaveKey('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(7, 25, 43, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      animation: 'fade-in 0.2s ease'
    }}>
      <div className="card" style={{
        width: '440px', maxWidth: '92vw',
        padding: '28px',
        animation: 'slide-up 0.3s ease'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'var(--navy-100)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Key size={18} color="var(--navy-700)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-800)' }}>Gemini API Key</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray-500)' }}>Required for AI-powered clinical triage</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--gray-400)', padding: '4px'
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Env Key Status */}
        {envKey ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 12px', background: 'var(--green-50)', border: '1px solid var(--green-200)',
            borderRadius: 'var(--radius-md)', color: 'var(--green-800)', fontSize: '0.75rem', marginBottom: '14px'
          }}>
            <ShieldCheck size={16} color="var(--green-600)" />
            <div>
              <span style={{ fontWeight: 700 }}>Configured in .env: </span>
              <code style={{ fontFamily: 'var(--font-mono)' }}>{envKey.slice(0, 6)}••••••••{envKey.slice(-4)}</code>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 12px', background: 'var(--navy-50)', border: '1px solid var(--navy-200)',
            borderRadius: 'var(--radius-md)', color: 'var(--navy-800)', fontSize: '0.74rem', marginBottom: '14px'
          }}>
            <ShieldCheck size={15} color="var(--navy-600)" />
            <span>Paste your key below or add <code style={{ fontFamily: 'var(--font-mono)' }}>VITE_GEMINI_API_KEY=...</code> into the <code style={{ fontFamily: 'var(--font-mono)' }}>.env</code> file.</span>
          </div>
        )}

        {/* Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block', fontSize: '0.78rem', fontWeight: 600,
            color: 'var(--gray-600)', marginBottom: '6px'
          }}>
            API Key
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIza..."
              style={{
                width: '100%',
                padding: '10px 14px',
                paddingRight: '60px',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--navy-800)',
                background: 'var(--gray-50)',
                outline: 'none',
                transition: 'border-color 0.15s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--navy-400)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.72rem', color: 'var(--navy-400)', fontFamily: 'var(--font-sans)'
              }}
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Help Link */}
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '0.74rem', color: 'var(--navy-400)',
            textDecoration: 'none', marginBottom: '20px'
          }}
        >
          <ExternalLink size={12} />
          Get a free API key from Google AI Studio
        </a>

        {/* Rate Limit Note */}
        <div className="alert-banner alert-banner-amber" style={{ marginBottom: '16px', fontSize: '0.74rem' }}>
          <AlertCircle size={14} />
          <span>If rate-limited (429), the system automatically falls back to a deterministic rule engine.</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-navy" onClick={handleSave} style={{ flex: 1, justifyContent: 'center' }}>
            Save Key
          </button>
          {apiKey && (
            <button className="btn btn-outline" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
