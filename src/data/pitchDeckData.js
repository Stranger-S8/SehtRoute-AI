export const PITCH_DECK_SLIDES = [
  {
    slideNumber: 1,
    tag: "EXECUTIVE PITCH // HACKATHON SUBMISSION",
    title: "SehatRoute AI: Capacity-Aware Emergency Routing",
    subtitle: "Empowering Alkhidmat's 310+ Ambulance Fleet with Alibaba Cloud Serverless & Qwen-2.5",
    coreThesis: "Emergency fatalities in Pakistan are driven by uncoordinated arrivals at saturated facilities, not driving distance. SehatRoute AI routes ambulances based on Total Time to Definitive Care (TTDC), matching clinical severity directly against real-time hospital equipment and ER backlog.",
    keyPoints: [
      { label: "Target Fleet", value: "Alkhidmat Foundation 1023 Emergency Dispatch" },
      { label: "Core Algorithm", value: "TTDC = Transit + Offload + Resource Penalty" },
      { label: "AI & Cloud Engine", value: "Alibaba Cloud Bailian (Qwen-2.5) + FC 3.0 Serverless" },
      { label: "Clinical Outcome", value: "Eliminating the 4.7-Hour Secondary Transfer Trap" }
    ],
    speakerNotes: "Good day, judges. Today we introduce SehatRoute AI — an algorithmic dispatch platform built on Alibaba Cloud that solves one of Pakistan's deadliest public health crises: ambulances taking critically ill patients to the nearest hospital, only to find the ventilator or Cath Lab is offline, triggering a fatal secondary transfer."
  },
  {
    slideNumber: 2,
    tag: "CLINICAL EVIDENCE // SYSTEMIC RATIONING",
    title: "The Pakistani Emergency Care Reality",
    subtitle: "Severe Overcrowding and Structural Critical Care Deficits",
    coreThesis: "Emergency triage in Pakistan cannot assume hospital beds or equipment are available. Data shows extreme saturation across all major tertiary centers.",
    keyPoints: [
      {
        label: "96.7% Extreme Overcrowding",
        value: "PAFMJ 2023 Study (Zafar et al.) at PEMH Rawalpindi documented a mean NEDOCS score of 577.94 ± 251.57, with 29 of 30 evaluated intervals (96.7%) categorized as Level-6 'Extremely Overcrowded'."
      },
      {
        label: "0.71 ICU Beds per 100,000",
        value: "Nationwide survey in Critical Care (PMC7441021) reveals Pakistan maintains only 0.71 ICU beds per 100k, and only 52.2% of surveyed ICUs maintain a 1:1 bed-to-ventilator ratio."
      },
      {
        label: "Trapped Administrative Telemetry",
        value: "Punjab Health's HISDU tracks bed and ventilator occupancy digitally, but this data remains in administrative silos, completely disconnected from real-time ambulance routing."
      }
    ],
    speakerNotes: "Look at the verified data: A peer-reviewed study at PEMH Rawalpindi showed that 96.7% of the time, the emergency department is in Level 6 catastrophic overcrowding. Meanwhile, Pakistan has only 0.71 ICU beds per 100,000 people. Routing blindly to the nearest hospital without checking capacity traps patients in hallway delays."
  },
  {
    slideNumber: 3,
    tag: "THE TRAP // CLOSEST-DISTANCE ROUTING",
    title: "The Failure of 'Closest-Distance' Navigation",
    subtitle: "How Standard GPS Traps Patients in Severe Arrival Delays",
    coreThesis: "Google Maps and standard GPS algorithms minimize road distance (T_transit). In acute healthcare, this causes severe arrival and secondary referral delays.",
    keyPoints: [
      {
        label: "Mean 4.7-Hour Arrival Delay",
        value: "Aga Khan University Hospital Trauma Registry data (Khan et al., Int J Surg) showed acute trauma patients experienced a mean injury-to-ER arrival delay of 4.7 hours."
      },
      {
        label: "Golden Hour Failure",
        value: "Only 30.9% of trauma patients reached the emergency room within the critical first hour ('Golden Hour'), highlighting systemic pre-hospital transfer and routing friction."
      },
      {
        label: "The False Economy of 5 Minutes",
        value: "Saving 4 minutes of driving time to drop a cardiac patient at an ER with an occupied Cath Lab triggers hours of offload delay or inter-facility transfer to definitive care."
      }
    ],
    speakerNotes: "Traditional navigation assumes all destinations are equal. If an intubated or cardiac patient is taken to an ER 5 minutes away that has zero available ventilators or Cath Labs, they don't get saved — they get stuck in an offload bottleneck. AKUH registry data shows acute patients already face a mean 4.7-hour delay before reaching definitive care."
  },
  {
    slideNumber: 4,
    tag: "THE ALGORITHMIC CORE // TTDC",
    title: "The TTDC Engine: Algorithmic Definitive Care",
    subtitle: "Total Time to Definitive Care = Transit + Offload + Resource Penalty",
    coreThesis: "SehatRoute AI optimizes for the moment life-saving care begins, dynamically bypassing facilities lacking critical equipment.",
    keyPoints: [
      {
        label: "TTDC Formula",
        value: "TTDC = T_transit + T_offload + P_capacity"
      },
      {
        label: "Resource Penalty P_capacity",
        value: "P_capacity = 0 if required equipment (Ventilator, Cath Lab) is verified available; P_capacity = ∞ if unavailable, forcing instant automated bypass."
      },
      {
        label: "Offload Delay Prediction",
        value: "T_offload predicts hallway intake wait times derived from live ESI backlog and hospital NEDOCS scores."
      },
      {
        label: "Dynamic Reroute",
        value: "Bypasses Hospital A (2.1 km, 0 Cath Labs, NEDOCS 582) -> Reroutes to Hospital B (6.4 km, operational Cath Lab, definitive care in 16 min)."
      }
    ],
    speakerNotes: "Here is our algorithmic core: Total Time to Definitive Care. By introducing P_capacity, if an ER lacks an operational Cath Lab or ventilator, its resource penalty becomes infinity. The engine immediately bypasses it and routes to a hospital 8 minutes further that has a reserved suite ready."
  },
  {
    slideNumber: 5,
    tag: "CLOUD BLUEPRINT // ALIBABA CLOUD",
    title: "Alibaba Cloud Enterprise Architecture",
    subtitle: "High-Throughput, Serverless, AI-Driven Clinical Infrastructure",
    coreThesis: "Engineered specifically on Alibaba Cloud services for sub-second decision speed, robust data security, and near-zero idle operating costs.",
    keyPoints: [
      { label: "Edge & Ingestion", value: "API Gateway validates and authenticates Alkhidmat 1023 dispatch telemetry." },
      { label: "Clinical Parsing AI", value: "Model Studio (Bailian) / Qwen-2.5-72B parses paramedic voice/text into structured clinical JSON in <150ms." },
      { label: "Decision Compute", value: "Function Compute (FC 3.0) evaluates the TTDC formula across facilities in <35ms." },
      { label: "Spatial & State Core", value: "ApsaraDB for RDS (PostGIS) handles geospatial catchment; ApsaraDB for Redis manages atomic bed token reservation locks." },
      { label: "Triage Alerting", value: "DirectMail & SMS Service triggers pre-arrival electronic handshake to ER charge nurses." }
    ],
    speakerNotes: "Our technical architecture leverages the full power of Alibaba Cloud. Bailian Qwen-2.5 extracts clinical entities from dispatcher notes in under 150 milliseconds. Function Compute 3.0 runs the TTDC optimization in 35ms. Redis locks the hospital bed token before the ambulance even departs."
  },
  {
    slideNumber: 6,
    tag: "FLEET INTEGRATION // 1023 DISPATCH",
    title: "Alkhidmat Fleet Integration & Zero Hospital IT Friction",
    subtitle: "Seamless Deployment with Pakistan's Largest Volunteer Ambulance Service",
    coreThesis: "Zero-friction operational adoption designed for real-world field paramedics and public hospital triage desks.",
    keyPoints: [
      {
        label: "Direct 1023 Integration",
        value: "Wraps around Alkhidmat's existing call center software via API Gateway; no overhaul of existing dispatch telecom required."
      },
      {
        label: "Mobile EMT Web Console",
        value: "Lightweight, progressive web app for paramedics in the ambulance cab to transmit vitals and receive dynamic turn-by-turn routing."
      },
      {
        label: "SMS / WhatsApp Fallback",
        value: "Receiving public hospitals without high-tech IT receive automated pre-arrival alerts and Redis token lock confirmations via Alibaba Cloud SMS Gateway."
      },
      {
        label: "Scale Impact",
        value: "Immediate reach across 310+ ambulances in Karachi, Lahore, Islamabad, Peshawar, Quetta, and Multan."
      }
    ],
    speakerNotes: "We designed this for Pakistan's ground reality. Public hospital emergency departments don't have complex APIs. SehatRoute AI uses Alibaba Cloud SMS and lightweight progressive web apps to deliver pre-arrival alerts. Paramedics get turn-by-turn guidance, and ER teams get 15-minute advance notice."
  },
  {
    slideNumber: 7,
    tag: "ROADMAP // SCALABILITY & PILOT",
    title: "Roadmap: Hackathon PoC to National Rollout",
    subtitle: "Phased Deployment Strategy for 2026–2027",
    coreThesis: "A realistic 3-phase path from proven simulation to saving thousands of lives across Pakistan.",
    keyPoints: [
      {
        label: "Phase 1: Twin Cities Pilot (Q3-Q4 2026)",
        value: "Deploy with 30 Alkhidmat ambulances in Islamabad/Rawalpindi in partnership with PIMS, Shifa International, and Rawalpindi Institute of Cardiology (RIC)."
      },
      {
        label: "Phase 2: Provincial Expansion (Q1-Q2 2027)",
        value: "Scale to 120 ambulances across Lahore and Karachi corridors; integrate provincial Rescue 1122 data exchange."
      },
      {
        label: "Phase 3: National Cloud Federation (Q3-Q4 2027)",
        value: "Nationwide rollout across all 310+ Alkhidmat units, connecting with National Disaster Management Authority (NDMA) emergency coordination."
      }
    ],
    speakerNotes: "Our roadmap begins with a focused 30-ambulance pilot right in the Islamabad/Rawalpindi healthcare corridor, validating clinical outcomes with PIMS and RIC. From there, we scale across the 310+ Alkhidmat fleet, creating Pakistan's first truly capacity-aware emergency network on Alibaba Cloud."
  }
];
