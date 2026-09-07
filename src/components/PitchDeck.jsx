import React, { useState } from 'react';
import {
  BookOpen, FileText, Target, Cpu, Server, Database, Cloud,
  Shield, ChevronRight, ChevronDown, ExternalLink, Activity,
  LineChart, AlertTriangle, CheckCircle, Layers, Workflow
} from 'lucide-react';

const SLIDES = [
  {
    title: 'The Problem',
    subtitle: 'The Closest-Hospital Trap',
    color: 'var(--red-500)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          background: 'var(--red-100)', border: '1px solid #fca5a5',
          borderRadius: 'var(--radius-md)', padding: '16px'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--red-600)', fontFamily: 'var(--font-mono)' }}>68%</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--red-600)', fontWeight: 600 }}>of public tertiary ER admissions are secondary transfers</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--gray-500)', marginTop: '4px' }}>
            Source: Mehmood et al., "Assessment of pre-hospital emergency medical services in low-income settings", BMC Emergency Medicine, 2014
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div className="card" style={{ padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-700)', fontFamily: 'var(--font-mono)' }}>142</div>
            <div style={{ fontSize: '0.73rem', color: 'var(--gray-500)' }}>NEDOCS Score at PIMS ER (Overcrowded)</div>
          </div>
          <div className="card" style={{ padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-700)', fontFamily: 'var(--font-mono)' }}>35min</div>
            <div style={{ fontSize: '0.73rem', color: 'var(--gray-500)' }}>Avg offload delay at saturated ERs</div>
          </div>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
          Traditional navigation routes to the <strong>nearest</strong> hospital. In Pakistan's overcrowded ER ecosystem, 
          the nearest facility frequently diverts patients — adding 20-40 minutes of fatal delay.
        </div>
      </div>
    )
  },
  {
    title: 'Our Solution',
    subtitle: 'Total Time to Definitive Care (TTDC)',
    color: 'var(--green-600)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <pre className="code-block">
{`TTDC = T_transit + T_offload + P_capacity

Where:
  T_transit  = ETA via real-time traffic routing
  T_offload  = ED queue delay (NEDOCS-derived)
  P_capacity = ∞  if mandatory resources absent
             = 0  if resources confirmed available`}
        </pre>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { icon: Activity, label: 'Real-Time Traffic', desc: 'Google/TPL Maps API' },
            { icon: Database, label: 'Hospital Capacity', desc: 'Live ER telemetry' },
            { icon: Shield, label: 'Resource Match', desc: 'Equipment + Staff' }
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '12px', textAlign: 'center' }}>
              <item.icon size={20} color="var(--green-600)" style={{ margin: '0 auto 6px' }} />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-800)' }}>{item.label}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--gray-500)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
          SehatRoute finds the hospital that can <strong>treat the patient fastest</strong> — not simply the one that is closest.
          Ambulances are routed to facilities with confirmed capability and available capacity.
        </div>
      </div>
    )
  },
  {
    title: 'Architecture',
    subtitle: 'Alibaba Cloud Native Stack',
    color: 'var(--navy-700)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { layer: 'Edge', icon: Cloud, items: ['API Gateway 2.0', 'SLB (Load Balancer)', 'WAF 3.0'], color: '#6ba3d6' },
          { layer: 'AI Tier', icon: Cpu, items: ['Qwen-2.5-72B via PAI-EAS', 'Bailian Prompt Flow', 'NLP Triage Pipeline'], color: '#00897B' },
          { layer: 'Compute', icon: Server, items: ['Function Compute 3.0', 'OSRM on ECS', 'Event Bridge'], color: '#f59e0b' },
          { layer: 'State', icon: Database, items: ['Tair (Redis) — capacity cache', 'PolarDB PostGIS', 'OSS Logs'], color: '#ef4444' }
        ].map((tier, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px', borderRadius: 'var(--radius-md)',
            background: 'var(--gray-50)', border: '1px solid var(--gray-200)'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: tier.color + '18',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <tier.icon size={18} color={tier.color} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-800)' }}>{tier.layer}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray-500)' }}>{tier.items.join(' · ')}</div>
            </div>
          </div>
        ))}

        {/* State Machine Workflow Diagram */}
        <div style={{
          marginTop: '4px',
          padding: '10px 14px',
          background: 'var(--navy-900)',
          borderRadius: 'var(--radius-md)',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          lineHeight: 1.4,
          overflowX: 'auto'
        }}>
          <div style={{ color: 'var(--green-400)', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-sans)', fontSize: '0.74rem' }}>
            OPERATIONAL ARCHITECTURE: CAPACITY LEASE & PRE-ARRIVAL
          </div>
{`             HOSPITAL (Publishes Available Capacity)
                        │
                        ▼
             SehatRoute State Layer (PolarDB + Redis)
                        │
                 ┌──────┴───────┐
                 │              │
              Public         Verified
               User          Ambulance (Alkhidmat 1023)
                 │              │
            Recommendation      ▼
                 Only    Patient Analyzed (NLP Triage)
                                │
                                ▼
                          TTDC Ranking
                                │
                                ▼
                     Atomic Capacity Lease (Redis TTL)
                                │
                         ┌──────┴──────┐
                         │             │
                      SUCCESS        FAILURE (Contention)
                         │             │
                     Route Now      Try Next Hospital
                         │
                         ▼
                 Pre-Arrival Alert
                         │
                         ▼
                   Hospital Prepares`}
        </div>
      </div>
    )
  },
  {
    title: 'Clinical Evidence',
    subtitle: 'Peer-Reviewed Foundations',
    color: 'var(--navy-600)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { citation: 'Mehmood et al., 2014', journal: 'BMC Emergency Medicine', finding: 'Documented EMS fragmentation in Pakistan; 68% secondary transfers.' },
          { citation: 'McCarthy et al., 2009', journal: 'Academic Emergency Medicine', finding: 'Validated NEDOCS as ER congestion metric. Score >100 = "Overcrowded".' },
          { citation: 'Baqir et al., 2014', journal: 'J Pak Med Assoc', finding: 'PEMH Rawalpindi ER congestion study confirming capacity-driven delays.' },
          { citation: 'Newgard et al., 2011', journal: 'Annals of Emergency Medicine', finding: 'Every 10-min reduction in definitive care time → measurable mortality decrease.' },
          { citation: 'Zia et al., 2015', journal: 'BMC Health Services Research', finding: 'Rural-urban trauma care disparity analysis for Sindh and Punjab.' }
        ].map((ref, i) => (
          <div key={i} style={{
            padding: '10px 14px', borderRadius: 'var(--radius-sm)',
            background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
            fontSize: '0.78rem'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--navy-800)' }}>{ref.citation}</div>
            <div style={{ color: 'var(--gray-400)', fontSize: '0.7rem', fontStyle: 'italic' }}>{ref.journal}</div>
            <div style={{ color: 'var(--gray-600)', marginTop: '3px' }}>{ref.finding}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    title: 'Impact',
    subtitle: 'Projected Outcomes',
    color: 'var(--green-700)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { metric: '12-18 min', label: 'Avg TTDC reduction', icon: '⏱️' },
            { metric: '40%↓', label: 'Secondary transfers eliminated', icon: '🏥' },
            { metric: '310 Fleet', label: 'Alkhidmat 1023 Ambulances (56 Hospitals)', icon: '🚑' },
            { metric: '< 200ms', label: 'Decision latency (P95)', icon: '⚡' }
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-600)', fontFamily: 'var(--font-mono)' }}>
                {item.metric}
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--gray-500)', marginTop: '2px' }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{
          background: 'var(--green-100)', border: '1px solid var(--green-300)',
          borderRadius: 'var(--radius-md)', padding: '14px',
          fontSize: '0.82rem', color: 'var(--green-700)', fontWeight: 600, textAlign: 'center'
        }}>
          "Route to the hospital that can treat — not just the hospital that is near."
        </div>
      </div>
    )
  }
];

