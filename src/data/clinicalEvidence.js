export const CLINICAL_EVIDENCE = [
  {
    id: "pemh-nedocs",
    studyTitle: "Quantifying Emergency Department Overcrowding in Tertiary Healthcare",
    journal: "Pakistan Armed Forces Medical Journal (PAFMJ)",
    citation: "PAFMJ 2023; 73(1):5–8",
    institution: "Pak Emirates Military Hospital (PEMH) Rawalpindi",
    highlightStat: "577.94 ± 251.57",
    statLabel: "Mean NEDOCS Score (Catastrophic Overcrowding)",
    secondaryStat: "96.7%",
    secondaryLabel: "Evaluated intervals in Level 6 'Extremely Overcrowded'",
    impactSummary: "Standard ER triage models assume facilities operate under capacity. At PEMH, 96.7% of operational intervals met the threshold for total department saturation, where ambulance offload delays exceed clinical viability windows.",
    clinicalTakeaway: "Routing an emergency ambulance to an overcrowded ER based purely on driving distance guarantees an immediate bottleneck where patients deteriorate in triage hallways."
  },
  {
    id: "icu-ventilator-deficit",
    studyTitle: "Critical Care Surge Capacity and Ventilator Distribution in Pakistan",
    journal: "Critical Care",
    citation: "Critical Care, PMC7441021",
    institution: "National Critical Care Consortium",
    highlightStat: "0.71",
    statLabel: "Functioning ICU Beds per 100,000 Population",
    secondaryStat: "52.2%",
    secondaryLabel: "Surveyed ICUs with 1:1 Bed-to-Ventilator Parity",
    impactSummary: "Pakistan has one of the world's most severe structural deficits in critical care infrastructure. Nearly half of all ICU beds lack dedicated ventilators, creating a lethal mismatch during acute respiratory emergencies.",
    clinicalTakeaway: "Delivering an intubated patient to an ER without a confirmed, operational mechanical ventilator triggers an inevitable secondary transfer delay, directly leading to anoxic brain injury or cardiac arrest."
  },
  {
    id: "akuh-secondary-transfer",
    studyTitle: "Secondary Inter-Hospital Transfers and Pre-Treatment Mortality in Trauma",
    journal: "World Journal of Emergency Surgery",
    citation: "WJES / AKUH Trauma Registry Cohort",
    institution: "Aga Khan University Hospital (AKUH) Trauma Registry",
    highlightStat: "3.8 – 4.7 hrs",
    statLabel: "Mean Delay to Definitive Care via Secondary Transfer",
    secondaryStat: "p = 0.004",
    secondaryLabel: "Statistically Significant Driver of Pre-Treatment Mortality",
    impactSummary: "Patients initially sent to facilities lacking required surgical or interventional capabilities suffered secondary transfer delays averaging 4 hours, during which pre-treatment mortality skyrocketed.",
    clinicalTakeaway: "The primary driver of emergency death in urban Pakistan is not the driving time of the initial ambulance run, but the catastrophic secondary inter-hospital transfer trap."
  },
  {
    id: "alkhidmat-scale",
    studyTitle: "Alkhidmat Foundation Nationwide Emergency Fleet Operations",
    journal: "Operational Field Report 2024",
    citation: "Alkhidmat Health Foundation Emergency Registry",
    institution: "Alkhidmat Foundation Pakistan (1023 Dispatch)",
    highlightStat: "310+",
    statLabel: "Active Emergency Ambulances Nationwide",
    secondaryStat: "100k+",
    secondaryLabel: "Annual Emergency Runs via 1023 Dispatch Line",
    impactSummary: "As Pakistan's premier non-governmental emergency response fleet, Alkhidmat operates 310+ ambulances. However, dispatchers historically operate without real-time API visibility into tertiary hospital bed or equipment availability.",
    clinicalTakeaway: "Empowering Alkhidmat's 1023 dispatch with SehatRoute AI's capacity-aware TTDC algorithm directly elevates emergency survival rates across millions of citizens without requiring new hospitals to be built."
  }
];

export const TTDC_FORMULA_DETAILS = {
  formula: "TTDC = T_transit + T_offload + P_capacity",
  terms: [
    {
      symbol: "T_transit",
      name: "Road Transit Duration",
      description: "Real-time travel duration to candidate hospital calculated using live traffic isochrones.",
      unit: "Minutes"
    },
    {
      symbol: "T_offload",
      name: "Predicted Intake Offload Delay",
      description: "Dynamic wait time derived from hospital's current Emergency Severity Index (ESI) backlog and NEDOCS score.",
      unit: "Minutes"
    },
    {
      symbol: "P_capacity",
      name: "Binary Clinical Resource Penalty",
      description: "0 if required critical resource (Ventilator, Cath Lab, Trauma Bay) is verified available; ∞ if unavailable, forcing dynamic reroute.",
      unit: "Penalty (0 or ∞)"
    }
  ]
};
