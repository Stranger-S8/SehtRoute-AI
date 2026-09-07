import React from 'react';
import { Calculator, Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Sliders, Zap } from 'lucide-react';

export default function TTDCBreakdown({
  hospitals,
  trafficMultiplier,
  setTrafficMultiplier,
  isSimulating,
  onStartSimulation,
  onResetSimulation,
  hospitalACathLabOnline,
  setHospitalACathLabOnline,
  hospitalBCathLabOnline,
  setHospitalBCathLabOnline
}) {
  const hospitalA = hospitals[0];
  const hospitalB = hospitals[1];
  const hospitalC = hospitals[2];

  // Calculate dynamic TTDCs based on toggles
  const transitA = Math.round(hospitalA.baseTransitMins * trafficMultiplier);
  const transitB = Math.round(hospitalB.baseTransitMins * trafficMultiplier);
  const transitC = hospitalC ? Math.round(hospitalC.baseTransitMins * trafficMultiplier) : 19;

  // Capacity penalties
  const penaltyA = hospitalACathLabOnline ? 0 : Infinity;
  const penaltyB = hospitalBCathLabOnline ? 0 : Infinity;
  const penaltyC = 0; // functional but long wait

  const ttdcA = penaltyA === Infinity ? 'BYPASS (∞)' : `${transitA + hospitalA.offloadDelayMins}m`;
  const ttdcB = penaltyB === Infinity ? 'BYPASS (∞)' : `${transitB + hospitalB.offloadDelayMins}m`;
  const ttdcC = `${transitC + (hospitalC?.offloadDelayMins || 40)}m`;

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(245, 158, 11, 0.4)'
          }}>
            <Calculator size={18} color="#f59e0b" />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              The Algorithmic Core: TTDC Optimization Matrix
            </h3>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              Total Time to Definitive Care = T_transit + T_offload + P_capacity
            </p>
          </div>
        </div>
        <span className="badge badge-amber">FC 3.0 Real-Time Calc</span>
      </div>

      {/* Formula Presentation */}
      <div style={{
        background: '#040711',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>
          TTDC = T<sub>transit</sub> + T<sub>offload</sub> + P<sub>capacity</sub>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
          <span style={{ color: '#10b981' }}>P<sub>capacity</sub> = 0</span> (Resource Available) • <span style={{ color: '#ef4444' }}>P<sub>capacity</sub> = ∞</span> (Resource Offline / Bypass)
        </div>
      </div>

      {/* Facilities Comparison Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Candidate Hospital</th>
              <th style={{ padding: '8px' }}>Road Dist / Transit</th>
              <th style={{ padding: '8px' }}>ER Offload Wait</th>
              <th style={{ padding: '8px' }}>Critical Resource</th>
              <th style={{ padding: '8px' }}>P<sub>capacity</sub></th>
              <th style={{ padding: '8px' }}>TTDC Score</th>
              <th style={{ padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Hospital A */}
            <tr style={{
              background: penaltyA === Infinity ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <td style={{ padding: '10px 8px', fontWeight: 600, color: '#ffffff' }}>
                {hospitalA.shortName} <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>(Standard GPS Choice)</span>
              </td>
              <td style={{ padding: '10px 8px', color: '#38bdf8' }}>
                {hospitalA.distanceKm} km ({transitA}m)
              </td>
              <td style={{ padding: '10px 8px', color: '#f87171' }}>
                {hospitalA.offloadDelayMins} mins (NEDOCS {hospitalA.nedocsScore})
              </td>
              <td style={{ padding: '10px 8px' }}>
                <span style={{ color: hospitalACathLabOnline ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                  {hospitalACathLabOnline ? 'Cath Lab Online' : 'Cath Lab Offline (0 Beds)'}
                </span>
              </td>
              <td style={{ padding: '10px 8px', color: penaltyA === Infinity ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                {penaltyA === Infinity ? '∞ (Penalty)' : '0'}
              </td>
              <td style={{ padding: '10px 8px', fontWeight: 800, color: penaltyA === Infinity ? '#ef4444' : '#38bdf8' }}>
                {ttdcA}
              </td>
              <td style={{ padding: '10px 8px' }}>
                <span className={`badge ${penaltyA === Infinity ? 'badge-crimson' : 'badge-emerald'}`}>
                  {penaltyA === Infinity ? 'BYPASS ENFORCED' : 'ELIGIBLE'}
                </span>
              </td>
            </tr>

            {/* Hospital B */}
            <tr style={{
              background: penaltyB === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <td style={{ padding: '10px 8px', fontWeight: 600, color: '#34d399' }}>
                {hospitalB.shortName} <span style={{ color: '#38bdf8', fontSize: '0.7rem' }}>(SehatRoute AI Route)</span>
              </td>
              <td style={{ padding: '10px 8px', color: '#38bdf8' }}>
                {hospitalB.distanceKm} km ({transitB}m)
              </td>
              <td style={{ padding: '10px 8px', color: '#10b981' }}>
                {hospitalB.offloadDelayMins} mins (NEDOCS {hospitalB.nedocsScore})
              </td>
              <td style={{ padding: '10px 8px' }}>
                <span style={{ color: hospitalBCathLabOnline ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                  {hospitalBCathLabOnline ? 'Cath Lab 2 Reserved' : 'Cath Lab Offline'}
                </span>
              </td>
              <td style={{ padding: '10px 8px', color: penaltyB === 0 ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                {penaltyB === 0 ? '0' : '∞ (Penalty)'}
              </td>
              <td style={{ padding: '10px 8px', fontWeight: 800, color: '#10b981', fontSize: '0.9rem' }}>
                {ttdcB}
              </td>
              <td style={{ padding: '10px 8px' }}>
                <span className={`badge ${penaltyB === 0 ? 'badge-emerald' : 'badge-crimson'}`}>
                  {penaltyB === 0 ? 'DEFINITIVE CARE' : 'BYPASS'}
                </span>
              </td>
            </tr>

            {/* Hospital C */}
            {hospitalC && (
              <tr style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#ffffff' }}>
                  {hospitalC.shortName} <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>(Tertiary Backup)</span>
                </td>
                <td style={{ padding: '10px 8px', color: '#38bdf8' }}>
                  {hospitalC.distanceKm} km ({transitC}m)
                </td>
                <td style={{ padding: '10px 8px', color: '#fbbf24' }}>
                  {hospitalC.offloadDelayMins} mins (NEDOCS {hospitalC.nedocsScore})
                </td>
                <td style={{ padding: '10px 8px', color: '#10b981' }}>
                  Cath Lab Online (Congested)
                </td>
                <td style={{ padding: '10px 8px', color: '#10b981', fontWeight: 700 }}>
                  0
                </td>
                <td style={{ padding: '10px 8px', color: '#fbbf24', fontWeight: 800 }}>
                  {ttdcC}
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <span className="badge badge-amber">BACKUP (57m)</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Interactive Simulation Controls & Edge Case Sliders */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={14} color="#06b6d4" />
            <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: '#e2e8f0' }}>
              Live Edge-Case Stress Testing
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Real-Time FC 3.0 Re-evaluation
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {/* Traffic Congestion Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Urban Traffic Density:</span>
              <strong style={{ color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>
                {trafficMultiplier === 1.0 ? 'Normal Flow (1.0x)' : `${trafficMultiplier}x Peak Rush Hour`}
              </strong>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.2"
              step="0.2"
              value={trafficMultiplier}
              onChange={(e) => setTrafficMultiplier(parseFloat(e.target.value))}
            />
          </div>

          {/* Toggle Equipment Outages */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-outline"
              onClick={() => setHospitalACathLabOnline(!hospitalACathLabOnline)}
              style={{
                flex: 1,
                fontSize: '0.74rem',
                padding: '6px',
                borderColor: hospitalACathLabOnline ? '#10b981' : '#ef4444'
              }}
            >
              <Zap size={12} color={hospitalACathLabOnline ? '#10b981' : '#ef4444'} />
              <span>Toggle {hospitalA.shortName.split(' ')[0]} Resource</span>
            </button>

            <button
              className="btn btn-outline"
              onClick={() => setHospitalBCathLabOnline(!hospitalBCathLabOnline)}
              style={{
                flex: 1,
                fontSize: '0.74rem',
                padding: '6px',
                borderColor: hospitalBCathLabOnline ? '#10b981' : '#ef4444'
              }}
            >
              <Zap size={12} color={hospitalBCathLabOnline ? '#10b981' : '#ef4444'} />
              <span>Toggle {hospitalB.shortName.split(' ')[0]} Resource</span>
            </button>
          </div>
        </div>

        {/* Emergency Run Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
          <button
            className="btn btn-primary"
            onClick={onStartSimulation}
            style={{ flex: 1, padding: '10px' }}
          >
            {isSimulating ? <Pause size={16} /> : <Play size={16} />}
            <span>{isSimulating ? 'Pause Emergency Ambulance Run' : 'Start Emergency Run (Alkhidmat 1023)'}</span>
          </button>

          <button
            className="btn btn-outline"
            onClick={onResetSimulation}
            style={{ padding: '10px 14px' }}
            title="Reset Vehicle to Dispatch Station"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