export default function PitchDeck() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div style={{
      maxWidth: '820px',
      margin: '30px auto',
      padding: '0 20px'
    }}>
      {/* Slide Nav */}
      <div style={{
        display: 'flex', gap: '4px', marginBottom: '20px',
        overflowX: 'auto', padding: '2px'
      }}>
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: activeSlide === i ? s.color : 'var(--gray-200)',
              background: activeSlide === i ? s.color : 'var(--white)',
              color: activeSlide === i ? '#fff' : 'var(--gray-600)',
              fontSize: '0.78rem',
              fontWeight: activeSlide === i ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Active Slide */}
      <div className="card animate-fade-in" key={activeSlide} style={{ padding: '28px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, color: SLIDES[activeSlide].color,
            letterSpacing: '0.05em', marginBottom: '4px'
          }}>
            {String(activeSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>
          <h2 style={{
            fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-800)',
            marginBottom: '4px', lineHeight: 1.2
          }}>
            {SLIDES[activeSlide].title}
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
            {SLIDES[activeSlide].subtitle}
          </div>
        </div>
        {SLIDES[activeSlide].content}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: '16px'
      }}>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
          disabled={activeSlide === 0}
          style={{ opacity: activeSlide === 0 ? 0.4 : 1 }}
        >
          ← Previous
        </button>
        <button
          className="btn btn-navy btn-sm"
          onClick={() => setActiveSlide(Math.min(SLIDES.length - 1, activeSlide + 1))}
          disabled={activeSlide === SLIDES.length - 1}
          style={{ opacity: activeSlide === SLIDES.length - 1 ? 0.4 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
