# SehatRoute AI — Bano Qabil AI Hackathon MVP Blueprint

**Status:** Initially Selected → Now Must Prove the Core Decision Loop Works

---

## Objective

The idea has already passed initial selection. The goal is no longer to prove that SehatRoute AI is an interesting concept. The goal is to prove that **the core decision loop actually works**:

```
Clinical Input → AI Extracts Requirements → Hospitals Evaluated → TTDC Selects Hospital → Route on Map → Hospital Receives & Reserves
```

Anything outside that loop is secondary.

---

## What to Actually Build

> Do not attempt a real Alkhidmat integration, real hospital APIs, or production-grade live capacity infrastructure. You don't control those systems, and spending hackathon time pretending otherwise weakens the demo.

**Build a simulation backed by a real decision engine.**

---

## The Three Screens

### Screen 1: Ambulance / Dispatcher

The EMT enters something like:

> "62-year-old male, unconscious, GCS 7, SpO₂ 79%, severe respiratory distress."

Qwen returns structured data:

```json
{
  "esi_level": 1,
  "required_resources": ["ventilator", "icu"],
  "specialty": "critical_care",
  "priority": "critical"
}
```

> **Important distinction:** Qwen should NOT choose the hospital. It converts messy human input into structured attributes. The deterministic routing engine makes the safety-critical decision.

---

### Screen 2: Routing Decision (The Live Decision Map)

Use 4–6 simulated hospitals with realistic-looking dynamic capacity data.

**Hospital A (closest):**
```json
{
  "hospital": "Hospital A",
  "distance_km": 2.1,
  "eta_minutes": 6,
  "ventilators_available": 0,
  "icu_beds_available": 0,
  "estimated_offload_minutes": 32
}
```

**Hospital B (further but capable):**
```json
{
  "hospital": "Hospital B",
  "distance_km": 6.4,
  "eta_minutes": 14,
  "ventilators_available": 2,
  "icu_beds_available": 1,
  "estimated_offload_minutes": 7
}
```

Then visually show:

| Route | Path | Result |
|---|---|---|
| **Traditional Routing** | Ambulance → Hospital A (6 min) | ❌ |
| **SehatRoute** | Ambulance → Hospital B (14 + 7 = 21 min TTDC) | ✅ |

And explicitly display:

> **Hospital A bypassed: required ventilator unavailable.**

**That single moment is probably the most important part of the entire demonstration.**

---

### Screen 3: Receiving Hospital Dashboard

Once Hospital B is selected, its dashboard receives:

```
╔══════════════════════════════════════╗
║     INCOMING CRITICAL PATIENT        ║
║                                      ║
║  ETA: 14 min                         ║
║  ESI: Level 1                        ║
║  Required: Ventilator + ICU          ║
║  GCS: 7                              ║
║  SpO₂: 79%                           ║
║                                      ║
║       [ ACCEPT & RESERVE ]           ║
╚══════════════════════════════════════╝
```

Clicking **Accept & Reserve** changes capacity:
- Ventilators: `2 → 1`
- ICU Beds: `1 → 0`

And the ambulance screen receives:

```
✓ Hospital B confirmed
  Ventilator reserved
  Proceed to destination
```

**This demonstrates resource-aware coordination between ambulance and hospital** — much stronger than a UI mockup.

---

## Refined TTDC Formula

The refined version separates eligibility from scoring:

$$TTDC_i = T_{\text{transit},i} + T_{\text{offload},i} + T_{\text{treatment-ready},i}$$

Subject to:

$$Eligibility(H_i, P) = \begin{cases} 1, & R_P \subseteq R_{H_i}^{available} \\ 0, & \text{otherwise} \end{cases}$$

Then:

$$H^* = \arg\min_{H_i : Eligibility(H_i, P) = 1} TTDC_i$$

**In plain language:**
1. First eliminate hospitals incapable of providing the patient's required definitive care.
2. Then minimize TTDC among clinically eligible hospitals.

This is cleaner than putting infinity directly into the score and is extremely defensible.

---

## Atomic Capacity Leases (Race Condition Solution)

### The Problem

Three ambulances see 1 available ventilator at Hospital A. All three travel there. On arrival, two discover it's occupied.

### The Solution

An automatic, authenticated, time-limited **capacity lease** created atomically at the moment a verified ambulance is routed:

