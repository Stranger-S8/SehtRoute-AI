import React, { useState, useEffect } from 'react';
import { ShieldCheck, Bell, Clock, Lock, CheckCircle2, PhoneCall, Mail, UserCheck, AlertCircle, FileText } from 'lucide-react';

export default function HospitalTriageHandshake({ 
  activeScenario, 
  hospital, 
  isSimulating, 
  simProgress 
}) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [redisTtl, setRedisTtl] = useState(1785); // 29m 45s

  useEffect(() => {
    const interval = setInterval(() => {
      setRedisTtl(prev => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTtl = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const etaRemainingMins = Math.max(1, Math.round((1 - simProgress) * 14));

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(16, 185, 129, 0.4)'
          }}>
            <ShieldCheck size={18} color="#10b981" />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              Step 3: Pre-Arrival Handshake Confirmation
            </h3>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              Receiving ER Charge Nurse Terminal • {hospital.name}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-emerald">Redis Bed Lock Active</span>
          <span className="badge badge-alibaba">SMS Dispatched</span>
        </div>
      </div>

      {/* Main Alert Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="pulse-animation" style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={16} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
                PRIORITY 1 INBOUND PATIENT DETECTED
              </div>
              <div style={{ fontSize: '0.72rem', color: '#a7f3d0' }}>
                Alkhidmat Unit ALK-1023 • Auto-Dispatched via SehatRoute AI
              </div>
            </div>
          </div>

          {/* Dynamic ETA Countdown */}
          <div style={{
            background: 'rgba(7, 10, 18, 0.8)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '8px',
            padding: '6px 12px',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>ESTIMATED TIME TO INTAKE</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
              {etaRemainingMins} MINS
            </div>
          </div>
        </div>

        {/* Patient Clinical Summary Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          background: 'rgba(5, 8, 17, 0.85)',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '0.76rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>PATIENT:</span>
            <div style={{ color: '#ffffff', fontWeight: 700 }}>{activeScenario.patient}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>DIAGNOSIS:</span>
            <div style={{ color: '#f87171', fontWeight: 700 }}>{activeScenario.title}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>TARGET FACILITY:</span>
            <div style={{ color: '#38bdf8', fontWeight: 700 }}>{hospital.shortName}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>RESERVED RESOURCE:</span>
            <div style={{ color: '#10b981', fontWeight: 700 }}>
              {activeScenario.bailianExtraction.required_resources[0].toUpperCase().replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* Redis Distributed Lock Details */}
        <div style={{
          background: 'rgba(255, 106, 0, 0.08)',
          border: '1px solid rgba(255, 106, 0, 0.25)',
          borderRadius: '8px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.74rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={15} color="#ff8a3d" />
            <div>
              <span style={{ color: '#ff8a3d', fontWeight: 700 }}>ApsaraDB for Redis Capacity Lock: </span>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                {hospital.redisTokenLease || 'SR-REDIS-LCK-89421-RIC'}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
            <Clock size={13} color="#94a3b8" />
            <span style={{ color: 'var(--text-muted)' }}>Lock Lease TTL:</span>
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>{formatTtl(redisTtl)}</span>
          </div>
        </div>

        {/* Telemetry Delivery Log */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.72rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <PhoneCall size={12} color="#10b981" /> SMS Gateway: Delivered (+92-300-ONCALL)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={12} color="#10b981" /> DirectMail: FHIR Packet Sent
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`btn ${acknowledged ? 'btn-primary' : 'btn-alibaba'}`}
              onClick={() => setAcknowledged(true)}
              style={{ fontSize: '0.74rem', padding: '6px 12px' }}
            >
              {acknowledged ? <CheckCircle2 size={13} /> : <UserCheck size={13} />}
              <span>{acknowledged ? 'Suite & Team Confirmed Ready' : 'Acknowledge & Confirm Bed Reservation'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
