import React, { useState } from 'react';
import { ALIBABA_CLOUD_SERVICES } from '../data/alibabaCloudServices';
import { Cpu, Server, Database, Radio, Send, ShieldCheck, Terminal, Layers, ArrowRight, DollarSign } from 'lucide-react';

export default function AlibabaCloudArchitecture() {
  const [selectedService, setSelectedService] = useState(ALIBABA_CLOUD_SERVICES[1]); // Default Bailian Qwen-2.5

  const architectureFlow = [
    { step: 1, name: "Alkhidmat 1023 Telemetry", svc: "API Gateway", desc: "Edge Ingestion & Auth" },
    { step: 2, name: "Clinical Extraction", svc: "Model Studio (Bailian)", desc: "Qwen-2.5 NLP Parser" },
    { step: 3, name: "TTDC Multi-Factor Calc", svc: "Function Compute 3.0", desc: "<200ms Decision Core" },
    { step: 4, name: "Geospatial Catchment", svc: "RDS PostgreSQL + PostGIS", desc: "20km Spatial Index" },
    { step: 5, name: "Capacity Lock Cache", svc: "ApsaraDB for Redis", desc: "Microsecond Tokens" },
    { step: 6, name: "Pre-Arrival Notice", svc: "DirectMail / SMS", desc: "Hospital Triage Alert" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Title & Blueprint Overview */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6a00 0%, #d65500 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255, 106, 0, 0.4)'
            }}>
              <Cpu size={22} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                Alibaba Cloud Architectural Blueprint
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Production-Grade Serverless, AI, Spatial & In-Memory Infrastructure
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <span className="badge badge-alibaba">Global Cloud Precision</span>
            <span className="badge badge-cyan">Sub-200ms End-to-End</span>
          </div>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          background: 'rgba(5, 8, 17, 0.7)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {architectureFlow.map((node, i) => (
            <div
              key={node.step}
              onClick={() => {
                const found = ALIBABA_CLOUD_SERVICES.find(s => s.tier.toLowerCase().includes(node.svc.toLowerCase()) || s.service.toLowerCase().includes(node.svc.toLowerCase()));
                if (found) setSelectedService(found);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: selectedService.service.includes(node.svc.split(' ')[0]) ? '1px solid #ff6a00' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: '#ff8a3d', fontWeight: 700 }}>
                  STEP 0{node.step}
                </span>
                {i < architectureFlow.length - 1 && (
                  <ArrowRight size={12} color="#64748b" />
                )}
              </div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                {node.svc}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                {node.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Grid: Service Inspector & Live Telemetry Payload */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '20px' }}>
        {/* Service Details Card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="badge badge-alibaba">{selectedService.tier}</span>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
              Alibaba Cloud Native
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              {selectedService.service}
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {selectedService.role}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Architectural Capabilities
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedService.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: '#e2e8f0' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6a00', marginTop: '6px', flexShrink: 0 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Real Telemetry Benchmarks */}
          <div style={{
            background: 'rgba(255, 106, 0, 0.06)',
            border: '1px solid rgba(255, 106, 0, 0.2)',
            borderRadius: '10px',
            padding: '14px',
            marginTop: 'auto'
          }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ff8a3d', fontWeight: 700, marginBottom: '8px' }}>
              Observed Telemetry Metrics
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontFamily: 'var(--font-mono)' }}>
              {Object.entries(selectedService.telemetryMetrics).map(([key, val]) => (
                <div key={key}>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{key}</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffffff' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Payload Inspector */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} color="#38bdf8" />
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>
                Wire Format Telemetry Inspector
              </span>
            </div>
            <span className="badge badge-cyan">JSON Protocol</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <pre className="code-block" style={{ height: '340px', fontSize: '0.76rem' }}>
              {JSON.stringify(selectedService.samplePayload, null, 2)}
            </pre>
          </div>

          {/* Cost Analysis / Bill of Materials */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DollarSign size={18} color="#10b981" />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
                  Cloud Economic Viability (Bill of Materials)
                </div>
                <div style={{ fontSize: '0.7rem', color: '#a7f3d0' }}>
                  Serverless FC 3.0 + Bailian pay-per-token model
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>
                $0.00042
              </div>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>per emergency dispatch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
