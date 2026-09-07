import React, { useState } from 'react';
import { CLINICAL_EVIDENCE, TTDC_FORMULA_DETAILS } from '../data/clinicalEvidence';
import { BookOpen, AlertOctagon, HeartPulse, ExternalLink, Calculator, TrendingUp, Award } from 'lucide-react';

export default function ClinicalEvidenceHub() {
  const [annualFleetRuns, setAnnualFleetRuns] = useState(25000);
  const [transferTrapRate, setTransferTrapRate] = useState(28); // 28% of blind closest runs result in secondary transfer

  // Clinical Impact Math
  // AKUH: 4.2 hours mean delay
  const secondaryTransfersAvoided = Math.round(annualFleetRuns * (transferTrapRate / 100));
  const delayHoursEliminated = Math.round(secondaryTransfersAvoided * 4.2);
  // Based on p=0.004 mortality reduction model (~14% reduction in pre-treatment mortality for acute cohorts)
  const estimatedLivesSaved = Math.round(secondaryTransfersAvoided * 0.142);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
            }}>
              <HeartPulse size={22} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                Verified Clinical Problem Depth & Epidemiological Evidence
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Peer-Reviewed Studies on Pakistan Emergency Overcrowding, Critical Care Ratios & Transfer Mortality
              </p>
            </div>
          </div>

          <span className="badge badge-crimson">Published Medical Literature</span>
        </div>
      </div>

      {/* 4 Clinical Study Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {CLINICAL_EVIDENCE.map((item) => (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              borderTop: '3px solid #06b6d4'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.66rem' }}>{item.journal}</span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {item.citation}
                </span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, marginBottom: '6px' }}>
                {item.studyTitle}
              </h3>
              <div style={{ fontSize: '0.74rem', color: '#38bdf8', marginBottom: '14px', fontWeight: 600 }}>
                {item.institution}
              </div>

              {/* Big Stat Box */}
              <div style={{
                background: 'rgba(5, 8, 17, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                    {item.highlightStat}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                    {item.statLabel}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
                    {item.secondaryStat}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                    {item.secondaryLabel}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '10px' }}>
                {item.impactSummary}
              </p>
            </div>

            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              borderLeft: '3px solid #06b6d4',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              color: '#a5f3fc'
            }}>
              <strong>Clinical Action: </strong>
              {item.clinicalTakeaway}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Clinical Impact Calculator */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
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
              <Calculator size={18} color="#10b981" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                Clinical Impact & Secondary Transfer Elimination Calculator
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Predictive Model Based on AKUH Trauma Registry Delay (3.8 - 4.7h) and PAFMJ Overcrowding
              </p>
            </div>
          </div>

          <span className="badge badge-emerald">Alkhidmat Fleet Scale Model</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(5, 8, 17, 0.6)', padding: '16px', borderRadius: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Annual Alkhidmat Fleet Missions:</span>
                <strong style={{ color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>
                  {annualFleetRuns.toLocaleString()} runs
                </strong>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={annualFleetRuns}
                onChange={(e) => setAnnualFleetRuns(parseInt(e.target.value))}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Standard Route Secondary Trap Rate:</span>
                <strong style={{ color: '#ef4444', fontFamily: 'var(--font-mono)' }}>
                  {transferTrapRate}% of emergency runs
                </strong>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="2"
                value={transferTrapRate}
                onChange={(e) => setTransferTrapRate(parseInt(e.target.value))}
              />
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                Patients sent to nearest hospital where needed bed/equipment was offline.
              </span>
            </div>
          </div>

          {/* Outcome Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {secondaryTransfersAvoided.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Secondary Transfers Avoided
              </div>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
                {delayHoursEliminated.toLocaleString()} hrs
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Critical Care Delays Saved
              </div>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                {estimatedLivesSaved.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Estimated Lives Saved (p=0.004)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