```
Verified Ambulance
        ↓
Patient requirements determined
        ↓
SehatRoute finds Hospital A
Ventilator availability = 1
        ↓
ATOMIC CAPACITY CLAIM
        ↓
Ventilator token: 1 → 0
        ↓
Route immediately to Hospital A
        ↓
Hospital notified:
"Verified ambulance inbound — ventilator allocated"
```

### Race Condition Test

Initially: Hospital A has 1 ventilator available.

Three ambulances simultaneously submit ventilator-dependent patients:

- **Ambulance 1** claims first: `availableVentilators: 1 → 0` → Routes to **Hospital A**
- **Ambulance 2** checks: `availableVentilators = 0` → Hospital A excluded → Routes to **Hospital B**
- **Ambulance 3** checks: Hospital A excluded → Routes to **Hospital C**

```
Ambulance 1 ──── Hospital A (ventilator allocated)
Ambulance 2 ──── Hospital B
Ambulance 3 ──── Hospital C
```

**Race condition solved.**

### Lease Expiry / TTL

If the ambulance never arrives (cancels, breaks down, dispatcher releases, GPS shows it turned away), the lease expires:

```
Capacity Lease:
  Hospital: A
  Resource: Ventilator
  Ambulance: AK-017
  Created: 19:31
  ETA: 12 min
  Expires: ETA + 10 min
  Status: INBOUND
```

On expiry or cancellation:
- Inbound allocation: `1 → 0`
- Available: `0 → 1`

Resource returns to the routing pool. Like a distributed-systems lock with TTL.

---

## Dual Trust Model (Public vs Verified)

### Public User (Citizen / Household)

```
Public submission
      ↓
AI analyzes requirements
      ↓
SehatRoute recommends facility
      ↓
NO scarce-resource lease
```

Public users see:

```
⚠ CRITICAL EMERGENCY

Hospital B currently reports appropriate
emergency capability.

Estimated travel: 12 min

⚠ Capacity cannot be guaranteed until
  emergency transport/dispatch verification.

[Call Emergency Service]
[Get Directions]
```

### Verified Ambulance (Alkhidmat)

```
Authenticated Alkhidmat ambulance
      ↓
Clinical assessment
      ↓
SehatRoute selects hospital
      ↓
ATOMIC capacity lease
      ↓
Route immediately
      ↓
Hospital gets verified pre-arrival alert
```

### Why This Matters

A random person cannot enter *"My father needs a ventilator"* 50 times and consume Rawalpindi's entire digital ventilator inventory.

| Source | Routing recommendation? | Alert hospital? | Reserve resource? |
|---|---|---|---|
| Public user | Yes | Limited | No |
| Verified ambulance | Yes | Yes | No automatic — atomic lease |
| Hospital operator | — | Yes | Yes / mark committed |

---

## Hospital Capacity Model

Hospitals should control what capacity they expose:

```json
{
  "ventilators": {
    "total": 8,
    "operational": 8,
    "occupied": 6,
    "dispatch_allocatable": 1,
    "inbound_allocated": 0
  }
}
```

SehatRoute only touches `dispatch_allocatable`. The hospital retains control over what capacity it exposes to the network.

---

## Three Demo Scenarios + Custom Input

| Scenario | Patient | Closest Hospital Problem | SehatRoute Decision |
|---|---|---|---|
| **Respiratory failure** | GCS 7, SpO₂ 79% | Ventilator unavailable | Bypass → ventilator-capable hospital |
| **STEMI** | Chest pain + ECG evidence | Cath lab offline | Bypass → PCI-capable hospital |
| **Major trauma** | Polytrauma, hypotension | Trauma bays saturated | Route → available trauma center |

Then add **Custom Emergency** where judges can type their own scenario.

> **That last feature matters.** A judge might type: *"27-year-old male, motorcycle accident, unconscious, severe bleeding, BP 70/40."* If Qwen converts it into structured requirements and the engine changes hospital selection live, the AI suddenly looks real rather than rehearsed.

---

## The Counterfactual (Most Memorable Part)

### WITHOUT SehatRoute

```
Ambulance
    ↓ 6 min
Hospital A
    ↓
No ventilator available
    ↓ 35 min assessment/wait
Secondary referral
    ↓ 22 min
Hospital B

Estimated definitive care: 63 min
```

### WITH SehatRoute

```
Ambulance
    ↓ 14 min
Hospital B
    ↓
Reserved ventilator

Estimated definitive care: 21 min
```

