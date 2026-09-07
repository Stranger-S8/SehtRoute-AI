import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import HospitalCards from './components/HospitalCards';
import DecisionMap from './components/DecisionMap';
import HospitalRegistry from './components/HospitalRegistry';
import HospitalDetailModal from './components/HospitalDetailModal';
import PitchDeck from './components/PitchDeck';
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
  Sparkles
} from 'lucide-react';

function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('emergency'); // 'emergency' | 'registry' | 'deck'
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
      setContentionAlert(`⚠️ ATOMIC LEASE FAILURE at ${failedHosp?.shortName || 'facility'}. Automated Failover: Routing to #${hospitals.indexOf(nextHosp) + 1}: ${nextHosp.shortName}`);
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
      if (activeTab === 'deck') {
        setActiveTab('emergency');
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

      {activeTab === 'deck' ? (
        <PitchDeck />
      ) : activeTab === 'registry' ? (
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
             INITIAL STATE: Minimal, Clean, Brand-Focused Emergency Intake
             ============================================================ */
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 20px',
            maxWidth: '740px',
            margin: '0 auto',
            width: '100%'
          }}>
            {/* Co-Branding Logos: Alkhidmat Foundation & Alibaba Cloud */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              marginBottom: '16px'
            }}>
              <img
                src="/logo-alkhidmat-enhanced.png"
                alt="Alkhidmat Foundation Pakistan"
                style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
              />
              <div style={{ width: '1px', height: '28px', background: 'var(--gray-300)' }} />
              <img
                src="/logo-alibaba-enhanced.png"
                alt="Alibaba Cloud"
                style={{ height: '26px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--navy-900)',
              textAlign: 'center',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Emergency Triage & Dispatch
            </h1>

            {/* Simple, Non-AI Subtitle */}
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--gray-500)',
              textAlign: 'center',
              margin: '0 0 20px'
            }}>
              Real-time hospital capacity routing for Alkhidmat emergency fleet across Punjab.
            </p>

            {/* Intake Box Container */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Mode & City Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '10px',
                alignItems: 'center'
              }}>
                {/* Mode Selector */}
                <div className="card" style={{ padding: '3px', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--navy-50)' }}>
                  {[
                    { key: 'citizen', label: 'Citizen', icon: User },
                    { key: 'paramedic', label: 'Paramedic 1122', icon: Stethoscope }
                  ].map(m => {
                    const isActive = mode === m.key;
                    return (
                      <button
                        key={m.key}
                        onClick={() => setMode(m.key)}
                        style={{
                          padding: '7px 12px',
                          background: isActive ? (m.key === 'citizen' ? 'var(--navy-800)' : 'var(--green-600)') : 'transparent',
                          color: isActive ? '#fff' : 'var(--gray-600)',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          transition: 'all 0.15s ease',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}
                      >
                        <m.icon size={14} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* City & Traffic Quick Badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '7px 10px', background: 'var(--white)',
                    border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)',
                    fontSize: '0.76rem', color: 'var(--navy-800)', fontWeight: 600
                  }}>
                    <MapPin size={13} color="var(--green-600)" />
                    <span>{region.name}</span>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '7px 10px', background: 'var(--white)',
                    border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)',
                    fontSize: '0.76rem', color: 'var(--navy-800)', fontWeight: 600
                  }}>
                    <Sliders size={12} color="var(--navy-500)" />
                    <span>{trafficMultiplier.toFixed(1)}× Traffic</span>
                  </div>
                </div>
              </div>

              {/* Chat Input Component */}
              <ChatInput mode={mode} onSubmit={handleSubmit} isProcessing={isProcessing} />

              {/* Compact Quick Test Chips (1-Click) */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginRight: '4px' }}>
                  Quick:
                </span>
                {[
                  { label: '🫀 Chest Pain / STEMI', text: 'Severe crushing chest pain radiating to left arm & sweating (55M)' },
                  { label: '🚗 Trauma / Crash', text: 'Road accident on Canal Road, severe head bleeding and unconscious patient' },
                  { label: '🧠 Stroke (CVA)', text: 'Sudden slurred speech, facial droop right side, onset 20 mins ago' },
                  { label: '🫁 Breathing Trouble', text: 'Patient gasping for air, SpO2 81%, asthma history, cyanotic lips' },
                  { label: '👶 Child High Fever', text: 'Bacha 8 mahine ka hai, shadeed 104°F bukhar aur jhatkay lag rahe hain' },
                  { label: '🔥 Severe Burns', text: 'Kitchen gas cylinder burst, 40% body burns, patient conscious in severe pain' }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(preset.text)}
                    style={{
                      padding: '5px 11px',
                      background: 'var(--white)',
                      border: '1px solid var(--gray-300)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.73rem',
                      fontWeight: 600,
                      color: 'var(--navy-700)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--navy-500)'; e.currentTarget.style.background = 'var(--navy-50)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.background = 'var(--white)'; }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Clean Footer */}
              <div style={{
                marginTop: '16px',
                textAlign: 'center',
                fontSize: '0.72rem',
                color: 'var(--gray-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px'
              }}>
                <span>Alkhidmat 1023 Fleet</span>
                <span>•</span>
                <span>80+ Tertiary Facilities</span>
                <span>•</span>
                <span>Alibaba Cloud Healthcare AI</span>
              </div>

            </div>
          </div>
        ) : (
          /* ============================================================
             ACTIVE STATE: Emergency Command Center (2-Column Grid)
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
                background: 'var(--navy-50)',
                border: '1px solid var(--navy-100)',
                borderRadius: 'var(--radius-md)'
              }}>
                <button
                  onClick={handleResetQuery}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--white)',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '5px 10px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: 'var(--navy-800)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--navy-500)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                >
                  <ArrowLeft size={13} />
                  <span>New Emergency / Back</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--gray-600)' }}>
                  <span style={{ fontWeight: 600 }}>{region.name}</span>
                  <span>•</span>
                  <span>{trafficMultiplier.toFixed(1)}× Traffic</span>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {[
                    { key: 'citizen', label: 'Citizen', icon: User },
                    { key: 'paramedic', label: 'Paramedic 1122', icon: Stethoscope }
                  ].map(m => {
                    const isActive = mode === m.key;
                    return (
                      <button
                        key={m.key}
                        onClick={() => setMode(m.key)}
                        style={{
                          padding: '8px 12px',
                          background: isActive ? (m.key === 'citizen' ? 'var(--navy-800)' : 'var(--green-600)') : 'var(--white)',
                          color: isActive ? '#fff' : 'var(--gray-500)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-sans)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <m.icon size={14} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Traffic Multiplier Slider */}
              <div className="card" style={{ padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Sliders size={12} /> Traffic Multiplier
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem', fontWeight: 700,
                    color: trafficMultiplier > 1.5 ? 'var(--red-500)' : (trafficMultiplier > 1.2 ? 'var(--amber-500)' : 'var(--green-600)')
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

              {/* Chat Input for Refinement */}
              <ChatInput mode={mode} onSubmit={handleSubmit} isProcessing={isProcessing} />

              {/* User Message Echo */}
              {userMessage && (
                <div style={{
                  padding: '9px 12px',
                  background: 'var(--navy-50)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--navy-100)',
                  fontSize: '0.78rem', color: 'var(--navy-700)',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px'
                }}>
                  <span>💬</span>
                  <span>"{userMessage}"</span>
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
                background: 'rgba(11, 37, 69, 0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-md)',
                padding: '7px 12px',
                display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <MapPin size={14} color="var(--green-400)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>
                  {region.name || 'Punjab'}
                </span>
                <span style={{ fontSize: '0.66rem', color: 'var(--green-400)', fontWeight: 600 }}>
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
                    background: 'rgba(11, 37, 69, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)',
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
                  <Building2 size={13} color="var(--green-400)" />
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
