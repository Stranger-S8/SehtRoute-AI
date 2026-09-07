import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Clock, Bed, HeartPulse, Activity, MapPin, Navigation } from 'lucide-react';

export default function HospitalDetailModal({
  hospital,
  isOpen,
  onClose,
  onRouteHere,
  onLockReservation,
  reservationToken,
  isLocking
}) {
  if (!isOpen || !hospital) return null;

  const bedsAvailable = hospital.totalErBeds - hospital.occupiedErBeds;
  const occupancyPercent = Math.round((hospital.occupiedErBeds / hospital.totalErBeds) * 100);

  const getNedocsBadge = (score) => {
    if (score < 100) {
      return { label: `Normal (${score})`, color: 'var(--green-700)', bg: 'var(--green-50)', border: 'var(--green-300)' };
    } else if (score <= 140) {
      return { label: `Overcrowded (${score})`, color: '#b45309', bg: '#fef3c7', border: '#fcd34d' };
    } else {
      return { label: `Severely Overcrowded (${score}) — Bypass Alert`, color: '#b91c1c', bg: '#fee2e2', border: '#fca5a5' };
    }
  };

  const nedocs = getNedocsBadge(hospital.nedocsScore);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(11, 37, 69, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-900) 100%)',
          color: '#fff',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                background: hospital.sector === 'Public' ? 'rgba(56, 189, 248, 0.2)' :
                            hospital.sector === 'Military' ? 'rgba(234, 179, 8, 0.2)' :
                            hospital.sector.includes('Trust') ? 'rgba(52, 211, 153, 0.2)' : 'rgba(167, 139, 250, 0.2)',
                color: hospital.sector === 'Public' ? '#7dd3fc' :
                       hospital.sector === 'Military' ? '#fde047' :
                       hospital.sector.includes('Trust') ? '#6ee7b7' : '#c4b5fd',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {hospital.sector} · {hospital.type}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--navy-300)' }}>
                📍 {hospital.city}, Punjab
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              {hospital.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Top Live Capacity Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {/* ER Beds */}
            <div style={{
              background: 'var(--navy-50)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              border: '1px solid var(--navy-100)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--navy-700)', fontWeight: 600 }}>
                <Bed size={14} color="var(--navy-600)" /> ER Bed Occupancy
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {hospital.occupiedErBeds} / {hospital.totalErBeds}
              </div>
              <div style={{ fontSize: '0.7rem', color: occupancyPercent > 85 ? '#b91c1c' : 'var(--gray-600)', fontWeight: 600 }}>
                {occupancyPercent}% full · {bedsAvailable} available
              </div>
            </div>

            {/* Offload Delay */}
            <div style={{
              background: 'var(--navy-50)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              border: '1px solid var(--navy-100)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--navy-700)', fontWeight: 600 }}>
                <Clock size={14} color="var(--navy-600)" /> Est. Offload Delay
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {hospital.offloadDelayMins} min
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--gray-600)' }}>
                Ambulance bay queue
              </div>
            </div>

            {/* NEDOCS Score */}
            <div style={{
              background: nedocs.bg,
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              border: `1px solid ${nedocs.border}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: nedocs.color, fontWeight: 700 }}>
                <Activity size={14} /> NEDOCS Score
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: nedocs.color, marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {hospital.nedocsScore}
              </div>
              <div style={{ fontSize: '0.68rem', color: nedocs.color, fontWeight: 600 }}>
                {hospital.nedocsScore > 140 ? 'Severe Saturated' : hospital.nedocsScore > 100 ? 'Overcrowded' : 'Normal Capacity'}
              </div>
            </div>
          </div>

          {/* Critical Care & Emergency Resources */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '10px' }}>
              🏥 Emergency & Critical Care Infrastructure
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px'
            }}>
              {[
                { label: 'Tertiary ICU Beds', value: hospital.activeResources.tertiary_icu_bed, isCount: true },
                { label: 'Mechanical Ventilators', value: hospital.activeResources.mechanical_ventilator, isCount: true },
                { label: 'Cath Lab (Primary PCI)', value: hospital.activeResources.cath_lab, isBool: true },
                { label: 'CT Scanner (24/7)', value: hospital.activeResources.ct_scanner, isBool: true },
                { label: 'Dedicated Stroke Suite', value: hospital.activeResources.stroke_suite, isBool: true },
                { label: 'Level 1 Trauma Bays', value: hospital.activeResources.level1_trauma_bay, isCount: true }
              ].map((res, idx) => {
                const active = res.isCount ? res.value > 0 : res.value;
                return (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: active ? '#f0fdf4' : '#f8fafc',
                    border: `1px solid ${active ? '#bbf7d0' : '#e2e8f0'}`
                  }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--navy-800)', fontWeight: 500 }}>
                      {res.label}
                    </span>
                    <span style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: active ? 'var(--green-700)' : 'var(--gray-400)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {res.isCount ? `${res.value} Available` : (res.value ? '✓ Operational' : '✕ Unavailable')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* On-call Specialties */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '8px' }}>
              👨‍⚕️ On-Call Medical & Surgical Specialties
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {hospital.onCallSpecialties.map((spec, i) => (
                <span key={i} style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: 'var(--navy-100)',
                  color: 'var(--navy-800)'
                }}>
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--gray-200)'
          }}>
            <button
              onClick={() => {
                onRouteHere && onRouteHere(hospital);
                onClose();
              }}
              className="btn btn-primary"
              style={{ flex: 1, padding: '10px 16px', fontSize: '0.85rem' }}
            >
              <Navigation size={15} />
              <span>Simulate Emergency Routing Here</span>
            </button>

            <button
              onClick={() => onLockReservation && onLockReservation(hospital.id)}
              disabled={isLocking}
              className="btn"
              style={{
                background: 'var(--navy-700)',
                color: '#fff',
                padding: '10px 16px',
                fontSize: '0.85rem'
              }}
            >
              <ShieldCheck size={15} />
              <span>{isLocking ? 'Locking...' : 'Reserve Bed Token'}</span>
            </button>
          </div>

          {/* If reservation token exists for this hospital */}
          {reservationToken && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="var(--green-600)" />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--green-800)' }}>
                    Alkhidmat 1023 Bed Reservation Locked
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--green-700)', fontFamily: 'var(--font-mono)' }}>
                    Token: {reservationToken} · 20 min hold
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
