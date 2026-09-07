# SehatRoute AI (صحت روٹ)
### Capacity-Aware Emergency Patient Routing & Dispatch Engine
**Partnered with Alkhidmat Foundation (1023 Fleet) & Powered by Alibaba Cloud**

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Overview

In Pakistan's urban healthcare ecosystem, emergency medical dispatch has traditionally routed ambulances to the **geographically closest** hospital. However, in major cities like Lahore, Rawalpindi, and Multan, public tertiary emergency departments routinely operate at **130–160% capacity (NEDOCS Level 5/6)**. 

Patients arriving at saturated facilities experience offload delays of 30–60 minutes or are turned away due to missing specialized equipment (e.g., Cath Labs, neuro-trauma suites, pediatric ICUs), resulting in fatal secondary transfers.

**SehatRoute AI** resolves the "closest-hospital trap" by calculating **TTDC (Total Time to Definitive Care)**:

$$\text{TTDC} = T_{\text{transit}} + T_{\text{offload}} + P_{\text{capacity}}$$

Where:
- $T_{\text{transit}}$ = Live traffic-calibrated travel time.
- $T_{\text{offload}}$ = Predictive emergency room queue delay derived from NEDOCS telemetry.
- $P_{\text{capacity}}$ = Hard clinical feasibility gate ($\infty$ if mandatory diagnostic/surgical facility is absent; $0$ if confirmed available).

---

## Key Features

- **Urdu & English Clinical Intake**: Accepts plain English, Urdu, or Roman Urdu descriptions (e.g., *"Mere abbu ka seena dukh raha hai"*). Extracts clinical urgency, ESI level, and required medical facilities using Google Gemini AI with instant rule-based fallback.
- **Dynamic Leaflet Command Center**: Minimalist chat intake that dynamically expands into a 2-column tactical emergency operations center with live routing polylines and capacity markers.
- **80+ Punjab Tertiary Registry**: Comprehensive dataset covering public teaching institutions (Mayo, Jinnah, PIC, Holy Family, Nishtar), private trust hospitals (Doctors, Shaukat Khanum, Shalamar), and military facilities (CMH) across all 10 Punjab administrative divisions.
- **Atomic Capacity Lease & Failover**: Simulates 15-minute resource locks for verified Alkhidmat ambulances to prevent bed-race contention, with automated failover routing if a hospital reaches saturation during transit.
- **Two-Tier Architecture (Citizen vs. Paramedic)**:
  - **Citizen View**: Triage guidance and facility transparency without direct hospital resource locking.
  - **Paramedic / 1122 View**: Pre-hospital vitals integration, clinical presets, pre-arrival hospital alerts, and atomic bed reservation.

---

## Architecture

```
                       EMERGENCY EVENT
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
        Citizen Intake                Paramedic 1122
        (Urdu / English)             (Vitals & Presets)
               │                             │
               └──────────────┬──────────────┘
                              ▼
                   Clinical Triage Layer
                (Google Gemini 2.5 Flash /
                  Built-in Rule Engine)
                              │
                              ▼
                     TTDC Ranking Engine
             [Transit Time + ER Offload Delay]
                              │
                              ▼
                 Hospital Capacity Registry
              (80+ Public & Private Facilities)
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       Recommendation Only          Atomic Capacity Lease
        (Public / Citizen)          (Alkhidmat Fleet 1023)
```

---

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sehatroute-ai.git
   cd sehatroute-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: If no API key is provided, SehatRoute automatically operates using its built-in emergency clinical rule engine without disruption).*

4. **Launch Local Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## Project Structure

```
├── docs/                      # Architectural specs & feasibility dossiers
│   ├── SYSTEM_ARCHITECTURE_FLOW.md
│   ├── MVP_BLUEPRINT.md
│   └── FEASIBILITY_GROUNDED_DOSSIER.md
├── public/                    # Logos, emblems, and static assets
│   ├── logo-alkhidmat-white-text.png
│   ├── logo-alkhidmat-enhanced.png
│   └── logo-alibaba-enhanced.png
├── src/
│   ├── components/            # React UI components
│   │   ├── Header.jsx         # Navigation, regional switch & logos
│   │   ├── ChatInput.jsx      # Urdu / English triage input box
│   │   ├── HospitalCards.jsx  # TTDC ranked facilities & lease actions
│   │   ├── DecisionMap.jsx    # Interactive Leaflet command map
│   │   ├── HospitalRegistry.jsx # Searchable 80+ Punjab hospital registry
│   │   ├── HospitalDetailModal.jsx # Telemetry & equipment inspector
│   │   ├── PitchDeck.jsx      # Interactive executive slide presentation
│   │   └── ApiKeyModal.jsx    # Client-side API key configuration
│   ├── data/
│   │   └── hospitalsData.js   # 80+ validated hospital facilities across Punjab
│   ├── utils/
│   │   ├── geminiApi.js       # Gemini 2.5 Flash clinical extraction & fallback
│   │   └── ttdcEngine.js      # Travel Time + Door-to-Doctor ranking engine
│   ├── App.jsx                # Core application controller
│   ├── index.css              # Design system & tokens
│   └── main.jsx               # Entry point
├── .env.example               # Environment template
├── .gitignore                 # Excludes secrets, deck materials & builds
├── package.json
└── vite.config.js
```

---

## Security & Privacy

- **Zero PHI Retained**: Patient symptom queries are evaluated statelessly in memory and never persisted to external databases.
- **Client-Side Secrets**: Environment variables (`VITE_GEMINI_API_KEY`) stay strictly on the client browser. No backend proxy retains your API tokens.
- **Deterministic Safeguards**: If the external AI service experiences rate limits or network downtime, the system fails over to a local deterministic clinical rule engine ensuring zero emergency dispatch blackout.

---

## Partners & Acknowledgements

- **Alkhidmat Foundation Pakistan**: 1023 Emergency Ambulance Service Network.
- **Alibaba Cloud**: Healthcare Cloud Infrastructure & AI Compute Partner.
- **Government of Punjab**: Primary & Secondary Healthcare Department facility benchmarks.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
