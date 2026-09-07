import React from 'react';
import { Activity, MapPin, Settings, Building2, Hospital } from 'lucide-react';
import { HEALTHCARE_REGIONS } from '../data/hospitalsData';

export default function Header({
  activeTab, setActiveTab, activeCity, setActiveCity,
  onSelectHospitalDropdown, selectedHospitalId,
  onOpenApiSettings, hasApiKey
}) {
  return (
    <header style={{
      background: 'var(--navy-800)',
      borderBottom: '1px solid var(--navy-700)',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        gap: '12px'
      }}>
        {/* Brand with Alkhidmat & Alibaba */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <img
            src="/logo-alkhidmat-white-text.png"
            alt="Alkhidmat Foundation"
            style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
          />
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)' }} />
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              SehatRoute <span style={{ color: 'var(--green-400)' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.66rem', color: 'var(--navy-300)', fontWeight: 500 }}>
              1023 Fleet · Punjab
            </div>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '100%' }}>
          {[
            { key: 'emergency', label: 'Emergency Routing', icon: Activity },
            { key: 'registry', label: 'Punjab Hospital Registry (80+)', icon: Building2 }
          ].map(tab => {
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '0 14px', height: '100%',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: isActive ? '#fff' : 'var(--navy-300)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.82rem',
                  borderBottom: isActive ? '2px solid var(--green-400)' : '2px solid transparent',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-sans)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Hospital Dropdown + City Selector + API Key */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          {/* Hospital Selector Dropdown (Lists All Punjab Public & Private Hospitals) */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'var(--navy-700)',
            borderRadius: 'var(--radius-md)',
            padding: '5px 10px',
            maxWidth: '300px'
          }}>
            <Hospital size={14} color="var(--green-400)" />
            <select
              value={selectedHospitalId || ''}
              onChange={e => {
                if (e.target.value) {
                  onSelectHospitalDropdown && onSelectHospitalDropdown(e.target.value);
                }
              }}
              style={{
                background: 'transparent', border: 'none',
                color: '#fff', fontSize: '0.78rem', fontWeight: 600,
                outline: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                maxWidth: '250px',
                textOverflow: 'ellipsis'
              }}
            >
              <option value="" style={{ background: 'var(--navy-800)', color: '#fff' }}>
                🏥 Select Punjab Hospital (80+ Facilities)...
              </option>

              {/* Lahore */}
              <optgroup label="Lahore — Public Hospitals" style={{ background: 'var(--navy-800)', color: '#7dd3fc', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.lahore?.hospitals.filter(h => h.sector === 'Public').map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [Public Tertiary]
                  </option>
                ))}
              </optgroup>
              <optgroup label="Lahore — Private & Trust Hospitals" style={{ background: 'var(--navy-800)', color: '#c4b5fd', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.lahore?.hospitals.filter(h => h.sector !== 'Public').map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Rawalpindi & Islamabad */}
              <optgroup label="Rawalpindi & Islamabad — Public & Military" style={{ background: 'var(--navy-800)', color: '#7dd3fc', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.islamabad_rawalpindi?.hospitals.filter(h => h.sector === 'Public' || h.sector === 'Military').map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>
              <optgroup label="Rawalpindi & Islamabad — Private Hospitals" style={{ background: 'var(--navy-800)', color: '#c4b5fd', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.islamabad_rawalpindi?.hospitals.filter(h => h.sector !== 'Public' && h.sector !== 'Military').map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Faisalabad */}
              <optgroup label="Faisalabad — Public & Private" style={{ background: 'var(--navy-800)', color: '#6ee7b7', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.faisalabad?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Multan */}
              <optgroup label="Multan — Public & Private" style={{ background: 'var(--navy-800)', color: '#fde047', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.multan?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Gujranwala */}
              <optgroup label="Gujranwala Division" style={{ background: 'var(--navy-800)', color: '#7dd3fc', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.gujranwala?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Sialkot */}
              <optgroup label="Sialkot District" style={{ background: 'var(--navy-800)', color: '#6ee7b7', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.sialkot?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Gujrat */}
              <optgroup label="Gujrat District" style={{ background: 'var(--navy-800)', color: '#c4b5fd', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.gujrat?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Bahawalpur & R.Y. Khan */}
              <optgroup label="Bahawalpur & R.Y. Khan" style={{ background: 'var(--navy-800)', color: '#fde047', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.bahawalpur?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Sargodha */}
              <optgroup label="Sargodha Division" style={{ background: 'var(--navy-800)', color: '#7dd3fc', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.sargodha?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* Sahiwal & Okara */}
              <optgroup label="Sahiwal & Okara" style={{ background: 'var(--navy-800)', color: '#6ee7b7', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.sahiwal?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>

              {/* D.G. Khan & Muzaffargarh */}
              <optgroup label="D.G. Khan & Muzaffargarh" style={{ background: 'var(--navy-800)', color: '#fde047', fontWeight: 700 }}>
                {HEALTHCARE_REGIONS.dg_khan?.hospitals.map(h => (
                  <option key={h.id} value={h.id} style={{ background: 'var(--navy-900)', color: '#fff' }}>
                    {h.shortName} [{h.sector}]
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Alibaba Cloud Badge */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 'var(--radius-md)',
              padding: '4px 10px',
              flexShrink: 0
            }}
            title="Alibaba Cloud Healthcare AI"
          >
            <img
              src="/logo-alibaba-enhanced.png"
              alt="Alibaba Cloud"
              style={{ height: '18px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* API Key Button */}
          <button
            onClick={onOpenApiSettings}
            className="btn btn-sm"
            style={{
              background: hasApiKey ? 'var(--green-600)' : 'var(--navy-700)',
              color: '#fff', border: 'none',
              padding: '5px 12px', fontSize: '0.78rem'
            }}
            title="Configure Gemini API Key"
          >
            <Settings size={13} />
            <span>{hasApiKey ? 'API Connected' : 'Set API Key'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
