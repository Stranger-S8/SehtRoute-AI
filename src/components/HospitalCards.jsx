import React from 'react';
import {
  AlertTriangle, Activity, CheckCircle, XCircle, Clock, Truck,
  AlertCircle, Zap, ShieldCheck, Lock, PhoneCall, Info, ArrowRight,
  RefreshCw, CheckCircle2
} from 'lucide-react';

const URGENCY_CONFIG = {
  CRITICAL: { bg: '#fee2e2', border: '#fca5a5', text: '#dc2626', label: 'CRITICAL', icon: AlertTriangle },
  URGENT: { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', label: 'URGENT', icon: AlertCircle },
  MODERATE: { bg: '#dbe9f7', border: '#a3c4e9', text: '#134074', label: 'MODERATE', icon: Activity },
  LOW: { bg: '#e0f2f1', border: '#80cbc4', text: '#00695c', label: 'LOW', icon: CheckCircle },
};

const STATUS_STYLES = {
  green: { bg: '#e0f2f1', border: '#80cbc4', text: '#00695c' },
  navy: { bg: '#dbe9f7', border: '#a3c4e9', text: '#134074' },
  amber: { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' },
  red: { bg: '#fee2e2', border: '#fca5a5', text: '#dc2626' },
};

export default function HospitalCards({
  triageResult, hospitals, apiSource, apiError,
  selectedHospitalId, onSelectHospital, onLockReservation,
  reservationToken, isLocking, mode = 'citizen',
  onSimulateFailure, contentionAlert
}) {
  if (!triageResult) return null;

  const urgencyConf = URGENCY_CONFIG[triageResult.triage_urgency] || URGENCY_CONFIG.MODERATE;
  const UrgencyIcon = urgencyConf.icon;

  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId);

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* User Tier / Authority Context Banner */}
      {mode === 'citizen' ? (
        <div style={{
          padding: '8px 12px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Info size={16} color="#2563eb" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.73rem', color: '#1e40af' }}>
            <strong>Citizen view (Recommendation only).</strong> Capacity lock requires Alkhidmat 1023 ambulance dispatch.
          </div>
        </div>
      ) : (
        <div style={{
          padding: '8px 12px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.73rem', color: '#065f46' }}>
            <strong>Alkhidmat 1023 Fleet:</strong> Authorized for live atomic capacity reservation and pre-arrival alerts.
          </div>
        </div>
      )}

      {/* Contention / Failover Alert if Failure occurred */}
      {contentionAlert && (
        <div className="alert-banner alert-banner-amber" style={{ animation: 'fade-in 0.3s ease' }}>
          <RefreshCw size={15} />
          <span>{contentionAlert}</span>
        </div>
      )}

      {/* API Source Banner */}
      {apiError && (
        <div className="alert-banner alert-banner-amber" style={{ animation: 'fade-in 0.3s ease' }}>
          <AlertCircle size={15} />
          <span>{apiError}</span>
        </div>
      )}

      {/* Triage Summary Card */}
      <div className="card" style={{ padding: '18px', borderLeft: `4px solid ${urgencyConf.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: urgencyConf.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <UrgencyIcon size={18} color={urgencyConf.text} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-800)' }}>
                {triageResult.suspected_condition}
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--gray-500)', marginTop: '2px' }}>
                {triageResult.required_department} · ESI Level {triageResult.esi_level}
              </div>
            </div>
          </div>
          <span className="badge" style={{
            background: urgencyConf.bg,
            color: urgencyConf.text,
            border: `1px solid ${urgencyConf.border}`
          }}>
            {urgencyConf.label}
          </span>
        </div>

        {/* Required Facilities Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
          {(triageResult.mandatory_facilities || []).map((f, i) => (
            <span key={i} className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
              {f}
            </span>
          ))}
          <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
            🩺 {triageResult.doctor_specialty_required}
          </span>
        </div>

        {/* First Aid Advice */}
        {triageResult.suggested_actions && (
          <div style={{
            background: 'var(--gray-50)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px',
            fontSize: '0.76rem',
            color: 'var(--gray-600)',
            lineHeight: 1.5
          }}>
            <strong style={{ color: 'var(--green-600)' }}>⚡ Immediate Action:</strong>{' '}
            {triageResult.suggested_actions}
          </div>
        )}

        {/* Source label */}
        <div style={{
          marginTop: '10px',
          fontSize: '0.68rem',
          color: 'var(--gray-400)',
          display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          {apiSource === 'gemini' ? (
            <><Zap size={11} color="var(--green-600)" /> Parsed by Gemini AI</>
          ) : (
            <><ShieldCheck size={11} color="var(--navy-400)" /> Deterministic Rule Engine (Fallback)</>
          )}
        </div>
      </div>

      {/* Active Lease & Pre-Arrival Alert Banner (Verified Ambulance only) */}
      {reservationToken && selectedHospital && (
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
          color: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(6, 78, 59, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              ATOMIC CAPACITY LEASE GRANTED (SUCCESS)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#a7f3d0', fontFamily: 'var(--font-mono)' }}>
              Hold: 20 min TTL
            </span>
          </div>

          <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '4px' }}>
            🚑 Route Now $\rightarrow$ {selectedHospital.name}
          </div>

          <div style={{ fontSize: '0.76rem', color: '#d1fae5', marginBottom: '10px' }}>
            Pre-arrival alert dispatched to Emergency Desk & On-Call Specialists. <strong>Hospital is currently preparing bed & critical equipment.</strong>
          </div>

          <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '4px' }}>
            <span>Token: <strong style={{ fontFamily: 'var(--font-mono)' }}>{reservationToken}</strong></span>
            <span>ETA: <strong>{selectedHospital.transitMins} mins</strong></span>
            <span>Queue: <strong>{selectedHospital.offloadDelayMins} mins</strong></span>
          </div>
        </div>
      )}

      {/* Hospital Cards */}
      <div style={{ fontSize: '0.73rem', fontWeight: 600, color: 'var(--gray-500)', letterSpacing: '0.03em' }}>
        RANKED HOSPITALS — LOWEST TTDC FIRST
      </div>

      {hospitals.map((h, i) => {
        const isSelected = selectedHospitalId === h.id;
        const statusStyle = STATUS_STYLES[h.statusColor] || STATUS_STYLES.navy;

        return (
          <div
            key={h.id}
            className="card"
            onClick={() => !h.isBypass && onSelectHospital(h.id)}
            style={{
              padding: '16px',
              cursor: h.isBypass ? 'not-allowed' : 'pointer',
              opacity: h.isBypass ? 0.55 : 1,
              borderColor: isSelected ? 'var(--green-600)' : undefined,
              boxShadow: isSelected ? '0 0 0 2px rgba(0,137,123,0.2), var(--shadow-md)' : undefined,
              transition: 'all 0.15s ease',
              animationDelay: `${i * 60}ms`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {/* Left: Hospital Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{
                    width: '22px', height: '22px', borderRadius: '6px',
                    background: h.isBypass ? 'var(--red-100)' : (i === 0 ? 'var(--green-100)' : 'var(--navy-50)'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800,
                    color: h.isBypass ? 'var(--red-600)' : (i === 0 ? 'var(--green-700)' : 'var(--navy-700)')
                  }}>
                    {h.isBypass ? '✕' : `#${i + 1}`}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-800)' }}>
                    {h.shortName}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }}>
                    {h.type}
                  </span>
                </div>

                {/* Metric Row */}
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.76rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={12} color="var(--navy-400)" />
                    <span style={{ color: 'var(--gray-600)' }}>Transit: <strong>{h.transitMins} min</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} color="var(--navy-400)" />
                    <span style={{ color: 'var(--gray-600)' }}>Offload: <strong>{h.offloadDelayMins} min</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Activity size={12} color="var(--navy-400)" />
                    <span style={{ color: 'var(--gray-600)' }}>
                      Beds: <strong>{h.bedsAvailable}</strong>/{h.totalErBeds} ({h.occupancyPercent}%)
                    </span>
                  </div>
                </div>

                {/* Missing resources */}
                {h.isBypass && h.missingResources.length > 0 && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    marginTop: '6px', fontSize: '0.72rem', color: 'var(--red-500)'
                  }}>
                    <XCircle size={12} />
                    Missing: {h.missingResources.join(', ')}
                  </div>
                )}

                {/* On-call specialties */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                  {(h.onCallSpecialties || []).slice(0, 4).map((s, j) => (
                    <span key={j} style={{
                      padding: '2px 7px',
                      background: 'var(--gray-100)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.66rem',
                      color: 'var(--gray-600)',
                      fontWeight: 500
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: TTDC Score + Status */}
              <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '90px' }}>
                <div style={{
                  fontSize: '1.5rem', fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: h.isBypass ? 'var(--red-500)' : (i === 0 ? 'var(--green-600)' : 'var(--navy-700)'),
                  lineHeight: 1
                }}>
                  {h.isBypass ? '—' : `${h.ttdc}`}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--gray-400)', marginBottom: '6px' }}>
                  {h.isBypass ? 'BYPASS' : 'min TTDC'}
                </div>
                <span className="badge" style={{
                  background: statusStyle.bg,
                  color: statusStyle.text,
                  border: `1px solid ${statusStyle.border}`,
                  fontSize: '0.68rem'
                }}>
                  {h.statusLabel}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS BASED ON ARCHITECTURE ROLE */}
            {isSelected && !h.isBypass && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--gray-200)' }}>
                {mode === 'citizen' ? (
                  /* Public User: Recommendation Only */
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--navy-700)', fontWeight: 600 }}>
                        Recommendation for Nearest Definitive Care
                      </span>
                      <span className="badge badge-navy" style={{ fontSize: '0.65rem' }}>
                        Recommendation Only
                      </span>
                    </div>
                    <a
                      href="tel:1023"
                      className="btn btn-green btn-sm"
                      style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', padding: '9px 12px' }}
                    >
                      <PhoneCall size={14} />
                      <span>Call Alkhidmat 1023 (Dispatch Ambulance to Lock Bed)</span>
                    </a>
                  </div>
                ) : (
                  /* Verified Ambulance: Atomic Capacity Lease */
                  !reservationToken ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-green btn-sm"
                        onClick={(e) => { e.stopPropagation(); onLockReservation(h.id); }}
                        disabled={isLocking}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <Lock size={13} />
                        {isLocking ? 'Executing Atomic Lease...' : `Execute Atomic Capacity Lease at ${h.shortName}`}
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={(e) => { e.stopPropagation(); onSimulateFailure && onSimulateFailure(h.id); }}
                        style={{ background: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: '0.68rem', padding: '6px 10px' }}
                        title="Simulate race condition where capacity lease fails and system automatically tries next hospital"
                      >
                        Simulate Failure
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--green-700)', fontWeight: 700 }}>
                      <CheckCircle2 size={15} />
                      <span>Lease Confirmed · Pre-Arrival Alert Active · Route Now</span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
