import React from 'react';
import {
  AlertTriangle, Activity, CheckCircle, XCircle, Clock, Truck,
  AlertCircle, Zap, ShieldCheck, Lock, PhoneCall, Info, ArrowRight,
  RefreshCw, CheckCircle2, Stethoscope
} from 'lucide-react';

const URGENCY_CONFIG = {
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#fca5a5', label: 'CRITICAL', icon: AlertTriangle },
  URGENT: { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#fcd34d', label: 'URGENT', icon: AlertCircle },
  MODERATE: { bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)', text: '#7dd3fc', label: 'MODERATE', icon: Activity },
  LOW: { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', text: '#6ee7b7', label: 'LOW', icon: CheckCircle },
};

const STATUS_STYLES = {
  green: { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.35)', text: '#34d399' },
  navy: { bg: 'rgba(37, 82, 133, 0.25)', border: 'rgba(59, 122, 187, 0.35)', text: '#93c5fd' },
  amber: { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.35)', text: '#fbbf24' },
  red: { bg: 'rgba(239, 68, 68, 0.18)', border: 'rgba(239, 68, 68, 0.4)', text: '#f87171' },
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
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* User Tier / Authority Context Banner */}
      {mode === 'citizen' ? (
        <div style={{
          padding: '8px 12px',
          background: 'rgba(37, 99, 235, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Info size={15} color="#60a5fa" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.73rem', color: '#93c5fd' }}>
            <strong>Citizen Channel:</strong> Hospital recommendations only. Unit capacity lease requires Alkhidmat 1023 ambulance dispatch.
          </div>
        </div>
      ) : (
        <div style={{
          padding: '8px 12px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldCheck size={15} color="#34d399" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.73rem', color: '#6ee7b7' }}>
            <strong>Alkhidmat 1023 Fleet CAD:</strong> Authorized for atomic resource reservation and pre-arrival alerts.
          </div>
        </div>
      )}

      {/* Contention / Failover Alert if Failure occurred */}
      {contentionAlert && (
        <div className="alert-banner alert-banner-amber" style={{ animation: 'fade-in 0.3s ease' }}>
          <RefreshCw size={14} />
          <span>{contentionAlert}</span>
        </div>
      )}

      {/* API Source Banner */}
      {apiError && (
        <div className="alert-banner alert-banner-amber" style={{ animation: 'fade-in 0.3s ease' }}>
          <AlertCircle size={14} />
          <span>{apiError}</span>
        </div>
      )}

      {/* Triage Summary Card */}
      <div className="card" style={{
        padding: '16px',
        borderLeft: `4px solid ${urgencyConf.border}`,
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: urgencyConf.bg,
              border: `1px solid ${urgencyConf.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <UrgencyIcon size={17} color={urgencyConf.text} />
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>
                {triageResult.suspected_condition}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
          {(triageResult.mandatory_facilities || []).map((f, i) => (
            <span key={i} className="badge badge-navy" style={{ fontSize: '0.68rem' }}>
              {f}
            </span>
          ))}
          {triageResult.doctor_specialty_required && (
            <span className="badge badge-green" style={{ fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Stethoscope size={11} />
              <span>{triageResult.doctor_specialty_required}</span>
            </span>
          )}
        </div>

        {/* First Aid Advice */}
        {triageResult.suggested_actions && (
          <div style={{
            background: 'rgba(0,0,0,0.25)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            padding: '9px 12px',
            fontSize: '0.74rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5
          }}>
            <strong style={{ color: 'var(--green-400)' }}>Protocol Action:</strong>{' '}
            {triageResult.suggested_actions}
          </div>
        )}

        {/* Source label */}
        <div style={{
          marginTop: '10px',
          fontSize: '0.68rem',
          color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: '5px',
          fontFamily: 'var(--font-mono)'
        }}>
          {apiSource === 'gemini' ? (
            <><Zap size={11} color="var(--green-400)" /> Clinical AI Parse: Google Gemini</>
          ) : (
            <><ShieldCheck size={11} color="var(--cyan-400)" /> Clinical Rule Engine (Deterministic)</>
          )}
        </div>
      </div>

      {/* Active Lease & Pre-Arrival Alert Banner (Verified Ambulance only) */}
      {reservationToken && selectedHospital && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.9) 0%, rgba(4, 120, 87, 0.9) 100%)',
          border: '1px solid rgba(52, 211, 153, 0.4)',
          color: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              ATOMIC CAPACITY LEASE ACTIVE
            </span>
            <span style={{ fontSize: '0.68rem', color: '#a7f3d0', fontFamily: 'var(--font-mono)' }}>
              Hold: 20 min TTL
            </span>
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '4px' }}>
            Priority Route Vector: {selectedHospital.name}
          </div>

          <div style={{ fontSize: '0.74rem', color: '#d1fae5', marginBottom: '8px' }}>
            Pre-arrival alert dispatched to Emergency Desk & On-Call Specialists. Hospital is preparing critical equipment.
          </div>

          <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
            <span>Token: <strong>{reservationToken}</strong></span>
            <span>ETA: <strong>{selectedHospital.transitMins}m</strong></span>
            <span>Queue: <strong>{selectedHospital.offloadDelayMins}m</strong></span>
          </div>
        </div>
      )}

      {/* Hospital List Header */}
      <div style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'var(--text-muted)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)'
      }}>
        Ranked Facilities — Lowest TTDC (Travel + Offload)
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
              padding: '14px',
              cursor: h.isBypass ? 'not-allowed' : 'pointer',
              opacity: h.isBypass ? 0.45 : 1,
              background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
              borderColor: isSelected ? 'var(--green-500)' : 'var(--border-subtle)',
              boxShadow: isSelected ? '0 0 16px rgba(16, 185, 129, 0.2)' : undefined,
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {/* Left: Hospital Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{
                    width: '22px', height: '22px', borderRadius: '4px',
                    background: h.isBypass ? 'rgba(239, 68, 68, 0.2)' : (i === 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)'),
                    border: `1px solid ${h.isBypass ? 'rgba(239,68,68,0.4)' : (i === 0 ? 'rgba(16,185,129,0.4)' : 'var(--border-subtle)')}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.68rem', fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: h.isBypass ? '#f87171' : (i === 0 ? '#34d399' : '#93c5fd')
                  }}>
                    {h.isBypass ? '✕' : `${i + 1}`}
                  </span>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>
                    {h.shortName}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {h.type}
                  </span>
                </div>

                {/* Metric Row */}
                <div style={{ display: 'flex', gap: '14px', fontSize: '0.73rem', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={11} color="var(--cyan-400)" />
                    <span style={{ color: 'var(--text-secondary)' }}>Transit: <strong style={{ color: '#fff' }}>{h.transitMins}m</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} color="var(--cyan-400)" />
                    <span style={{ color: 'var(--text-secondary)' }}>Offload: <strong style={{ color: '#fff' }}>{h.offloadDelayMins}m</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Activity size={11} color="var(--green-400)" />
                    <span style={{ color: 'var(--text-secondary)' }}>
                      ER Free: <strong style={{ color: '#fff' }}>{h.bedsAvailable}</strong>/{h.totalErBeds}
                    </span>
                  </div>
                </div>

                {/* Missing resources */}
                {h.isBypass && h.missingResources.length > 0 && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    marginTop: '6px', fontSize: '0.7rem', color: '#f87171',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <XCircle size={11} />
                    Bypass: Missing {h.missingResources.join(', ')}
                  </div>
                )}

                {/* On-call specialties */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                  {(h.onCallSpecialties || []).slice(0, 4).map((s, j) => (
                    <span key={j} style={{
                      padding: '2px 6px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: TTDC Score + Status */}
              <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '85px' }}>
                <div style={{
                  fontSize: '1.45rem', fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: h.isBypass ? '#ef4444' : (i === 0 ? 'var(--green-400)' : '#38bdf8'),
                  lineHeight: 1
                }}>
                  {h.isBypass ? '—' : `${h.ttdc}`}
                </div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', marginBottom: '5px', fontFamily: 'var(--font-mono)' }}>
                  {h.isBypass ? 'BYPASS' : 'min TTDC'}
                </div>
                <span className="badge" style={{
                  background: statusStyle.bg,
                  color: statusStyle.text,
                  border: `1px solid ${statusStyle.border}`,
                  fontSize: '0.66rem'
                }}>
                  {h.statusLabel}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            {isSelected && !h.isBypass && (
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                {mode === 'citizen' ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        Recommended Definitive Care
                      </span>
                      <span className="badge badge-navy" style={{ fontSize: '0.64rem' }}>
                        Recommendation
                      </span>
                    </div>
                    <a
                      href="tel:1023"
                      className="btn btn-green btn-sm"
                      style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', padding: '8px 12px' }}
                    >
                      <PhoneCall size={13} />
                      <span>Call Alkhidmat 1023 Dispatch</span>
                    </a>
                  </div>
                ) : (
                  !reservationToken ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-green btn-sm"
                        onClick={(e) => { e.stopPropagation(); onLockReservation(h.id); }}
                        disabled={isLocking}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <Lock size={12} />
                        {isLocking ? 'Leasing Capacity...' : `Execute Atomic Lease at ${h.shortName}`}
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={(e) => { e.stopPropagation(); onSimulateFailure && onSimulateFailure(h.id); }}
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)', fontSize: '0.68rem', padding: '6px 10px' }}
                        title="Simulate race condition failure"
                      >
                        Failover
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--green-400)', fontWeight: 700 }}>
                      <CheckCircle2 size={14} />
                      <span>Lease Confirmed · Pre-Arrival Alert Active</span>
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
