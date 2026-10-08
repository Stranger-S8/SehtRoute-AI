# SehatRoute AI — 4-Minute Bilingual Loom Pitch Script (English + Urdu Mix)
*Optimized specifically for Free Loom (5-Minute Hard Limit: Target 3m 45s to 4m 15s)*

---

## 📋 Quick Pre-Recording Setup (Sirf 1 Minute)

1. **Browser Tab**: `http://localhost:5173` open karein full screen.
2. **City**: Lahore (ya Rawalpindi).
3. **Mode**: Paramedic (1023 CAD).
4. **Input Box me paste karne ke liye text ready rakhein**:
   ```text
   55 saal ke mareez ko shaded seene me dard hai jo ultay bazoo me ja raha hai, shaded paseena aa raha hai. Suspected acute STEMI / Heart Attack.
   ```
5. **Loom Camera**: Corner me chhota bubble rakhein, confidence aur energy ke sath bole!

---

## 🎙️ Complete Word-for-Word Script (English + Urdu Mix)

### [0:00 – 0:45] 1. The Hook & Pakistan Ki Ground Reality
**Screen par kya dikhana hai**: SehatRoute AI ka main Dispatch Console open ho, Alkhidmat 1023 aur Rescue 1122 ke badges visible hon.

> **Speaker (Aap)**:
> "Assalam-o-Alaikum judges and everyone.
> 
> Pakistan ke baray cities me jab koi medical emergency hoti hai, to ambulance driver ka standard instinct hota hai ke mareez ko geographically closest hospital le jaya jaye.
> 
> Lekin hamari roads par, **the geographically closest hospital is often a death trap.**
> 
> Real clinical data dekhein: PAFMJ ki 2023 study jo PEMH Rawalpindi me hui, usne prove kiya ke hamare major tertiary emergency departments **96.7% time Level-6 Extreme Overcrowding** me operate karte hain. Aur nationwide data ke mutabiq, Pakistan me sirf **0.71 ICU beds per 100,000 citizens** hain.
> 
> Jab ek ambulance mareez ko qareebi hospital le jati hai aur wahan ventilator ya Cath Lab available nahi hoti, to unhe kisi doosre hospital transfer karna parta hai. Aga Khan University Hospital ki trauma registry ke mutabiq, is secondary transfer me **3.8 se 4.7 ghante ki fatal delay** aati hai — jo preventable deaths ki sab se bari wajah hai.
> 
> Is problem ko solve karne ke liye humne banaya hai: **SehatRoute AI**."

---

### [0:45 – 1:30] 2. What We Built & The TTDC Formula
**Screen par kya dikhana hai**: Cursor se Dispatch controls, Paramedic mode aur traffic multiplier dikhayein.

> **Speaker (Aap)**:
> "SehatRoute AI ek intelligent emergency dispatch aur clinical routing engine hai, built specifically for Pakistan's pre-hospital network — Alkhidmat Foundation ki 310+ ambulance fleet aur Rescue 1122.
> 
> Google Maps ya standard GPS algorithms sirf road distance ya transit time calculate karte hain. Wo ye assume karte hain ke har hospital me beds aur doctors free hain.
> 
> SehatRoute AI is naive routing ko replace karta hai hamare **TTDC Engine** ke sath:
> **Total Time to Definitive Care = Transit Time + ER Queue Offload Delay + Capacity Feasibility Gate.**
> 
> Agar kisi hospital me patient ki required specialized facility — jese Primary PCI Cath Lab ya Burn Unit — available nahi hai, to engine us hospital par **infinite penalty** lagata hai aur automatically bypass kar ke us facility par route karta hai jahan actual treatment foran shuru ho sakti hai."

---

### [1:30 – 2:30] 3. Live Demo — Multilingual AI Triage & Dynamic TTDC
**Screen par kya dikhana hai**:
1. Input box me click karein.
2. Paste karein: `55 saal ke mareez ko shaded seene me dard hai jo ultay bazoo me ja raha hai, shaded paseena aa raha hai. Suspected acute STEMI / Heart Attack.`
3. **Dispatch** button click karein.
4. Triage result aur ranked hospital cards dikhayein.

