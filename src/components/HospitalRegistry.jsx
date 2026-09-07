import React, { useState, useMemo } from 'react';
import { getAllPunjabHospitals, HEALTHCARE_REGIONS } from '../data/hospitalsData';
import { Search, Filter, Bed, Clock, Activity, Check, X, ShieldAlert, ChevronRight, Building2 } from 'lucide-react';

export default function HospitalRegistry({ onSelectHospitalForModal, onSelectHospitalForRouting }) {
  const allHospitals = useMemo(() => getAllPunjabHospitals(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCapability, setSelectedCapability] = useState('all');

  const filteredHospitals = useMemo(() => {
    return allHospitals.filter(h => {
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = h.name.toLowerCase().includes(q) ||
                      h.shortName.toLowerCase().includes(q) ||
                      h.city.toLowerCase().includes(q) ||
                      h.type.toLowerCase().includes(q) ||
                      h.onCallSpecialties.some(s => s.toLowerCase().includes(q));
        if (!match) return false;
      }

      // City filter
      if (selectedCity !== 'all') {
        if (selectedCity === 'lahore' && h.city !== 'Lahore') return false;
        if (selectedCity === 'islamabad_rawalpindi' && !['Islamabad', 'Rawalpindi', 'Islamabad / Rawalpindi'].includes(h.city)) return false;
        if (selectedCity === 'faisalabad' && h.city !== 'Faisalabad') return false;
        if (selectedCity === 'multan' && h.city !== 'Multan') return false;
        if (selectedCity === 'gujranwala' && h.city !== 'Gujranwala') return false;
        if (selectedCity === 'sialkot' && h.city !== 'Sialkot') return false;
        if (selectedCity === 'gujrat' && h.city !== 'Gujrat') return false;
        if (selectedCity === 'bahawalpur' && !['Bahawalpur', 'Rahim Yar Khan'].includes(h.city)) return false;
        if (selectedCity === 'sargodha' && h.city !== 'Sargodha') return false;
        if (selectedCity === 'sahiwal' && !['Sahiwal', 'Okara'].includes(h.city)) return false;
        if (selectedCity === 'dg_khan' && !['Dera Ghazi Khan', 'Muzaffargarh', 'Layyah'].includes(h.city)) return false;
      }

      // Sector filter
      if (selectedSector !== 'all') {
        if (selectedSector === 'public' && h.sector !== 'Public') return false;
        if (selectedSector === 'private' && h.sector !== 'Private') return false;
        if (selectedSector === 'military' && h.sector !== 'Military') return false;
        if (selectedSector === 'trust' && !h.sector.includes('Trust')) return false;
      }

      // Capability filter
      if (selectedCapability !== 'all') {
        if (selectedCapability === 'cath_lab' && !h.activeResources.cath_lab) return false;
        if (selectedCapability === 'ventilator' && !(h.activeResources.mechanical_ventilator > 0)) return false;
        if (selectedCapability === 'icu' && !(h.activeResources.tertiary_icu_bed > 0)) return false;
        if (selectedCapability === 'stroke' && !h.activeResources.stroke_suite) return false;
        if (selectedCapability === 'trauma' && !(h.activeResources.level1_trauma_bay > 0)) return false;
      }

      return true;
    });
  }, [allHospitals, searchQuery, selectedCity, selectedSector, selectedCapability]);

  return (
    <div style={{
      maxWidth: '1500px',
      margin: '0 auto',
      width: '100%',
      padding: '24px',
      minHeight: 'calc(100vh - 60px)'
    }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-green">Punjab Health Infrastructure Registry</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
            SHC&MED · P&SHD · PHC Registered
          </span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', margin: '0 0 6px 0' }}>
          Punjab Emergency Hospital Registry
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--gray-600)', margin: 0, maxWidth: '800px' }}>
          Comprehensive verified directory of <strong>{allHospitals.length} Public & Private hospitals</strong> across Punjab, Pakistan.
          Includes real-time telemetry: ER beds, NEDOCS overcrowding scores, ambulance offload delay, and life-critical infrastructure.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '14px',
          alignItems: 'center'
        }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--navy-50)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            border: '1px solid var(--navy-100)'
          }}>
            <Search size={16} color="var(--navy-500)" />
            <input
              type="text"
              placeholder="Search hospital by name, city, specialty..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.84rem',
                fontFamily: 'var(--font-sans)',
                color: 'var(--navy-900)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* City / Division Selector */}
          <div>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--gray-300)',
                background: '#fff',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--navy-800)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">📍 All Punjab Regions ({allHospitals.length} Hospitals)</option>
              <option value="lahore">Lahore Division</option>
              <option value="islamabad_rawalpindi">Rawalpindi & Islamabad</option>
              <option value="faisalabad">Faisalabad Division</option>
              <option value="multan">Multan Division</option>
              <option value="gujranwala">Gujranwala Division</option>
              <option value="sialkot">Sialkot District</option>
              <option value="gujrat">Gujrat District</option>
              <option value="bahawalpur">Bahawalpur & R.Y. Khan</option>
              <option value="sargodha">Sargodha Division</option>
              <option value="sahiwal">Sahiwal & Okara</option>
              <option value="dg_khan">D.G. Khan & Muzaffargarh</option>
            </select>
          </div>

          {/* Sector Selector */}
          <div>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--gray-300)',
                background: '#fff',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--navy-800)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">🏛️ All Sectors (Public & Private)</option>
              <option value="public">Government Teaching / DHQ</option>
              <option value="private">Private Tertiary Hospitals</option>
              <option value="military">Military & Social Security</option>
              <option value="trust">Trust / Al-Khidmat / Charity</option>
            </select>
          </div>

          {/* Life-critical Equipment Filter */}
          <div>
            <select
              value={selectedCapability}
              onChange={e => setSelectedCapability(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--gray-300)',
                background: '#fff',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--navy-800)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">⚡ All Capabilities</option>
              <option value="cath_lab">Cath Lab (Primary PCI)</option>
              <option value="ventilator">Mechanical Ventilators</option>
              <option value="icu">Tertiary ICU Beds</option>
              <option value="stroke">Dedicated Stroke Suite</option>
              <option value="trauma">Level 1 Trauma Bay</option>
            </select>
          </div>
        </div>

        {/* Results count & active tags */}
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--gray-500)' }}>
          <span>
            Showing <strong>{filteredHospitals.length}</strong> of {allHospitals.length} registered Punjab healthcare facilities
          </span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>🔵 Public: {allHospitals.filter(h => h.sector === 'Public').length}</span>
            <span>🟣 Private: {allHospitals.filter(h => h.sector === 'Private').length}</span>
            <span>🟢 Trust / Alkhidmat: {allHospitals.filter(h => h.sector.includes('Trust')).length}</span>
            <span>🟡 Military: {allHospitals.filter(h => h.sector === 'Military').length}</span>
          </div>
        </div>
      </div>

      {/* Hospitals Table / Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '16px'
      }}>
        {filteredHospitals.map(hospital => {
          const occupancy = Math.round((hospital.occupiedErBeds / hospital.totalErBeds) * 100);
          const bedsAvail = hospital.totalErBeds - hospital.occupiedErBeds;

          return (
            <div
              key={hospital.id}
              className="card"
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                border: '1px solid var(--gray-200)'
              }}
              onClick={() => onSelectHospitalForModal && onSelectHospitalForModal(hospital)}
            >
              <div>
                {/* Sector & City Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background: hospital.sector === 'Public' ? '#e0f2fe' :
                                hospital.sector === 'Military' ? '#fef3c7' :
                                hospital.sector.includes('Trust') ? '#dcfce7' : '#ede9fe',
                    color: hospital.sector === 'Public' ? '#0369a1' :
                           hospital.sector === 'Military' ? '#b45309' :
                           hospital.sector.includes('Trust') ? '#15803d' : '#6d28d9'
                  }}>
                    {hospital.sector}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gray-500)', fontWeight: 600 }}>
                    📍 {hospital.city}
                  </span>
                </div>

                {/* Hospital Name */}
                <h3 style={{
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: 'var(--navy-900)',
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  {hospital.name}
                </h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--gray-500)', marginBottom: '12px' }}>
                  {hospital.type}
                </div>

                {/* Live Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  background: 'var(--navy-50)',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--gray-500)' }}>ER Beds</div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--navy-900)', fontFamily: 'var(--font-mono)' }}>
                      {bedsAvail} free
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--gray-500)' }}>Offload</div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--navy-900)', fontFamily: 'var(--font-mono)' }}>
                      {hospital.offloadDelayMins}m
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--gray-500)' }}>NEDOCS</div>
                    <div style={{
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      color: hospital.nedocsScore > 140 ? '#b91c1c' : hospital.nedocsScore > 100 ? '#b45309' : 'var(--green-700)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {hospital.nedocsScore}
                    </div>
                  </div>
                </div>

                {/* Key Capabilities Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                  {hospital.activeResources.cath_lab && (
                    <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: '#047857', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      Cath Lab
                    </span>
                  )}
                  {hospital.activeResources.tertiary_icu_bed > 0 && (
                    <span style={{ fontSize: '0.65rem', background: '#eff6ff', color: '#1d4ed8', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      {hospital.activeResources.tertiary_icu_bed} ICU Beds
                    </span>
                  )}
                  {hospital.activeResources.mechanical_ventilator > 0 && (
                    <span style={{ fontSize: '0.65rem', background: '#f5f3ff', color: '#6d28d9', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      {hospital.activeResources.mechanical_ventilator} Vents
                    </span>
                  )}
                  {hospital.activeResources.ct_scanner && (
                    <span style={{ fontSize: '0.65rem', background: '#f8fafc', color: '#475569', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      CT 24/7
                    </span>
                  )}
                  {hospital.activeResources.stroke_suite && (
                    <span style={{ fontSize: '0.65rem', background: '#fef2f2', color: '#b91c1c', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      Stroke Suite
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid var(--gray-100)',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: 'var(--navy-700)'
              }}>
                <span>View Full Telemetry</span>
                <ChevronRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
