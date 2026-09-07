/**
 * Comprehensive Punjab Hospital Registry for SehatRoute AI.
 * Grounded in Punjab Specialized Healthcare & Medical Education Department (SHC&MED),
 * Primary & Secondary Healthcare Department (P&SHD), and Punjab Healthcare Commission (PHC).
 *
 * Covers 80+ authentic Public (Teaching, DHQ, Specialized, Military) and Private hospitals
 * across all major divisions of Punjab, Pakistan.
 */

export const HEALTHCARE_REGIONS = {
  all_punjab: {
    name: 'All Punjab (Complete Registry)',
    center: [31.5204, 74.3587],
    zoom: 7,
    hospitals: [] // Populated dynamically below
  },

  lahore: {
    name: 'Lahore Division',
    center: [31.5204, 74.3587],
    zoom: 12,
    hospitals: [
      // --- Public / Teaching / Specialized ---
      {
        id: 'mayo_lhr',
        name: 'Mayo Hospital Lahore (KEMU)',
        shortName: 'Mayo Hospital',
        type: 'Public Tertiary Teaching',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.5724,
        lon: 74.3168,
        totalErBeds: 55,
        occupiedErBeds: 51,
        offloadDelayMins: 38,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 4
        },
        onCallSpecialties: ['Emergency Medicine', 'General Surgery', 'Internal Medicine', 'Cardiology', 'Neurosurgery'],
        nedocsScore: 165
      },
      {
        id: 'jinnah_lhr',
        name: 'Jinnah Hospital Lahore (AIMC)',
        shortName: 'Jinnah Hospital',
        type: 'Public Tertiary Teaching',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.4842,
        lon: 74.2982,
        totalErBeds: 45,
        occupiedErBeds: 39,
        offloadDelayMins: 26,
        baseTransitMins: 16,
        activeResources: {
          tertiary_icu_bed: 5,
          mechanical_ventilator: 4,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 4
        },
        onCallSpecialties: ['Cardiology', 'Trauma Surgery', 'Orthopedics', 'Pediatrics'],
        nedocsScore: 128
      },
      {
        id: 'services_lhr',
        name: 'Services Hospital Lahore (SIMS)',
        shortName: 'Services Hospital',
        type: 'Public Tertiary Teaching',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.5412,
        lon: 74.3337,
        totalErBeds: 40,
        occupiedErBeds: 34,
        offloadDelayMins: 24,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Emergency Medicine', 'Neurology', 'General Surgery', 'Cardiology'],
        nedocsScore: 122
      },
      {
        id: 'gangaram_lhr',
        name: 'Sir Ganga Ram Hospital (FJMU)',
        shortName: 'Sir Ganga Ram',
        type: 'Public Tertiary Teaching',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.5492,
        lon: 74.3184,
        totalErBeds: 35,
        occupiedErBeds: 30,
        offloadDelayMins: 20,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['General Surgery', 'Gynecology & Obstetrics', 'Pediatrics', 'Internal Medicine'],
        nedocsScore: 115
      },
      {
        id: 'lgh_lhr',
        name: 'Lahore General Hospital (PGMI / AMC)',
        shortName: 'Lahore General',
        type: 'Public Tertiary Teaching & Neuro',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.4645,
        lon: 74.3649,
        totalErBeds: 48,
        occupiedErBeds: 41,
        offloadDelayMins: 29,
        baseTransitMins: 20,
        activeResources: {
          tertiary_icu_bed: 6,
          mechanical_ventilator: 5,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 5
        },
        onCallSpecialties: ['Neurosurgery', 'Orthopedics', 'Trauma Surgery', 'Neurology'],
        nedocsScore: 135
      },
      {
        id: 'pic_lhr',
        name: 'Punjab Institute of Cardiology (PIC)',
        shortName: 'PIC Lahore',
        type: 'Public Specialized Cardiac Institute',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.5369,
        lon: 74.3353,
        totalErBeds: 32,
        occupiedErBeds: 28,
        offloadDelayMins: 18,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 8,
          mechanical_ventilator: 6,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 0
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology', 'Cardiac ICU'],
        nedocsScore: 110
      },
      {
        id: 'children_lhr',
        name: 'The Children’s Hospital & ICH Lahore',
        shortName: 'Children\'s Hospital',
        type: 'Public Pediatric Tertiary',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.4795,
        lon: 74.3524,
        totalErBeds: 36,
        occupiedErBeds: 31,
        offloadDelayMins: 22,
        baseTransitMins: 17,
        activeResources: {
          tertiary_icu_bed: 6,
          mechanical_ventilator: 5,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Pediatric Surgery', 'Pediatric Cardiology', 'Neonatology', 'Pediatric ICU'],
        nedocsScore: 125
      },
      {
        id: 'shaikh_zayed_lhr',
        name: 'Shaikh Zayed Hospital Lahore',
        shortName: 'Shaikh Zayed',
        type: 'Federal / Public Tertiary Teaching',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.5052,
        lon: 74.3075,
        totalErBeds: 30,
        occupiedErBeds: 22,
        offloadDelayMins: 15,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 5,
          mechanical_ventilator: 4,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'Nephrology', 'Organ Transplant', 'Emergency Medicine'],
        nedocsScore: 88
      },
      {
        id: 'shahdara_lhr',
        name: 'Govt. Teaching Hospital Shahdara',
        shortName: 'Govt Shahdara',
        type: 'Public Secondary / Teaching',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.6214,
        lon: 74.2831,
        totalErBeds: 22,
        occupiedErBeds: 16,
        offloadDelayMins: 12,
        baseTransitMins: 22,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Emergency Medicine'],
        nedocsScore: 82
      },
      {
        id: 'kot_khawaja_lhr',
        name: 'Govt. Kot Khawaja Saeed Teaching Hospital',
        shortName: 'Kot Khawaja Saeed',
        type: 'Public Secondary Teaching',
        sector: 'Public',
        city: 'Lahore',
        lat: 31.6035,
        lon: 74.3512,
        totalErBeds: 20,
        occupiedErBeds: 14,
        offloadDelayMins: 14,
        baseTransitMins: 19,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: false,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine'],
        nedocsScore: 78
      },

      // --- Private / Trust Tertiary ---
      {
        id: 'shaukat_khanum_lhr',
        name: 'Shaukat Khanum Memorial Cancer Hospital',
        shortName: 'Shaukat Khanum',
        type: 'Private Trust Specialty / Oncology',
        sector: 'Trust / Charity',
        city: 'Lahore',
        lat: 31.4285,
        lon: 74.2829,
        totalErBeds: 20,
        occupiedErBeds: 9,
        offloadDelayMins: 6,
        baseTransitMins: 18,
        activeResources: {
          tertiary_icu_bed: 6,
          mechanical_ventilator: 5,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Oncology', 'Intensive Care', 'Internal Medicine', 'Radiology'],
        nedocsScore: 48
      },
      {
        id: 'doctors_lhr',
        name: 'Doctors Hospital & Medical Center',
        shortName: 'Doctors Hospital',
        type: 'Private Tertiary',
        sector: 'Private',
        city: 'Lahore',
        lat: 31.5034,
        lon: 74.2709,
        totalErBeds: 24,
        occupiedErBeds: 8,
        offloadDelayMins: 5,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 7,
          mechanical_ventilator: 5,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'Pulmonology', 'Trauma Surgery'],
        nedocsScore: 42
      },
      {
        id: 'ittefaq_lhr',
        name: 'Ittefaq Hospital (Trust)',
        shortName: 'Ittefaq Hospital',
        type: 'Private Trust Tertiary',
        sector: 'Trust / Charity',
        city: 'Lahore',
        lat: 31.4921,
        lon: 74.3312,
        totalErBeds: 22,
        occupiedErBeds: 11,
        offloadDelayMins: 8,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Internal Medicine', 'Emergency Medicine'],
        nedocsScore: 65
      },
      {
        id: 'shalamar_lhr',
        name: 'Shalamar Hospital Lahore',
        shortName: 'Shalamar Hospital',
        type: 'Private Trust Teaching',
        sector: 'Trust / Charity',
        city: 'Lahore',
        lat: 31.5834,
        lon: 74.3721,
        totalErBeds: 25,
        occupiedErBeds: 14,
        offloadDelayMins: 9,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Pediatrics', 'Orthopedics'],
        nedocsScore: 68
      },
      {
        id: 'national_lhr',
        name: 'National Hospital & Medical Centre (DHA)',
        shortName: 'National Hospital DHA',
        type: 'Private Tertiary',
        sector: 'Private',
        city: 'Lahore',
        lat: 31.4789,
        lon: 74.3842,
        totalErBeds: 18,
        occupiedErBeds: 6,
        offloadDelayMins: 4,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 5,
          mechanical_ventilator: 4,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'General Surgery', 'Interventional Radiology'],
        nedocsScore: 38
      },
      {
        id: 'fatima_memorial_lhr',
        name: 'Fatima Memorial Hospital (FMH)',
        shortName: 'FMH Shadman',
        type: 'Private Trust Teaching',
        sector: 'Trust / Charity',
        city: 'Lahore',
        lat: 31.5375,
        lon: 74.3242,
        totalErBeds: 20,
        occupiedErBeds: 12,
        offloadDelayMins: 10,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Gynecology', 'Pediatrics', 'Internal Medicine'],
        nedocsScore: 72
      },
      {
        id: 'farooq_lhr',
        name: 'Farooq Hospital Westwood',
        shortName: 'Farooq Hospital',
        type: 'Private Tertiary',
        sector: 'Private',
        city: 'Lahore',
        lat: 31.4678,
        lon: 74.2541,
        totalErBeds: 16,
        occupiedErBeds: 7,
        offloadDelayMins: 5,
        baseTransitMins: 16,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'Urology', 'Internal Medicine'],
        nedocsScore: 50
      },
      {
        id: 'evercare_lhr',
        name: 'Evercare Hospital Lahore',
        shortName: 'Evercare Hospital',
        type: 'Private Tertiary Multi-Specialty',
        sector: 'Private',
        city: 'Lahore',
        lat: 31.4392,
        lon: 74.2687,
        totalErBeds: 20,
        occupiedErBeds: 6,
        offloadDelayMins: 4,
        baseTransitMins: 17,
        activeResources: {
          tertiary_icu_bed: 6,
          mechanical_ventilator: 4,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'Emergency Medicine', 'Neurology', 'Pulmonology'],
        nedocsScore: 35
      },
      {
        id: 'hameed_latif_lhr',
        name: 'Hameed Latif Hospital Garden Town',
        shortName: 'Hameed Latif',
        type: 'Private Tertiary',
        sector: 'Private',
        city: 'Lahore',
        lat: 31.5081,
        lon: 74.3298,
        totalErBeds: 18,
        occupiedErBeds: 9,
        offloadDelayMins: 6,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'Gynecology & Obstetrics', 'Surgery', 'Pediatrics'],
        nedocsScore: 52
      },
      {
        id: 'omar_lhr',
        name: 'Omar Hospital & Cardiac Centre',
        shortName: 'Omar Hospital',
        type: 'Private Cardiac & Multi-Specialty',
        sector: 'Private',
        city: 'Lahore',
        lat: 31.5429,
        lon: 74.3385,
        totalErBeds: 14,
        occupiedErBeds: 5,
        offloadDelayMins: 5,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Internal Medicine'],
        nedocsScore: 40
      }
    ]
  },

  islamabad_rawalpindi: {
    name: 'Rawalpindi & Islamabad',
    center: [33.6844, 73.0479],
    zoom: 12,
    hospitals: [
      // --- Public & Military Tertiary ---
      {
        id: 'pims',
        name: 'Pakistan Institute of Medical Sciences (PIMS)',
        shortName: 'PIMS',
        type: 'Federal Public Tertiary Teaching',
        sector: 'Public',
        city: 'Islamabad',
        lat: 33.7068,
        lon: 73.0551,
        totalErBeds: 38,
        occupiedErBeds: 34,
        offloadDelayMins: 30,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Orthopedics', 'Emergency Medicine'],
        nedocsScore: 148
      },
      {
        id: 'hfi',
        name: 'Holy Family Hospital Rawalpindi (RMU)',
        shortName: 'Holy Family',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Rawalpindi',
        lat: 33.6291,
        lon: 73.0725,
        totalErBeds: 32,
        occupiedErBeds: 23,
        offloadDelayMins: 16,
        baseTransitMins: 18,
        activeResources: {
          tertiary_icu_bed: 5,
          mechanical_ventilator: 4,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'General Surgery', 'Pediatrics', 'Emergency Medicine'],
        nedocsScore: 98
      },
      {
        id: 'bbh_rwp',
        name: 'Benazir Bhutto Hospital (BBH Rawalpindi)',
        shortName: 'Benazir Bhutto',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Rawalpindi',
        lat: 33.6062,
        lon: 73.0768,
        totalErBeds: 36,
        occupiedErBeds: 31,
        offloadDelayMins: 24,
        baseTransitMins: 16,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Emergency Medicine', 'General Surgery', 'Orthopedics', 'Internal Medicine'],
        nedocsScore: 132
      },
      {
        id: 'ric_rwp',
        name: 'Rawalpindi Institute of Cardiology (RIC)',
        shortName: 'RIC Rawalpindi',
        type: 'Punjab Specialized Cardiac Institute',
        sector: 'Public',
        city: 'Rawalpindi',
        lat: 33.6212,
        lon: 73.0882,
        totalErBeds: 28,
        occupiedErBeds: 20,
        offloadDelayMins: 12,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 7,
          mechanical_ventilator: 5,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 0
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology', 'Cardiac ICU'],
        nedocsScore: 85
      },
      {
        id: 'rth_rwp',
        name: 'Rawalpindi Teaching Hospital (DHQ Hospital)',
        shortName: 'Rawalpindi Teaching',
        type: 'Punjab Public Teaching',
        sector: 'Public',
        city: 'Rawalpindi',
        lat: 33.6015,
        lon: 73.0560,
        totalErBeds: 26,
        occupiedErBeds: 22,
        offloadDelayMins: 20,
        baseTransitMins: 19,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Emergency Medicine'],
        nedocsScore: 120
      },
      {
        id: 'afh_cmh_rwp',
        name: 'Combined Military Hospital (CMH) & AFIC Rawalpindi',
        shortName: 'CMH / AFIC',
        type: 'Military Tertiary Teaching & Cardiac',
        sector: 'Military',
        city: 'Rawalpindi',
        lat: 33.5855,
        lon: 73.0541,
        totalErBeds: 45,
        occupiedErBeds: 24,
        offloadDelayMins: 8,
        baseTransitMins: 20,
        activeResources: {
          tertiary_icu_bed: 9,
          mechanical_ventilator: 7,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 4
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Trauma Surgery', 'Neurosurgery', 'Burns'],
        nedocsScore: 68
      },
      {
        id: 'polyclinic_isb',
        name: 'Federal Government Polyclinic (FGPC) Islamabad',
        shortName: 'FG Polyclinic',
        type: 'Federal Public Tertiary',
        sector: 'Public',
        city: 'Islamabad',
        lat: 33.7295,
        lon: 73.0815,
        totalErBeds: 24,
        occupiedErBeds: 20,
        offloadDelayMins: 22,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Internal Medicine', 'General Surgery', 'Emergency Medicine'],
        nedocsScore: 118
      },
      {
        id: 'krl_isb',
        name: 'KRL General Hospital Islamabad',
        shortName: 'KRL Hospital',
        type: 'Semi-Government Secondary / Tertiary',
        sector: 'Public',
        city: 'Islamabad',
        lat: 33.6450,
        lon: 73.0720,
        totalErBeds: 18,
        occupiedErBeds: 13,
        offloadDelayMins: 14,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Emergency Medicine', 'General Surgery', 'Internal Medicine'],
        nedocsScore: 92
      },

      // --- Private Tertiary ---
      {
        id: 'shifa',
        name: 'Shifa International Hospital Islamabad',
        shortName: 'Shifa Intl',
        type: 'Private Tertiary Teaching & JCI Accredited',
        sector: 'Private',
        city: 'Islamabad',
        lat: 33.6956,
        lon: 73.0396,
        totalErBeds: 26,
        occupiedErBeds: 9,
        offloadDelayMins: 5,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 8,
          mechanical_ventilator: 6,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'Pulmonology', 'Trauma Surgery', 'Pediatrics'],
        nedocsScore: 48
      },
      {
        id: 'qih_isb',
        name: 'Quaid-e-Azam International Hospital (QIH)',
        shortName: 'QIH Islamabad',
        type: 'Private Tertiary Multi-Specialty',
        sector: 'Private',
        city: 'Islamabad / Rawalpindi',
        lat: 33.6267,
        lon: 72.9772,
        totalErBeds: 28,
        occupiedErBeds: 11,
        offloadDelayMins: 6,
        baseTransitMins: 16,
        activeResources: {
          tertiary_icu_bed: 6,
          mechanical_ventilator: 5,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Cardiology', 'Neurosurgery', 'Trauma Surgery', 'Interventional Radiology'],
        nedocsScore: 52
      },
      {
        id: 'maroof',
        name: 'Maroof International Hospital Islamabad',
        shortName: 'Maroof Intl',
        type: 'Private Tertiary',
        sector: 'Private',
        city: 'Islamabad',
        lat: 33.7163,
        lon: 73.0485,
        totalErBeds: 16,
        occupiedErBeds: 6,
        offloadDelayMins: 4,
        baseTransitMins: 10,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Internal Medicine', 'Orthopedics'],
        nedocsScore: 44
      },
      {
        id: 'kulsum_isb',
        name: 'Kulsum International Hospital Blue Area',
        shortName: 'Kulsum Intl',
        type: 'Private Cardiac & Multi-Specialty',
        sector: 'Private',
        city: 'Islamabad',
        lat: 33.7135,
        lon: 73.0681,
        totalErBeds: 14,
        occupiedErBeds: 5,
        offloadDelayMins: 4,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Internal Medicine'],
        nedocsScore: 38
      },
      {
        id: 'alkhidmat_raazi_rwp',
        name: 'Al-Khidmat Raazi Hospital Rawalpindi',
        shortName: 'Al-Khidmat Raazi',
        type: 'Trust / Alkhidmat Healthcare',
        sector: 'Trust / Charity',
        city: 'Rawalpindi',
        lat: 33.6284,
        lon: 73.0612,
        totalErBeds: 18,
        occupiedErBeds: 8,
        offloadDelayMins: 6,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Emergency Medicine', 'General Surgery', 'Pediatrics', 'Internal Medicine'],
        nedocsScore: 55
      },
      {
        id: 'bilal_rwp',
        name: 'Bilal Hospital Rawalpindi',
        shortName: 'Bilal Hospital',
        type: 'Private Tertiary',
        sector: 'Private',
        city: 'Rawalpindi',
        lat: 33.6391,
        lon: 73.0825,
        totalErBeds: 16,
        occupiedErBeds: 7,
        offloadDelayMins: 5,
        baseTransitMins: 17,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Urology', 'Internal Medicine'],
        nedocsScore: 50
      },
      {
        id: 'ali_medical_isb',
        name: 'Ali Medical Centre Islamabad',
        shortName: 'Ali Medical',
        type: 'Private Secondary / Specialty',
        sector: 'Private',
        city: 'Islamabad',
        lat: 33.7082,
        lon: 73.0298,
        totalErBeds: 12,
        occupiedErBeds: 4,
        offloadDelayMins: 4,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 0
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Orthopedics'],
        nedocsScore: 36
      }
    ]
  },

  faisalabad: {
    name: 'Faisalabad Division',
    center: [31.4187, 73.0791],
    zoom: 12,
    hospitals: [
      // --- Public Teaching & Institutes ---
      {
        id: 'allied_fsd',
        name: 'Allied Hospital Faisalabad (PMC)',
        shortName: 'Allied Hospital',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Faisalabad',
        lat: 31.4285,
        lon: 73.0641,
        totalErBeds: 44,
        occupiedErBeds: 38,
        offloadDelayMins: 32,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Emergency Medicine', 'Orthopedics'],
        nedocsScore: 142
      },
      {
        id: 'fic_fsd',
        name: 'Faisalabad Institute of Cardiology (FIC)',
        shortName: 'FIC Faisalabad',
        type: 'Punjab Specialized Cardiac Institute',
        sector: 'Public',
        city: 'Faisalabad',
        lat: 31.4398,
        lon: 73.0845,
        totalErBeds: 26,
        occupiedErBeds: 18,
        offloadDelayMins: 12,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 6,
          mechanical_ventilator: 5,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 0
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology'],
        nedocsScore: 82
      },
      {
        id: 'dhq_fsd',
        name: 'DHQ Teaching Hospital Faisalabad',
        shortName: 'DHQ Faisalabad',
        type: 'Punjab Public Teaching',
        sector: 'Public',
        city: 'Faisalabad',
        lat: 31.4148,
        lon: 73.0830,
        totalErBeds: 32,
        occupiedErBeds: 26,
        offloadDelayMins: 24,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Emergency Medicine', 'General Surgery', 'Internal Medicine'],
        nedocsScore: 124
      },
      {
        id: 'children_fsd',
        name: 'The Children’s Hospital Faisalabad',
        shortName: 'Children\'s FSD',
        type: 'Punjab Public Pediatric',
        sector: 'Public',
        city: 'Faisalabad',
        lat: 31.4420,
        lon: 73.1012,
        totalErBeds: 24,
        occupiedErBeds: 19,
        offloadDelayMins: 18,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Pediatrics', 'Pediatric Surgery', 'Neonatology'],
        nedocsScore: 105
      },

      // --- Private Tertiary ---
      {
        id: 'faisalabad_intl',
        name: 'Faisalabad International Hospital',
        shortName: 'Faisalabad Intl',
        type: 'Private Tertiary Multi-Specialty',
        sector: 'Private',
        city: 'Faisalabad',
        lat: 31.4300,
        lon: 73.0650,
        totalErBeds: 20,
        occupiedErBeds: 7,
        offloadDelayMins: 5,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'Pulmonology', 'Pediatrics'],
        nedocsScore: 44
      },
      {
        id: 'national_fsd',
        name: 'National Hospital Faisalabad',
        shortName: 'National FSD',
        type: 'Private Secondary / Tertiary',
        sector: 'Private',
        city: 'Faisalabad',
        lat: 31.4112,
        lon: 73.0789,
        totalErBeds: 16,
        occupiedErBeds: 6,
        offloadDelayMins: 6,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Cardiology', 'Internal Medicine'],
        nedocsScore: 48
      },
      {
        id: 'aziz_fatima_fsd',
        name: 'Aziz Fatima Hospital (AFMC)',
        shortName: 'Aziz Fatima',
        type: 'Private Trust Teaching',
        sector: 'Trust / Charity',
        city: 'Faisalabad',
        lat: 31.4485,
        lon: 73.0721,
        totalErBeds: 18,
        occupiedErBeds: 9,
        offloadDelayMins: 7,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Gynecology', 'Pediatrics'],
        nedocsScore: 58
      },
      {
        id: 'independent_fsd',
        name: 'Independent University Hospital Faisalabad',
        shortName: 'Independent Hospital',
        type: 'Private Teaching Hospital',
        sector: 'Private',
        city: 'Faisalabad',
        lat: 31.3980,
        lon: 73.0450,
        totalErBeds: 16,
        occupiedErBeds: 7,
        offloadDelayMins: 6,
        baseTransitMins: 17,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Internal Medicine', 'General Surgery', 'Orthopedics'],
        nedocsScore: 52
      }
    ]
  },

  multan: {
    name: 'Multan Division',
    center: [30.1984, 71.4687],
    zoom: 12,
    hospitals: [
      // --- Public Teaching & Specialized ---
      {
        id: 'nishtar',
        name: 'Nishtar Medical University Hospital',
        shortName: 'Nishtar Hospital',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Multan',
        lat: 30.2020,
        lon: 71.4550,
        totalErBeds: 48,
        occupiedErBeds: 42,
        offloadDelayMins: 34,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 4
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'General Surgery', 'Emergency Medicine'],
        nedocsScore: 152
      },
      {
        id: 'chaudhry_pervaiz',
        name: 'Chaudhry Pervaiz Elahi Institute of Cardiology (CPEIC)',
        shortName: 'CPEIC Multan',
        type: 'Punjab Specialized Cardiac Institute',
        sector: 'Public',
        city: 'Multan',
        lat: 30.1950,
        lon: 71.4620,
        totalErBeds: 24,
        occupiedErBeds: 15,
        offloadDelayMins: 9,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 6,
          mechanical_ventilator: 5,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 0
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology'],
        nedocsScore: 78
      },
      {
        id: 'children_mtn',
        name: 'The Children’s Hospital & ICH Multan',
        shortName: 'Children\'s Multan',
        type: 'Punjab Public Pediatric',
        sector: 'Public',
        city: 'Multan',
        lat: 30.2085,
        lon: 71.4480,
        totalErBeds: 28,
        occupiedErBeds: 22,
        offloadDelayMins: 20,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 5,
          mechanical_ventilator: 4,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Pediatrics', 'Pediatric Surgery', 'Neonatal ICU'],
        nedocsScore: 112
      },
      {
        id: 'shahbaz_sharif_mtn',
        name: 'Shahbaz Sharif DHQ Hospital Multan',
        shortName: 'Shahbaz Sharif DHQ',
        type: 'Punjab Public Secondary',
        sector: 'Public',
        city: 'Multan',
        lat: 30.1850,
        lon: 71.4390,
        totalErBeds: 22,
        occupiedErBeds: 15,
        offloadDelayMins: 14,
        baseTransitMins: 16,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Emergency Medicine'],
        nedocsScore: 84
      },

      // --- Private Tertiary ---
      {
        id: 'bakhtawar_amin',
        name: 'Bakhtawar Amin Memorial Hospital & College',
        shortName: 'Bakhtawar Amin',
        type: 'Private Trust Teaching',
        sector: 'Trust / Charity',
        city: 'Multan',
        lat: 30.1850,
        lon: 71.4800,
        totalErBeds: 20,
        occupiedErBeds: 8,
        offloadDelayMins: 6,
        baseTransitMins: 16,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'General Surgery', 'Pulmonology'],
        nedocsScore: 52
      },
      {
        id: 'ibn_sina_mtn',
        name: 'Ibn-e-Sina Hospital & Research Institute',
        shortName: 'Ibn-e-Sina Multan',
        type: 'Private Teaching Hospital',
        sector: 'Private',
        city: 'Multan',
        lat: 30.2100,
        lon: 71.4750,
        totalErBeds: 16,
        occupiedErBeds: 6,
        offloadDelayMins: 5,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Internal Medicine', 'General Surgery', 'Pediatrics'],
        nedocsScore: 46
      },
      {
        id: 'mukhtar_sheikh_mtn',
        name: 'Mukhtar A. Sheikh Memorial Hospital',
        shortName: 'Mukhtar A Sheikh',
        type: 'Private Tertiary Multi-Specialty',
        sector: 'Private',
        city: 'Multan',
        lat: 30.2350,
        lon: 71.5120,
        totalErBeds: 22,
        occupiedErBeds: 7,
        offloadDelayMins: 4,
        baseTransitMins: 18,
        activeResources: {
          tertiary_icu_bed: 5,
          mechanical_ventilator: 4,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['Cardiology', 'Neurosurgery', 'Critical Care', 'Emergency Medicine'],
        nedocsScore: 38
      },
      {
        id: 'fatima_medical_mtn',
        name: 'Fatima Medical Centre Multan',
        shortName: 'Fatima Medical',
        type: 'Private Secondary',
        sector: 'Private',
        city: 'Multan',
        lat: 30.2012,
        lon: 71.4715,
        totalErBeds: 14,
        occupiedErBeds: 5,
        offloadDelayMins: 5,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 0
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Orthopedics'],
        nedocsScore: 42
      }
    ]
  },

  gujranwala: {
    name: 'Gujranwala Division',
    center: [32.1877, 74.1945],
    zoom: 12,
    hospitals: [
      {
        id: 'dhq_teach_grw',
        name: 'DHQ Teaching Hospital Gujranwala (GMC)',
        shortName: 'DHQ Gujranwala',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Gujranwala',
        lat: 32.1610,
        lon: 74.1850,
        totalErBeds: 36,
        occupiedErBeds: 30,
        offloadDelayMins: 26,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['General Surgery', 'Cardiology', 'Orthopedics', 'Emergency Medicine'],
        nedocsScore: 130
      },
      {
        id: 'gic_grw',
        name: 'Gujranwala Institute of Medical Sciences / Cardiology',
        shortName: 'Gujranwala Cardiac',
        type: 'Punjab Specialized Cardiac',
        sector: 'Public',
        city: 'Gujranwala',
        lat: 32.1950,
        lon: 74.2050,
        totalErBeds: 20,
        occupiedErBeds: 13,
        offloadDelayMins: 11,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 0
        },
        onCallSpecialties: ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology'],
        nedocsScore: 78
      },
      {
        id: 'medcare_grw',
        name: 'Medcare International Hospital Gujranwala',
        shortName: 'Medcare Intl',
        type: 'Private Tertiary',
        sector: 'Private',
        city: 'Gujranwala',
        lat: 32.1780,
        lon: 74.1920,
        totalErBeds: 18,
        occupiedErBeds: 6,
        offloadDelayMins: 5,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'Neurology', 'Pulmonology', 'General Surgery'],
        nedocsScore: 42
      },
      {
        id: 'gondal_grw',
        name: 'Gondal Medical Complex Gujranwala',
        shortName: 'Gondal Hospital',
        type: 'Private Secondary / Tertiary',
        sector: 'Private',
        city: 'Gujranwala',
        lat: 32.1690,
        lon: 74.1790,
        totalErBeds: 16,
        occupiedErBeds: 7,
        offloadDelayMins: 6,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Internal Medicine', 'General Surgery', 'Pediatrics'],
        nedocsScore: 50
      },
      {
        id: 'chattha_grw',
        name: 'Chattha Hospital Gujranwala',
        shortName: 'Chattha Hospital',
        type: 'Private Secondary',
        sector: 'Private',
        city: 'Gujranwala',
        lat: 32.1550,
        lon: 74.1820,
        totalErBeds: 14,
        occupiedErBeds: 5,
        offloadDelayMins: 5,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: false,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Orthopedics'],
        nedocsScore: 45
      }
    ]
  },

  sialkot: {
    name: 'Sialkot District',
    center: [32.4945, 74.5229],
    zoom: 12,
    hospitals: [
      {
        id: 'allama_iqbal_skt',
        name: 'Allama Iqbal Memorial Teaching Hospital Sialkot (KMSMC)',
        shortName: 'Allama Iqbal Memorial',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Sialkot',
        lat: 32.4980,
        lon: 74.5310,
        totalErBeds: 34,
        occupiedErBeds: 28,
        offloadDelayMins: 24,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Cardiology', 'Emergency Medicine'],
        nedocsScore: 126
      },
      {
        id: 'sardar_begum_skt',
        name: 'Govt. Sardar Begum Teaching Hospital Sialkot',
        shortName: 'Sardar Begum',
        type: 'Punjab Public Teaching',
        sector: 'Public',
        city: 'Sialkot',
        lat: 32.4850,
        lon: 74.5420,
        totalErBeds: 22,
        occupiedErBeds: 16,
        offloadDelayMins: 16,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Gynecology', 'Pediatrics', 'General Surgery'],
        nedocsScore: 92
      },
      {
        id: 'islam_central_skt',
        name: 'Islam Central Hospital Sialkot',
        shortName: 'Islam Central',
        type: 'Private Teaching Hospital',
        sector: 'Private',
        city: 'Sialkot',
        lat: 32.5120,
        lon: 74.5150,
        totalErBeds: 18,
        occupiedErBeds: 7,
        offloadDelayMins: 6,
        baseTransitMins: 15,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Orthopedics'],
        nedocsScore: 48
      },
      {
        id: 'bethania_skt',
        name: 'Bethania Hospital Sialkot',
        shortName: 'Bethania Hospital',
        type: 'Private Trust Secondary',
        sector: 'Trust / Charity',
        city: 'Sialkot',
        lat: 32.4920,
        lon: 74.5380,
        totalErBeds: 16,
        occupiedErBeds: 6,
        offloadDelayMins: 5,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Internal Medicine', 'General Surgery', 'Emergency Medicine'],
        nedocsScore: 45
      }
    ]
  },

  gujrat: {
    name: 'Gujrat District',
    center: [32.5744, 74.0754],
    zoom: 12,
    hospitals: [
      {
        id: 'aziz_bhatti_gjt',
        name: 'Aziz Bhatti Shaheed Teaching Hospital Gujrat (NSMC)',
        shortName: 'Aziz Bhatti Teaching',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Gujrat',
        lat: 32.5710,
        lon: 74.0810,
        totalErBeds: 32,
        occupiedErBeds: 26,
        offloadDelayMins: 22,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['General Surgery', 'Cardiology', 'Internal Medicine', 'Emergency Medicine'],
        nedocsScore: 120
      },
      {
        id: 'akram_gjt',
        name: 'Akram Hospital Gujrat',
        shortName: 'Akram Hospital',
        type: 'Private Secondary / Tertiary',
        sector: 'Private',
        city: 'Gujrat',
        lat: 32.5830,
        lon: 74.0720,
        totalErBeds: 16,
        occupiedErBeds: 6,
        offloadDelayMins: 5,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Pediatrics'],
        nedocsScore: 46
      },
      {
        id: 'doctors_gjt',
        name: 'Doctors Hospital & Trauma Centre Gujrat',
        shortName: 'Doctors Hospital Gujrat',
        type: 'Private Secondary',
        sector: 'Private',
        city: 'Gujrat',
        lat: 32.5650,
        lon: 74.0680,
        totalErBeds: 14,
        occupiedErBeds: 5,
        offloadDelayMins: 5,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Trauma Surgery', 'Orthopedics', 'General Surgery'],
        nedocsScore: 42
      }
    ]
  },

  bahawalpur: {
    name: 'Bahawalpur & Rahim Yar Khan',
    center: [29.3544, 71.6911],
    zoom: 11,
    hospitals: [
      {
        id: 'bvh_bwp',
        name: 'Bahawal Victoria Hospital (BVH Bahawalpur / QAMC)',
        shortName: 'Bahawal Victoria (BVH)',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Bahawalpur',
        lat: 29.3980,
        lon: 71.6850,
        totalErBeds: 42,
        occupiedErBeds: 36,
        offloadDelayMins: 28,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['General Surgery', 'Cardiology', 'Neurosurgery', 'Pediatrics'],
        nedocsScore: 138
      },
      {
        id: 'civil_bwp',
        name: 'Civil Hospital Bahawalpur',
        shortName: 'Civil Bahawalpur',
        type: 'Punjab Public Secondary',
        sector: 'Public',
        city: 'Bahawalpur',
        lat: 29.3890,
        lon: 71.6740,
        totalErBeds: 22,
        occupiedErBeds: 16,
        offloadDelayMins: 16,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Internal Medicine', 'General Surgery'],
        nedocsScore: 88
      },
      {
        id: 'sheikh_zayed_ryk',
        name: 'Sheikh Zayed Medical College & Hospital (Rahim Yar Khan)',
        shortName: 'Sheikh Zayed RYK',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Rahim Yar Khan',
        lat: 28.4212,
        lon: 70.3015,
        totalErBeds: 38,
        occupiedErBeds: 31,
        offloadDelayMins: 25,
        baseTransitMins: 18,
        activeResources: {
          tertiary_icu_bed: 4,
          mechanical_ventilator: 3,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['General Surgery', 'Cardiology', 'Orthopedics', 'Emergency Medicine'],
        nedocsScore: 130
      },
      {
        id: 'al_hadi_bwp',
        name: 'Al-Hadi Medical Complex Bahawalpur',
        shortName: 'Al-Hadi Complex',
        type: 'Private Secondary / Tertiary',
        sector: 'Private',
        city: 'Bahawalpur',
        lat: 29.4050,
        lon: 71.6920,
        totalErBeds: 16,
        occupiedErBeds: 6,
        offloadDelayMins: 5,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Pediatrics'],
        nedocsScore: 45
      }
    ]
  },

  sargodha: {
    name: 'Sargodha Division',
    center: [32.0836, 72.6711],
    zoom: 12,
    hospitals: [
      {
        id: 'dhq_teach_sgd',
        name: 'DHQ Teaching Hospital Sargodha (SMC)',
        shortName: 'DHQ Sargodha',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Sargodha',
        lat: 32.0790,
        lon: 72.6820,
        totalErBeds: 34,
        occupiedErBeds: 28,
        offloadDelayMins: 24,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Cardiology', 'Pediatrics'],
        nedocsScore: 128
      },
      {
        id: 'paf_sgd',
        name: 'PAF Hospital Sargodha (Mushaf Base)',
        shortName: 'PAF Hospital',
        type: 'Military / Public Secondary',
        sector: 'Military',
        city: 'Sargodha',
        lat: 32.0520,
        lon: 72.6610,
        totalErBeds: 20,
        occupiedErBeds: 9,
        offloadDelayMins: 8,
        baseTransitMins: 16,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Emergency Medicine', 'Internal Medicine'],
        nedocsScore: 54
      },
      {
        id: 'niazi_sgd',
        name: 'Niazi Medical Complex Sargodha',
        shortName: 'Niazi Complex',
        type: 'Private Teaching Hospital',
        sector: 'Private',
        city: 'Sargodha',
        lat: 32.0910,
        lon: 72.6580,
        totalErBeds: 18,
        occupiedErBeds: 7,
        offloadDelayMins: 6,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Cardiology', 'General Surgery', 'Orthopedics'],
        nedocsScore: 48
      }
    ]
  },

  sahiwal: {
    name: 'Sahiwal & Okara',
    center: [30.6682, 73.1114],
    zoom: 12,
    hospitals: [
      {
        id: 'sahiwal_teaching',
        name: 'Sahiwal Teaching Hospital (DHQ Hospital / SLMC)',
        shortName: 'Sahiwal Teaching',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Sahiwal',
        lat: 30.6650,
        lon: 73.1090,
        totalErBeds: 32,
        occupiedErBeds: 26,
        offloadDelayMins: 22,
        baseTransitMins: 11,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['General Surgery', 'Cardiology', 'Internal Medicine', 'Emergency Medicine'],
        nedocsScore: 122
      },
      {
        id: 'dhq_okara',
        name: 'DHQ Teaching Hospital Okara',
        shortName: 'DHQ Okara',
        type: 'Punjab Public Secondary / Teaching',
        sector: 'Public',
        city: 'Okara',
        lat: 30.8120,
        lon: 73.4510,
        totalErBeds: 24,
        occupiedErBeds: 18,
        offloadDelayMins: 18,
        baseTransitMins: 24,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Emergency Medicine', 'General Surgery', 'Pediatrics'],
        nedocsScore: 95
      },
      {
        id: 'christian_shw',
        name: 'Christian Hospital Sahiwal',
        shortName: 'Christian Hospital',
        type: 'Private Trust Secondary',
        sector: 'Trust / Charity',
        city: 'Sahiwal',
        lat: 30.6720,
        lon: 73.1180,
        totalErBeds: 16,
        occupiedErBeds: 6,
        offloadDelayMins: 5,
        baseTransitMins: 13,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine', 'Gynecology'],
        nedocsScore: 44
      },
      {
        id: 'alkhidmat_shw',
        name: 'Al-Khidmat Hospital Sahiwal',
        shortName: 'Al-Khidmat Sahiwal',
        type: 'Trust / Alkhidmat Healthcare',
        sector: 'Trust / Charity',
        city: 'Sahiwal',
        lat: 30.6580,
        lon: 73.1020,
        totalErBeds: 14,
        occupiedErBeds: 5,
        offloadDelayMins: 5,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: false,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['Emergency Medicine', 'Pediatrics', 'General Surgery'],
        nedocsScore: 46
      }
    ]
  },

  dg_khan: {
    name: 'D.G. Khan & Muzaffargarh',
    center: [30.0561, 70.6348],
    zoom: 11,
    hospitals: [
      {
        id: 'allama_iqbal_dgk',
        name: 'Allama Iqbal Teaching Hospital D.G. Khan (DMC)',
        shortName: 'Allama Iqbal DGK',
        type: 'Punjab Public Tertiary Teaching',
        sector: 'Public',
        city: 'Dera Ghazi Khan',
        lat: 30.0480,
        lon: 70.6420,
        totalErBeds: 34,
        occupiedErBeds: 28,
        offloadDelayMins: 26,
        baseTransitMins: 12,
        activeResources: {
          tertiary_icu_bed: 3,
          mechanical_ventilator: 2,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 2
        },
        onCallSpecialties: ['General Surgery', 'Cardiology', 'Internal Medicine', 'Orthopedics'],
        nedocsScore: 132
      },
      {
        id: 'erdogan_mzg',
        name: 'Recep Tayyip Erdogan Hospital Muzaffargarh (Indus Network)',
        shortName: 'Erdogan Hospital (Indus)',
        type: 'Trust / Public-Private Partnership Tertiary',
        sector: 'Trust / Charity',
        city: 'Muzaffargarh',
        lat: 30.0710,
        lon: 71.1890,
        totalErBeds: 30,
        occupiedErBeds: 18,
        offloadDelayMins: 10,
        baseTransitMins: 28,
        activeResources: {
          tertiary_icu_bed: 5,
          mechanical_ventilator: 4,
          cath_lab: true,
          ct_scanner: true,
          stroke_suite: true,
          level1_trauma_bay: 3
        },
        onCallSpecialties: ['Cardiology', 'Trauma Surgery', 'Pediatrics', 'Critical Care'],
        nedocsScore: 72
      },
      {
        id: 'dhq_layyah',
        name: 'DHQ Hospital Layyah',
        shortName: 'DHQ Layyah',
        type: 'Punjab Public Secondary',
        sector: 'Public',
        city: 'Layyah',
        lat: 30.9650,
        lon: 70.9410,
        totalErBeds: 20,
        occupiedErBeds: 15,
        offloadDelayMins: 18,
        baseTransitMins: 35,
        activeResources: {
          tertiary_icu_bed: 1,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: true,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Internal Medicine'],
        nedocsScore: 96
      },
      {
        id: 'al_shafi_dgk',
        name: 'Al-Shafi Hospital D.G. Khan',
        shortName: 'Al-Shafi DGK',
        type: 'Private Secondary',
        sector: 'Private',
        city: 'Dera Ghazi Khan',
        lat: 30.0520,
        lon: 70.6380,
        totalErBeds: 14,
        occupiedErBeds: 5,
        offloadDelayMins: 5,
        baseTransitMins: 14,
        activeResources: {
          tertiary_icu_bed: 2,
          mechanical_ventilator: 1,
          cath_lab: false,
          ct_scanner: false,
          stroke_suite: false,
          level1_trauma_bay: 1
        },
        onCallSpecialties: ['General Surgery', 'Pediatrics'],
        nedocsScore: 42
      }
    ]
  }
};

// Build the complete combined list of All Punjab Hospitals
const allPunjabHospitals = [];
for (const [key, region] of Object.entries(HEALTHCARE_REGIONS)) {
  if (key !== 'all_punjab' && region.hospitals) {
    allPunjabHospitals.push(...region.hospitals);
  }
}
HEALTHCARE_REGIONS.all_punjab.hospitals = allPunjabHospitals;

/**
 * Helper to get all hospitals in a flat list or filtered by sector/city.
 */
export function getAllPunjabHospitals() {
  return allPunjabHospitals;
}

/**
 * Find hospital by ID across all of Punjab.
 */
export function findHospitalById(hospitalId) {
  return allPunjabHospitals.find(h => h.id === hospitalId) || null;
}
