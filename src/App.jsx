import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import HospitalCards from './components/HospitalCards';
import DecisionMap from './components/DecisionMap';
import HospitalRegistry from './components/HospitalRegistry';
import HospitalDetailModal from './components/HospitalDetailModal';
import ApiKeyModal from './components/ApiKeyModal';
import { parseWithGemini, getActiveGeminiKey } from './utils/geminiApi';
import { evaluateHospitals, generateReservationToken } from './utils/ttdcEngine';
import { HEALTHCARE_REGIONS, findHospitalById } from './data/hospitalsData';
import { 
  User, 
  Stethoscope, 
  Sliders, 
  MapPin, 
  Building2, 
  ArrowLeft, 
  Radio, 
  Shield
} from 'lucide-react';

function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('emergency'); // 'emergency' | 'registry'
  const [activeCity, setActiveCity] = useState('lahore');

  // API Key - initialized from local storage or .env
  const [apiKey, setApiKey] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('gemini_api_key');
      if (stored && stored.trim()) return stored.trim();
    }
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY.trim();
    }
    return '';
  });
  const [showApiModal, setShowApiModal] = useState(false);

  // Effective API key check for header indicator
  const effectiveApiKey = getActiveGeminiKey(apiKey);

  // Mode
  const [mode, setMode] = useState('citizen'); // 'citizen' | 'paramedic'

  // Traffic multiplier (simulated slider)
  const [trafficMultiplier, setTrafficMultiplier] = useState(1.3);

  // Triage state
  const [isProcessing, setIsProcessing] = useState(false);
  const [triageResult, setTriageResult] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [apiSource, setApiSource] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [userMessage, setUserMessage] = useState('');

  // Hospital selection, inspection modal & reservation
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [modalHospital, setModalHospital] = useState(null);
  const [reservationToken, setReservationToken] = useState(null);
  const [isLocking, setIsLocking] = useState(false);
  const [contentionAlert, setContentionAlert] = useState(null);

  // Has active query determines if we show the initial chat-only view or the full 2-column map view
  const hasActiveQuery = Boolean(triageResult || isProcessing || userMessage);

  const handleSaveApiKey = useCallback((key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  }, []);

  const handleResetQuery = useCallback(() => {
    setTriageResult(null);
    setUserMessage('');
    setHospitals([]);
    setSelectedHospitalId(null);
    setReservationToken(null);
    setContentionAlert(null);
    setApiError(null);
  }, []);

  const handleSubmit = useCallback(async (message) => {
    setIsProcessing(true);
    setTriageResult(null);
    setHospitals([]);
    setSelectedHospitalId(null);
    setReservationToken(null);
    setContentionAlert(null);
    setApiError(null);
    setUserMessage(message);

    try {
      // Parse with Gemini (or fallback rule engine)
      const { result, source, error } = await parseWithGemini(apiKey, message);

      setTriageResult(result);
      setApiSource(source);
      setApiError(error);

      // Evaluate hospitals against parsed clinical requirements
      const ranked = evaluateHospitals(activeCity, result, trafficMultiplier);
      setHospitals(ranked);

      // Auto-select the top non-bypass hospital
      const topAvailable = ranked.find(h => !h.isBypass);
      if (topAvailable) {
        setSelectedHospitalId(topAvailable.id);
      }
    } catch (err) {
      setApiError('Unexpected error: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  }, [apiKey, activeCity, trafficMultiplier]);

  const handleLockReservation = useCallback(async (hospitalId) => {
    setIsLocking(true);
    setContentionAlert(null);
    await new Promise(r => setTimeout(r, 1200));
    const token = generateReservationToken(hospitalId);
    setReservationToken(token);
    setIsLocking(false);
  }, []);

  // Simulate Atomic Lease Contention / Failure -> Try next hospital
  const handleSimulateFailure = useCallback((failedHospitalId) => {
    const failedHosp = hospitals.find(h => h.id === failedHospitalId);
    const available = hospitals.filter(h => h.id !== failedHospitalId && !h.isBypass);
    if (available.length > 0) {
      const nextHosp = available[0];
      setContentionAlert(`ATOMIC LEASE FAILURE at ${failedHosp?.shortName || 'facility'}. Failover routed to #${hospitals.indexOf(nextHosp) + 1}: ${nextHosp.shortName}`);
      setSelectedHospitalId(nextHosp.id);
    }
  }, [hospitals]);

  // When user picks a hospital directly from the header dropdown
  const handleSelectHospitalDropdown = useCallback((hospitalId) => {
    setSelectedHospitalId(hospitalId);
    const hospital = findHospitalById(hospitalId);
    if (hospital) {
      setModalHospital(hospital);
      for (const [rKey, rVal] of Object.entries(HEALTHCARE_REGIONS)) {
        if (rKey !== 'all_punjab' && rVal.hospitals?.some(h => h.id === hospitalId)) {
          setActiveCity(rKey);
          break;
        }
      }
    }
  }, [activeTab]);

  const region = HEALTHCARE_REGIONS[activeCity] || HEALTHCARE_REGIONS.lahore;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCity={activeCity}
        setActiveCity={(city) => {
          setActiveCity(city);
          if (triageResult) {
            const ranked = evaluateHospitals(city, triageResult, trafficMultiplier);
            setHospitals(ranked);
            const top = ranked.find(h => !h.isBypass);
            if (top) setSelectedHospitalId(top.id);
          }
        }}
        selectedHospitalId={selectedHospitalId}
        onSelectHospitalDropdown={handleSelectHospitalDropdown}
        onOpenApiSettings={() => setShowApiModal(true)}
        hasApiKey={!!effectiveApiKey}
      />

      {/* CAD Telemetry Sub-Bar Below Top Nav Bar */}
      {activeTab === 'emergency' && (
        <div style={{
          background: 'rgba(6, 17, 30, 0.92)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '5px 20px',
          position: 'sticky',
          top: '60px',
          zIndex: 950,
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            {/* Current Location & Traffic Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '4px 10px', background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
                fontSize: '0.74rem', color: '#fff', fontWeight: 600
              }}>
                <MapPin size={13} color="var(--green-400)" />
                <select
                  value={activeCity}
                  onChange={e => {
                    const city = e.target.value;
                    setActiveCity(city);
                    if (triageResult) {
                      const ranked = evaluateHospitals(city, triageResult, trafficMultiplier);
                      setHospitals(ranked);
                      const top = ranked.find(h => !h.isBypass);
                      if (top) setSelectedHospitalId(top.id);
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  <optgroup label="Punjab Province" style={{ background: 'var(--navy-800)', fontWeight: 700 }}>
                    <option value="all_punjab" style={{ background: 'var(--navy-800)' }}>📍 All Punjab (80+ Facilities)</option>
                    <option value="lahore" style={{ background: 'var(--navy-800)' }}>Lahore Division</option>
                    <option value="islamabad_rawalpindi" style={{ background: 'var(--navy-800)' }}>Rawalpindi & Islamabad</option>
                    <option value="faisalabad" style={{ background: 'var(--navy-800)' }}>Faisalabad Division</option>
                    <option value="multan" style={{ background: 'var(--navy-800)' }}>Multan Division</option>
                    <option value="gujranwala" style={{ background: 'var(--navy-800)' }}>Gujranwala Division</option>
                    <option value="sialkot" style={{ background: 'var(--navy-800)' }}>Sialkot District</option>
                    <option value="gujrat" style={{ background: 'var(--navy-800)' }}>Gujrat District</option>
                    <option value="bahawalpur" style={{ background: 'var(--navy-800)' }}>Bahawalpur & R.Y. Khan</option>
                    <option value="sargodha" style={{ background: 'var(--navy-800)' }}>Sargodha Division</option>
                    <option value="sahiwal" style={{ background: 'var(--navy-800)' }}>Sahiwal & Okara</option>
                    <option value="dg_khan" style={{ background: 'var(--navy-800)' }}>D.G. Khan & Muzaffargarh</option>
                  </optgroup>
                </select>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '4px 10px', background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
                fontSize: '0.74rem', color: '#fff', fontWeight: 600,
                fontFamily: 'var(--font-mono)'
              }}>
                <Sliders size={12} color="var(--cyan-400)" />
                <span>{trafficMultiplier.toFixed(1)}× Traffic</span>
              </div>
            </div>

            {/* Grid Cadence Telemetry */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.70rem',
              color: 'var(--text-muted)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green-400)', display: 'inline-block' }} />
                <span>Punjab CAD Grid Live</span>
              </span>
              <span>•</span>
              <span>84 Facilities Online</span>
            </div>
          </div>
        </div>
      )}

      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      {/* Hospital Telemetry Inspector Modal */}
      <HospitalDetailModal
        hospital={modalHospital}
        isOpen={!!modalHospital}
        onClose={() => setModalHospital(null)}
        onRouteHere={(h) => {
          setSelectedHospitalId(h.id);
          setActiveTab('emergency');
        }}
        onLockReservation={handleLockReservation}
        reservationToken={reservationToken}
        isLocking={isLocking}
      />

      {activeTab === 'registry' ? (
        <HospitalRegistry
          onSelectHospitalForModal={(h) => setModalHospital(h)}
          onSelectHospitalForRouting={(h) => {
            setSelectedHospitalId(h.id);
            setActiveTab('emergency');
          }}
        />
      ) : (
        /* EMERGENCY TRIAGE WORKFLOW */
        !hasActiveQuery ? (
          /* ============================================================
             INITIAL STATE: Tactical Dispatch Console (No AI Fluff)
             ============================================================ */
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 20px',
            maxWidth: '780px',
            margin: '0 auto',
            width: '100%'
          }}>

            {/* Official Co-Branding Logos */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '18px'
            }}>
              <img
                src="/logo-alkhidmat-white-text.png"
                alt="Alkhidmat Foundation Pakistan"
                style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
              />
              <div style={{ width: '1px', height: '24px', background: 'var(--border-medium)' }} />
              <img
                src="/logo-alibaba-enhanced.png"
                alt="Alibaba Cloud"
                style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#fff',
              textAlign: 'center',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Emergency Dispatch & Triage Console
            </h1>

            {/* Concise Subtitle */}
            <p style={{
              fontSize: '0.86rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              margin: '0 0 20px'
            }}>
              Real-time hospital capacity routing for Alkhidmat 1023 fleet across Punjab.
            </p>

            {/* Terminal Container */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Channel Mode Selector (TOP RIGHT above Chat Input) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                marginBottom: '2px'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--bg-input)',
                  padding: '3px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {[
                    { key: 'citizen', label: 'Citizen Channel', icon: User },
                    { key: 'paramedic', label: 'Paramedic 1122 CAD', icon: Stethoscope }
                  ].map(m => {
                    const isActive = mode === m.key;
                    return (
                      <button
                        key={m.key}
                        onClick={() => setMode(m.key)}
                        style={{
                          padding: '6px 12px',
                          background: isActive ? (m.key === 'citizen' ? 'var(--navy-600)' : 'var(--green-600)') : 'transparent',
                          color: isActive ? '#fff' : 'var(--text-muted)',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          transition: 'all 0.15s ease',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.76rem',
                          fontWeight: 700
                        }}
                      >
                        <m.icon size={13} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tactical Chat Input Component */}
              <ChatInput mode={mode} onSubmit={handleSubmit} isProcessing={isProcessing} />
            </div>
          </div>
        ) : (
          /* ============================================================
             ACTIVE STATE: Emergency Operations Center (2-Column Grid)
             ============================================================ */
          <div style={{
            flex: 1,
            maxWidth: '1600px',
            margin: '0 auto',
            width: '100%',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: '440px 1fr',
            gap: '20px',
            minHeight: 'calc(100vh - 60px)'
          }}>
            {/* Left Panel: Input, Actions & Triage Ranking */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 90px)',
              paddingRight: '6px'
            }}>
              
              {/* Back / Reset Action Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)'
              }}>
                <button
                  onClick={handleResetQuery}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '5px 10px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cyan-400)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <ArrowLeft size={13} />
                  <span>Terminal Reset / New Intake</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{region.name}</span>
                  <span>•</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{trafficMultiplier.toFixed(1)}× Traffic</span>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {[
                    { key: 'citizen', label: 'Citizen View', icon: User },
                    { key: 'paramedic', label: 'Paramedic 1122 CAD', icon: Stethoscope }
                  ].map(m => {
                    const isActive = mode === m.key;
                    return (
                      <button
                        key={m.key}
                        onClick={() => setMode(m.key)}
                        style={{
                          padding: '8px 12px',
                          background: isActive ? (m.key === 'citizen' ? 'var(--navy-600)' : 'var(--green-600)') : 'transparent',
                          color: isActive ? '#fff' : 'var(--text-muted)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-sans)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <m.icon size={13} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Traffic Multiplier Slider */}
              <div className="card" style={{ padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Sliders size={12} /> Traffic Multiplier
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem', fontWeight: 700,
                    color: trafficMultiplier > 1.5 ? 'var(--red-500)' : (trafficMultiplier > 1.2 ? 'var(--amber-500)' : 'var(--green-400)')
                  }}>
                    {trafficMultiplier.toFixed(1)}×
                  </span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={trafficMultiplier}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setTrafficMultiplier(val);
                    if (triageResult) {
                      const ranked = evaluateHospitals(activeCity, triageResult, val);
                      setHospitals(ranked);
                    }
                  }}
                />
              </div>

              {/* Incident Input for Refinement */}
              <ChatInput mode={mode} onSubmit={handleSubmit} isProcessing={isProcessing} />

              {/* Incident Transmission Log */}
              {userMessage && (
                <div style={{
                  padding: '9px 12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.76rem', color: 'var(--cyan-300)',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px'
                }}>
                  <Radio size={13} color="var(--cyan-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>TRANSMISSION: "{userMessage}"</span>
                </div>
              )}

              {/* Hospital Results */}
              <HospitalCards
                triageResult={triageResult}
                hospitals={hospitals}
                apiSource={apiSource}
                apiError={apiError}
                selectedHospitalId={selectedHospitalId}
                onSelectHospital={setSelectedHospitalId}
                onLockReservation={handleLockReservation}
                reservationToken={reservationToken}
                isLocking={isLocking}
                mode={mode}
                onSimulateFailure={handleSimulateFailure}
                contentionAlert={contentionAlert}
              />
            </div>

            {/* Right Panel: Map */}
            <div className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative', minHeight: '560px' }}>
              {/* Map Header Overlay */}
              <div style={{
                position: 'absolute', top: '12px', left: '12px', zIndex: 500,
                background: 'rgba(6, 17, 30, 0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-md)',
                padding: '7px 12px',
                border: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                <MapPin size={13} color="var(--green-400)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>
                  {region.name || 'Punjab'}
                </span>
                <span style={{ fontSize: '0.66rem', color: 'var(--green-400)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  {region.hospitals?.length || 0} Facilities
                </span>
                {hospitals.length > 0 && (
                  <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                    {hospitals.filter(h => !h.isBypass).length} Open for Triage
                  </span>
                )}
              </div>

              {/* Top Right Quick Hospital Directory Button */}
              <div style={{
                position: 'absolute', top: '12px', right: '12px', zIndex: 500
              }}>
                <button
                  onClick={() => setActiveTab('registry')}
                  style={{
                    background: 'rgba(6, 17, 30, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: '#fff',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Building2 size={12} color="var(--green-400)" />
                  <span>Browse 80+ Facilities</span>
                </button>
              </div>

              <DecisionMap
                hospitals={hospitals}
                regionHospitals={region?.hospitals}
                selectedHospitalId={selectedHospitalId}
                center={region?.center}
                zoom={region?.zoom}
                onSelectHospital={setSelectedHospitalId}
                onOpenHospitalModal={(h) => setModalHospital(h)}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
