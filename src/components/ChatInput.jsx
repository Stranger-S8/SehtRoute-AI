import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  CornerDownLeft
} from 'lucide-react';

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
