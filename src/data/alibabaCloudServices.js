export const ALIBABA_CLOUD_SERVICES = [
  {
    tier: "Edge & Ingestion",
    service: "Alibaba Cloud API Gateway",
    badge: "API Gateway",
    role: "Secures, throttles, and authenticates real-time telemetry from Alkhidmat 1023 call dispatchers and field ambulances.",
    features: [
      "HMAC-SHA256 request signing & mTLS encryption for patient privacy",
      "Sub-15ms edge request ingestion & validation",
      "Traffic shaping during regional mass-casualty surges"
    ],
    telemetryMetrics: {
      latency: "12 ms",
      throughput: "1,240 req/s",
      availability: "99.99%"
    },
    samplePayload: {
      headers: {
        "x-ca-key": "ALK-DISPATCH-PK-1023",
        "x-ca-signature": "9f83ab29c48e712...",
        "Content-Type": "application/json"
      },
      body: {
        unit_id: "ALK-1023-ISB",
        city: "Islamabad",
        gps: { lat: 33.7125, lng: 73.0640 }
      }
    }
  },
  {
    tier: "Clinical Parsing AI",
    service: "Model Studio (Bailian) / Qwen-2.5",
    badge: "Bailian / Qwen-2.5-72B",
    role: "Natural Language understanding of paramedic voice & text inputs; extracts structured clinical JSON schema conforming to ESI triage standards.",
    features: [
      "Zero-shot clinical entity extraction (ESI tier, organ systems, required resources)",
      "Bilingual Urdu & English medical terminology support",
      "Strict JSON Schema validation output mode (<180ms latency)"
    ],
    telemetryMetrics: {
      latency: "148 ms",
      promptTokens: 382,
      completionTokens: 94
    },
    samplePayload: {
      model: "qwen2.5-72b-instruct",
      response: {
        esi_tier: 1,
        specialty_required: "interventional_cardiology",
        requires_ventilator: false,
        critical_window_mins: 90
      }
    }
  },
  {
    tier: "Decision Compute",
    service: "Function Compute (FC 3.0)",
    badge: "FC 3.0 Serverless",
    role: "Serverless event-driven execution evaluating the TTDC multi-factor optimization formula across candidate facilities within 20 km in <200 ms.",
    features: [
      "0 ms cold start with Provisioned Instances during peak rush hours",
      "Massively parallel candidate scoring across 20+ healthcare facilities",
      "Zero idle compute cost for low-traffic regional hours"
    ],
    telemetryMetrics: {
      executionTime: "34 ms",
      memoryUsage: "128 MB",
      billableCost: "$0.000042 / run"
    },
    samplePayload: {
      function_name: "evaluate_ttdc_matrix",
      evaluated_facilities: 4,
      optimal_facility: "RIC Rawalpindi",
      ttdc_mins: 16
    }
  },
  {
    tier: "Spatial Core",
    service: "ApsaraDB for RDS (PostgreSQL + PostGIS)",
    badge: "PostgreSQL 16 + PostGIS",
    role: "Spatial indexing for hospital catchment boundaries, road network topologies, and fixed equipment registries.",
    features: [
      "High-performance ST_DWithin and ST_Distance geospatial indexing",
      "Hospital service area isochrones and dynamic corridor fencing",
      "ACID transactions for facility capability registers"
    ],
    telemetryMetrics: {
      queryTime: "8.4 ms",
      indexType: "GIST (Spatial)",
      activeFacilities: 124
    },
    samplePayload: {
      sql_query: "SELECT id, name, ST_Distance(geom, ST_MakePoint(73.0640, 33.7125)::geography) AS dist_m FROM tertiary_hospitals WHERE ST_DWithin(geom, ST_MakePoint(73.0640, 33.7125)::geography, 20000) ORDER BY dist_m ASC;"
    }
  },
  {
    tier: "Real-Time State",
    service: "ApsaraDB for Redis",
    badge: "Redis Enterprise Cache",
    role: "Microsecond-speed distributed cache holding live hospital capacity tokens (available ventilators, active triage bays, geofenced ambulance dwell counts).",
    features: [
      "Sub-millisecond read/write for live bed and equipment tokens",
      "Atomic reservation locking (SETNX with TTL leases to prevent double booking)",
      "Automatic expiration if ambulance diverts or cancels"
    ],
    telemetryMetrics: {
      p99Latency: "0.8 ms",
      lockLeaseTime: "1800s (30m)",
      keyspaceHitRate: "99.4%"
    },
    samplePayload: {
      redis_command: "SET hospital:ric:cathlab_2 'LOCKED_BY_ALK-1023' NX EX 1800",
      result: "OK (Token Leased)"
    }
  },
  {
    tier: "Triage Alerting",
    service: "DirectMail / SMS Service",
    badge: "DirectMail / SMS Gateway",
    role: "Auto-dispatches electronic pre-arrival notification packets directly to receiving hospital triage charge nurses and on-call specialist teams.",
    features: [
      "Automated SMS dispatch to on-call cardiologist / trauma team within 500ms",
      "FHIR/HL7 compliant pre-arrival summary packet emailed to charge nurse console",
      "Real-time delivery status webhooks"
    ],
    telemetryMetrics: {
      dispatchLatency: "410 ms",
      deliveryRate: "99.8%",
      channel: "Multi-channel (SMS + Push + FHIR Webhook)"
    },
    samplePayload: {
      recipient: "+92-300-CARDIAC-ALERT",
      message: "[SEHATROUTE ALERT] Incoming ESI-1 STEMI via Alkhidmat 1023. ETA 14m. Cath Lab 2 reserved. Patient: 45M."
    }
  }
];
