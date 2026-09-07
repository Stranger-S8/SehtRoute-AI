export const CLINICAL_SCENARIOS = [
  {
    id: "stemi-cathlab",
    title: "Acute STEMI / Myocardial Infarction",
    patient: "Male, 45 yrs",
    chiefComplaint: "Crushing retrosternal chest pain (9/10), diaphoresis, dyspnea",
    voiceTranscript: "Ambulance Unit 1023-ISB dispatch: Male, age 45, acute myocardial infarction with severe ST elevations in inferior leads II, III, aVF. Hypotensive at 88/56, HR 112 bpm. Patient is in cardiogenic shock threshold, requires immediate Primary PCI and operational Cath Lab suite within 90 minutes door-to-balloon window.",
    category: "Cardiology",
    vitalSigns: {
      bp: "88/56 mmHg",
      hr: "112 bpm",
      spo2: "92% (on nasal cannula)",
      gcs: "14/15",
      respRate: "26 /min"
    },
    bailianExtraction: {
      esi_tier: 1,
      chief_complaint: "Acute Inferior Wall STEMI",
      specialty_required: "interventional_cardiology",
      required_resources: ["cath_lab", "interventional_cardiologist", "cardiac_icu_bed"],
      requires_ventilator: false,
      hemodynamic_stability: "unstable",
      critical_window_mins: 90,
      protocol_code: "PAK-CARD-1023",
      clinical_rationale: "Requires immediate percutaneous coronary intervention (PCI). Transferring to facility with offline Cath Lab guarantees secondary inter-hospital transfer, exceeding 90-min ischemic necrosis threshold."
    }
  },
  {
    id: "ards-ventilator",
    title: "Severe Respiratory Failure / Intubated ARDS",
    patient: "Male, 62 yrs",
    chiefComplaint: "GCS 7, acute hypoxic respiratory collapse, SpO2 74%",
    voiceTranscript: "Unit 1023-ISB: 62-year-old male, GCS 7, profound respiratory failure, cyanotic with SpO2 74% on high-flow mask. Patient has been intubated in-field with ET tube #7.5, currently bagged. Requires tertiary ICU bed with operational invasive mechanical ventilator and intensivist coverage.",
    category: "Pulmonology / Critical Care",
    vitalSigns: {
      bp: "145/95 mmHg",
      hr: "128 bpm",
      spo2: "78% (bagged 100% FiO2)",
      gcs: "7/15",
      respRate: "34 /min (manual)"
    },
    bailianExtraction: {
      esi_tier: 1,
      chief_complaint: "Acute Hypoxic Respiratory Failure (Intubated)",
      specialty_required: "pulmonary_critical_care",
      required_resources: ["mechanical_ventilator", "tertiary_icu_bed", "intensivist_on_call"],
      requires_ventilator: true,
      hemodynamic_stability: "critical",
      critical_window_mins: 30,
      protocol_code: "PAK-RESP-1023",
      clinical_rationale: "Critical Care (PMC7441021) documents nationwide 0.71 ICU beds/100k and only 52.2% ventilator parity. Routing to an ER without an open ventilator guarantees lethal offload delay."
    }
  },
  {
    id: "polytrauma-neuro",
    title: "Massive Polytrauma & Intracranial Hemorrhage",
    patient: "Female, 28 yrs",
    chiefComplaint: "High-velocity road collision, unhelmeted, anisocoria",
    voiceTranscript: "1023 Emergency: 28-year-old female, high-speed motorcycle crash. Unresponsive, GCS 6, right pupil 6mm non-reactive (blown pupil), left pupil 3mm. Severe pelvic instability, active hemorrhage, BP 76/44. Requires Level-1 Trauma resuscitation bay, emergency CT angio, and on-call neurosurgery craniotomy team.",
    category: "Trauma / Neurosurgery",
    vitalSigns: {
      bp: "76/44 mmHg",
      hr: "138 bpm (thready)",
      spo2: "89%",
      gcs: "6/15 (Anisocoria)",
      respRate: "30 /min"
    },
    bailianExtraction: {
      esi_tier: 1,
      chief_complaint: "Severe TBI with Uncal Herniation & Pelvic Shock",
      specialty_required: "trauma_neurosurgery",
      required_resources: ["level1_trauma_bay", "ct_scanner", "neurosurgeon_on_call", "massive_transfusion_pack"],
      requires_ventilator: true,
      hemodynamic_stability: "decompensating",
      critical_window_mins: 45,
      protocol_code: "PAK-TRMA-1023",
      clinical_rationale: "Signs of acute uncal herniation. World Journal of Emergency Surgery reveals 3.8-4.7 hour inter-hospital transfer delay is statistically fatal (p=0.004). Direct Level-1 triage mandatory."
    }
  },
  {
    id: "stroke-thrombectomy",
    title: "Acute Ischemic Stroke (Large Vessel Occlusion)",
    patient: "Female, 68 yrs",
    chiefComplaint: "Acute dense right hemiplegia, global aphasia, onset 65 mins",
    voiceTranscript: "Ambulance 1023: 68-year-old female, sudden onset dense right-sided paralysis and global aphasia. Last known well 65 minutes ago. NIHSS estimated at 18. Glucose 118 mg/dL. Candidate for intravenous thrombolysis and emergency mechanical thrombectomy in biplane interventional neuro suite.",
    category: "Neurology",
    vitalSigns: {
      bp: "172/98 mmHg",
      hr: "84 bpm (irregular)",
      spo2: "96%",
      gcs: "12/15",
      respRate: "18 /min"
    },
    bailianExtraction: {
      esi_tier: 1,
      chief_complaint: "Acute Ischemic Stroke (Suspected MCA Occlusion)",
      specialty_required: "stroke_interventional_neurology",
      required_resources: ["stroke_suite", "biplane_angio", "interventional_neuroradiologist", "neuro_icu"],
      requires_ventilator: false,
      hemodynamic_stability: "stable_neurologically_critical",
      critical_window_mins: 120,
      protocol_code: "PAK-STRK-1023",
      clinical_rationale: "Time is brain (1.9 million neurons lost per minute). Non-thrombectomy hospital leads to redundant CT and delayed transfer."
    }
  }
];
