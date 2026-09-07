# SehatRoute AI — End-to-End System Flowchart

This document provides the formal **Mermaid Flowchart** and architectural specifications for the SehatRoute AI tri-party orchestration network.

---

## 1. Clean Horizontal Mermaid Flowchart (Standard Theme)

Used on Slide 7 of `SehatRoute_AI_Pitch_Deck.pptx` and `pitch-deck.html`:

```mermaid
%%{init: {'theme': 'default', 'flowchart': {'htmlLabels': true, 'useMaxWidth': false, 'nodeSpacing': 55, 'rankSpacing': 30}}}%%
graph LR
    HOSPITAL["HOSPITAL"] -->|publishes available<br/>dispatch capacity| STATE["SehatRoute<br/>State Layer"]
    STATE --> PUBLIC["Public<br/>User"]
    STATE --> AMB["Verified<br/>Ambulance"]
    PUBLIC --> REC["Recommendation<br/>only"]
    AMB --> ANALYZED["Patient analyzed<br/>(Qwen-2.5 or latest model)"]
    ANALYZED --> TTDC["TTDC<br/>ranking"]
    TTDC --> LEASE{"Atomic<br/>capacity<br/>lease"}
    LEASE -->|SUCCESS| ROUTE["Route<br/>now"]
    LEASE -->|FAILURE| FAIL["Try next<br/>hospital"]
    ROUTE --> ALERT["Pre-arrival<br/>alert"]
    ALERT --> PREP["Hospital<br/>prepares"]
```

---

## 2. Extended Flowchart (Dark Themed with Subgraphs)

```mermaid
flowchart TD
    subgraph Hospital_Layer ["🏥 Hospital Authority Layer"]
        H["HOSPITAL"]
        H -->|"publishes available<br/>dispatch capacity"| SL[("⚡ SehatRoute State Layer<br/>(Redis Distributed Cache)")]
    end

    subgraph Access_Control ["🛡️ Role-Based Access Control"]
        SL -->|"Public Citizen query"| PU["Public User"]
        SL -->|"Authenticated 1023 dispatch"| VA["Verified Ambulance"]
        PU -->|"Safe triage advisory"| RO["Recommendation only<br/>(Zero capacity lock privilege)"]
    end

    subgraph Triage_Protocol ["🚑 Clinical Triage & Lease Protocol"]
        VA --> PA["Patient analyzed<br/>(Qwen-2.5 Latest)"]
        PA --> TR["TTDC ranking<br/>(Transit + Queue + Prep)"]
        TR --> AL{"Atomic capacity lease<br/>(SET NX PX 45-min TTL)"}
    end

    subgraph Outcome_Branches ["⚖️ Consensus Outcomes"]
        AL -->|"SUCCESS<br/>(Token acquired)"| S_RN["Route now<br/>(Token #LK-4091)"]
        AL -->|"FAILURE<br/>(Contention 0 left)"| F_TN["Try next hospital<br/>(12ms Failover Re-rank)"]
        S_RN --> PA_AL["Pre-arrival alert sent<br/>(Telemetry broadcast)"]
        PA_AL --> HP["Hospital prepares<br/>(Cath Lab / ICU team staged)"]
    end

    %% Visual Styling
    classDef hospitalNode fill:#0f291e,stroke:#10b981,stroke-width:2px,color:#f8fafc;
    classDef stateNode fill:#0d233a,stroke:#06b6d4,stroke-width:2px,color:#f8fafc;
    classDef publicNode fill:#1e1b4b,stroke:#818cf8,stroke-width:1.5px,color:#f8fafc;
    classDef ambulanceNode fill:#172554,stroke:#3b82f6,stroke-width:2px,color:#f8fafc;
    classDef triageNode fill:#1f2937,stroke:#94a3b8,stroke-width:1.5px,color:#f8fafc;
    classDef successNode fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#f8fafc;
    classDef failureNode fill:#450a0a,stroke:#ef4444,stroke-width:2px,color:#f8fafc;

    class H,HP hospitalNode;
    class SL stateNode;
    class PU,RO publicNode;
    class VA ambulanceNode;
    class PA,TR triageNode;
    class S_RN,PA_AL successNode;
    class F_TN,AL failureNode;
```

---

## 2. ASCII Architecture Model

```text
                    HOSPITAL
                       │
              publishes available
             dispatch capacity
                       │
                       ▼
             SehatRoute State Layer
                       │
                ┌──────┴───────┐
                │              │
             Public         Verified
              User          Ambulance
                │              │
           Recommendation      │
           only                │
                               ▼
                       Patient analyzed
                               │
                               ▼
                         TTDC ranking
                               │
                               ▼
                    Atomic capacity lease
                               │
                        ┌──────┴──────┐
                        │             │
                     SUCCESS        FAILURE
                        │             │
                    Route now      Try next
                        │           hospital
                        ▼
                Pre-arrival alert
                        │
                        ▼
                  Hospital prepares
```

---

## 3. Architecture Specification

1. **Hospital Authority Layer:** Hospitals publish inbound capacity (ICU beds, Cath Lab, trauma bays) without internal IT friction via progressive web or SMS.
2. **Public User Separation:** Citizens receive clinical triage and recommended destinations, but **cannot lock capacity**. This eliminates prank lockouts and denial-of-service vulnerabilities.
3. **Verified Fleet Pipeline:** Only authenticated ambulances (e.g., Alkhidmat 1023 fleet) can execute the atomic lease protocol.
4. **Concurrency Resolution:** Redis `SET NX PX` distributed locks ensure zero thundering herd problems. Contention is resolved in under 12ms with automatic failover to the next best hospital.