> **Speaker (Aap)**:
> "Ab iska live demo dekhein. 
> 
> Dispatcher ya 1023 paramedic ne plain Urdu, Roman Urdu ya English me patient ki condition enter ki. 
> 
> Hamara Google Gemini AI engine is unstructured text ko foran clinical format me parse karta hai:
> - Triage Level assign hua: **ESI Level 2 — Emergent**.
> - Suspected Condition: **Acute STEMI / Myocardial Infarction**.
> - Mandatory Clinical Requirement: **Operational Cath Lab aur Cardiac Resuscitation Team**.
> 
> Ab screen par hospital ranking dekhein:
> Mayo Hospital patient se sirf 1.8 km door hai, sirf 8 minute ki drive. Normal GPS ambulance ko yahin bhej deta. Lekin SehatRoute AI ne isay **BYPASSED** mark kar diya. Kyun? Kyunki iska Cath Lab offline hai aur ER queue me 45 minute ka waiting delay hai! Agar heart attack ka patient wahan jata to fatal delay ho jati.
> 
> Instead, hamara engine recommend kar raha hai **Punjab Institute of Cardiology (PIC)**. Halankay PIC 5.2 km door hai aur 11 minute lagte hain, lekin wahan Cath Lab operational hai aur queue clear hai. 
> Result? Total Time to Definitive Care sirf **16 minutes** — bacha liye mareez ke 35 se zyada critical minutes!"

---

### [2:30 – 3:15] 4. Decision Map & Atomic Capacity Lock
**Screen par kya dikhana hai**:
1. Map par Red bypassed route aur Green recommended route dikhayein.
2. Recommended hospital card par green **"Request Capacity Lock"** button click karein.
3. Reservation token (e.g., `#LK-4091`) aur countdown timer dikhayein.
4. Top header se **"Hospital Registry"** tab par click karein (Punjab ke 80+ hospitals dikhayein) aur wapas Dispatch par aayein.

> **Speaker (Aap)**:
> "Tactical Map par driver ko green aur red routes ke sath clear clinical justifications nazar aati hain.
> 
> Ab jaise hi paramedic **'Request Capacity Lock'** click karta hai:
> Hamara system backend par ek **Atomic Capacity Lease** create karta hai with a 45-minute countdown. 
> Iska faida ye hai ke jab tak ambulance hospital pohnchegi, wahan bed aur Cath Lab is patient token ke liye lock ho chuka hoga.
> 
> Sath hi receiving ER charge nurse ko automatic electronic pre-arrival handshake chala jata hai, taake cardiology team ambulance ke pohnchne se pehle ready khari ho.
> 
> Aur hamare **Hospital Registry** section me humne Punjab ke **80 se zyada public aur private hospitals** ka live database map kiya hai — with bed telemetry, specialized departments, aur overcrowding indicators."

---

### [3:15 – 3:50] 5. Proposed Architecture & Ground Reality
**Screen par kya dikhana hai**: Main Emergency Dispatch screen par wapas aa jayein.

> **Speaker (Aap)**:
> "Hum judges ke sath bilkul transparent rehna chahte hain:
> 
> **SehatRoute AI ek proposed architecture aur fully working simulation engine hai.**
> 
> Isay Alkhidmat 1023 aur Rescue 1122 ke sath live ground production par deploy karne ke liye, ye system 2 major external pipelines ke sath integrate karne ke liye design kiya gaya hai:
> 1. **Google Maps Platform Routes & Distance Matrix APIs** — Pakistan ke live traffic data ke liye.
> 2. **Provincial Health Department & PITB Telemetry APIs** — hospitals ke live bed occupancy aur equipment feed ke liye.
> 
> Saari core intelligence — clinical triage parser, TTDC optimization math, failover routing, aur atomic reservation locks — 100% build aur test ho chuki hai, ready to plug into real-world feeds."

---

### [3:50 – 4:15] 6. Closing & Call to Action
**Screen par kya dikhana hai**: Camera ki taraf dekhein ya header ka mission banner dikhayein.

> **Speaker (Aap)**:
> "Emergency care me, distance is not the enemy — delay is. In acute cardiac, trauma, and pediatric cases: **time is tissue, and time is life.**
> 
> Ambulances aur overloaded hospitals ke darmiyan coordination create kar ke, SehatRoute AI emergency dispatch ko ek andhadhundh gamble se badal kar guaranteed definitive care banata hai.
> 
> Thank you so much for your time. We are ready for questions!"
> *(Loom recording yahan stop karein around 4m 05s)*