### **TTDC SAVED: 42 MINUTES**

> The numbers in the PoC should be clearly marked as simulation outputs, not clinical outcome claims.

---

## Why Qwen Must NOT Choose the Hospital

**Do NOT build:**

```
Patient description → Qwen → "Send patient to Hospital B"
```

**Build:**

```
Unstructured clinical description
              ↓
            Qwen
              ↓
Structured extraction
              ↓
{ esi: 1, trauma: true, resources: [...] }
              ↓
Deterministic eligibility rules
              ↓
TTDC optimization
              ↓
Hospital B
```

When a judge asks: *"What happens if the AI hallucinates?"*

The answer becomes:

> "The LLM does not have authority to dispatch an ambulance. It performs constrained information extraction. Hospital eligibility and routing are determined by deterministic resource constraints and the TTDC optimization engine."

**That is a much more mature AI architecture.**

---

## Hackathon Architecture

Don't overengineer. Use what matters:

```
              ┌──────────────────────┐
              │  Ambulance / EMT UI  │
              │       React          │
              └──────────┬───────────┘
                         │
                         ▼
                 Alibaba API Gateway
                         │
         ┌───────────────┴──────────────┐
         ▼                              ▼
 Qwen / Model Studio             Function Compute
 Clinical extraction              TTDC Engine
         │                              │
         │ JSON                         │
         └──────────────┬───────────────┘
                        ▼
               Hospital State Store
             PostgreSQL / Redis
                        │
                        ▼
             ┌────────────────────┐
             │ Routing Decision   │
             │ + Map UI           │
             └─────────┬──────────┘
                       │
                       ▼
             Hospital Dashboard
             Accept / Reserve
```

> For judging, make at least **Qwen/Model Studio** and **Function Compute** genuinely operational on Alibaba Cloud. If time permits, add the database layer. Don't claim that a component is running on Alibaba Cloud when it's actually simulated locally; label simulated integrations clearly.

---

## MVP Feature Scope (Frozen)

### ✅ Build These

- React ambulance/dispatcher interface
- React hospital dashboard
- Interactive Leaflet map
- 5–8 simulated hospitals with dynamic capacity
- Ambulance coordinate + routing/ETA calculation
- Qwen clinical JSON extraction
- Deterministic clinical eligibility engine
- TTDC calculation
- Capacity-aware bypass
- Live hospital resource state
- Hospital acceptance/reservation
- Automatic resource decrement
- Ambulance confirmation
- 3 preset scenarios + custom input
- Alibaba Cloud deployment/integration
- Architecture diagram
- Explicit distinction between simulated and live data

### ❌ Do NOT Build

- Authentication system
- Complicated admin portal
- Billing
- Elaborate user management
- Nationwide database
- Real Alkhidmat integration
- Giant ML model

> Everything else goes into **Roadmap**, not the hackathon codebase.

---

## Pitch Deck Structure (7 Slides)

| Slide | Content |
|---|---|
| **1. Title & Hook** | *SehatRoute AI — Algorithmic Ambulance Routing to Definitive Care for Alkhidmat* |
| **2. The Pakistani Context** | PEMH overcrowding (96.7% extreme), 0.71 ICU beds per 100,000 |
| **3. Failure of "Closest-Distance" Routing** | Secondary referral trap (3.8–4.7 hour transfer delays) |
| **4. The Innovation (TTDC Engine)** | Formula + bypass mechanism based on critical equipment |
| **5. Alibaba Cloud Architecture** | End-to-end cloud blueprint (API Gateway → FC 3.0 → PostGIS → Qwen-2.5 Bailian) |
| **6. Alkhidmat Fleet Integration** | Operational model: direct tie-in to 1023 centralized dispatch |
| **7. Roadmap & Next Steps** | Hackathon PoC → Pilot with selected Alkhidmat field hospitals |

---

## The Innovation

> The map itself isn't the innovation. Qwen isn't the innovation either. Even the hospital dashboard isn't.

**The innovation is the decision layer connecting patient need + hospital capability + congestion + travel time before the ambulance commits to a destination.**

That's the component to spend most engineering effort making bulletproof.

---

## Core Innovation Statement

> SehatRoute coordinates scarce emergency capacity between verified ambulances and hospitals using real-time clinical matching, TTDC optimization, and atomic inbound capacity allocation.
