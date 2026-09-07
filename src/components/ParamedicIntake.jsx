import React, { useState, useEffect } from 'react';
import { CLINICAL_SCENARIOS } from '../data/clinicalScenarios';
import { Radio, Sparkles, CheckCircle2, AlertTriangle, Clock, Activity, Send, Terminal } from 'lucide-react';

export default function ParamedicIntake({ 
  activeScenario, 
  setActiveScenario, 
  customText, 
  setCustomText,
  isParsing,
  onTriggerParse,
  parsingLatency,
  extractedData
}) {
  const [typedTranscript, setTypedTranscript] = useState(activeScenario.voiceTranscript);
  const [streamProgress, setStreamProgress] = useState(100);

  useEffect(() => {
    setTypedTranscript(activeScenario.voiceTranscript);
  }, [activeScenario]);

  return (
    <div className="glass-panel" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            background: 'rgba(6, 182, 212, 0.15)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid rgba(6, 182, 212, 0.4)'
          }}>
            <Radio size={18} color="#06b6d4" />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              Step 1: Paramedic Intake UI
            </h2>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              Alkhidmat 1023 Mobile Terminal • Field Clinical Telemetry
            </p>
          </div>
        </div>
        <span className="badge badge-alkhidmat">Unit ALK-1023</span>
      </div>

      {/* Preset Emergency Scenarios */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
            Select Emergency Scenario
          </label>
          <span style={{ fontSize: '0.72rem', color: '#06b6d4' }}>High-Acuity ESI Tiers</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {CLINICAL_SCENARIOS.map((sc) => {
            const isSelected = activeScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenario(sc);
                  onTriggerParse(sc);
                }}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: isSelected ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isSelected ? '#38bdf8' : '#e2e8f0' }}>
                    {sc.category}
                  </span>
                  <span className="badge badge-crimson" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>ESI 1</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.25, marginBottom: '4px' }}>
                  {sc.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  {sc.patient}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Paramedic Voice & Vitals Input Box */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
            Inbound 1023 Voice / Radio Transcript
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={13} color="#10b981" />
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>Vitals Linked</span>
          </div>
        </div>

        <div style={{
          position: 'relative',
          background: 'rgba(5, 8, 17, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '12px'
        }}>
          <textarea
            value={typedTranscript}
            onChange={(e) => setTypedTranscript(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              lineHeight: 1.45,
              resize: 'none',
              outline: 'none'
            }}
          />

          {/* Real-Time Patient Vitals Ticker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>BP: <strong style={{ color: '#f87171' }}>{activeScenario.vitalSigns.bp}</strong></span>
            <span style={{ color: 'var(--text-muted)' }}>HR: <strong style={{ color: '#fbbf24' }}>{activeScenario.vitalSigns.hr}</strong></span>
            <span style={{ color: 'var(--text-muted)' }}>SpO2: <strong style={{ color: '#38bdf8' }}>{activeScenario.vitalSigns.spo2}</strong></span>
            <span style={{ color: 'var(--text-muted)' }}>GCS: <strong style={{ color: '#f87171' }}>{activeScenario.vitalSigns.gcs}</strong></span>
          </div>
        </div>

        <button
          className="btn btn-alibaba"
          onClick={() => onTriggerParse(activeScenario)}
          disabled={isParsing}
          style={{ width: '100%', padding: '10px', fontSize: '0.84rem' }}
        >
          <Sparkles size={16} />
          <span>{isParsing ? 'Invoking Alibaba Cloud Bailian (Qwen-2.5)...' : 'Reparse via Bailian Qwen-2.5 Model Studio'}</span>
        </button>
      </div>

      {/* Bailian Qwen-2.5 Extraction Output */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Terminal size={14} color="#ff8a3d" />
            <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ff8a3d' }}>
              Qwen-2.5-72B Structured Clinical Output
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-alibaba" style={{ fontSize: '0.66rem' }}>
              Bailian Latency: {parsingLatency}ms
            </span>
          </div>
        </div>

        <div style={{
          background: '#040711',
          border: '1px solid rgba(255, 106, 0, 0.25)',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '0.76rem',
          fontFamily: 'var(--font-mono)',
          color: '#38bdf8',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {isParsing ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0', gap: '10px' }}>
              <div className="pulse-animation" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff6a00' }} />
              <span style={{ color: '#ff8a3d' }}>Token streaming from Alibaba Cloud Bailian endpoint...</span>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '8px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px 8px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>ESI TRIAGE LEVEL</div>
                  <div style={{ color: '#f87171', fontWeight: 800, fontSize: '0.9rem' }}>LEVEL {extractedData.esi_tier} (RESUSCITATION)</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px 8px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>CRITICAL TIME WINDOW</div>
                  <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.9rem' }}>{extractedData.critical_window_mins} MINUTES</div>
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8' }}>specialty_required: </span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>"{extractedData.specialty_required}"</span>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8' }}>required_resources: </span>
                <span style={{ color: '#e2e8f0' }}>[{extractedData.required_resources.map(r => `"${r}"`).join(', ')}]</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div>
                  <span style={{ color: '#94a3b8' }}>requires_ventilator: </span>
                  <span style={{ color: extractedData.requires_ventilator ? '#f87171' : '#10b981', fontWeight: 700 }}>
                    {extractedData.requires_ventilator ? 'TRUE' : 'FALSE'}
                  </span>
                </div>
                <div>
                  <span style={{ color: '#94a3b8' }}>hemodynamic_state: </span>
                  <span style={{ color: '#fbbf24', fontWeight: 700 }}>"{extractedData.hemodynamic_stability}"</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                borderLeft: '3px solid #ef4444',
                padding: '8px 10px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                color: '#fca5a5',
                marginTop: '6px'
              }}>
                <strong style={{ color: '#ffffff' }}>Clinical Rule Engine: </strong>
                {extractedData.clinical_rationale}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
