const GEMINI_SYSTEM_PROMPT = `You are an emergency medical triage AI for Pakistan's Alkhidmat Foundation ambulance service. 
Your job: Parse the user's message (which may be in English, Urdu, or Roman Urdu) describing a medical emergency and extract structured triage information.

You MUST respond ONLY with valid JSON in this exact format, nothing else:
{
  "triage_urgency": "CRITICAL" | "URGENT" | "MODERATE" | "LOW",
  "suspected_condition": "brief medical condition name",
  "required_department": "department name",
  "mandatory_facilities": ["list", "of", "required", "equipment/wards"],
  "doctor_specialty_required": "specialty name",
  "esi_level": 1-5,
  "suggested_actions": "brief first-aid advice for the person at scene"
}

ESI Level Guide:
1 = Immediate life threat (cardiac arrest, severe trauma, respiratory failure)
2 = Emergent (chest pain, stroke symptoms, severe bleeding)
3 = Urgent (moderate injuries, fractures, high fever with complications)
4 = Less urgent (minor injuries, mild symptoms)
5 = Non-urgent (minor complaints)

Common Pakistani medical facilities to reference:
- Cath Lab (for cardiac emergencies)
- ICU Bed, Ventilator (for respiratory/critical)
- Burn Unit (for burn patients)
- Trauma Bay, CT Scanner (for trauma)
- Stroke Suite (for neurological)
- Pediatric ICU (for children)
- General Ward, Emergency Bed

Respond ONLY with the JSON object. No markdown, no explanation, no code fences.`;

// Deterministic fallback when Gemini API is unavailable
function fallbackParse(text) {
  const lower = text.toLowerCase();

  // Cardiac keywords
  if (lower.includes('chest pain') || lower.includes('heart') || lower.includes('dil') ||
      lower.includes('seena') || lower.includes('cardiac') || lower.includes('stemi') ||
      lower.includes('heart attack')) {
    return {
      triage_urgency: "CRITICAL",
      suspected_condition: "Suspected Cardiac Emergency (Chest Pain / Heart Attack)",
      required_department: "Cardiology / Emergency",
      mandatory_facilities: ["Cath Lab", "Cardiac ICU Bed", "Defibrillator"],
      doctor_specialty_required: "Cardiologist",
      esi_level: 1,
      suggested_actions: "Keep patient seated upright. Loosen tight clothing. Give aspirin (300mg) if available and not allergic. Do not give water."
    };
  }

  // Respiratory keywords
  if (lower.includes('breathing') || lower.includes('saans') || lower.includes('oxygen') ||
      lower.includes('respiratory') || lower.includes('ventilator') || lower.includes('dam ghutna') ||
      lower.includes('asthma') || lower.includes('inhaler')) {
    return {
      triage_urgency: "CRITICAL",
      suspected_condition: "Acute Respiratory Distress",
      required_department: "Pulmonology / Critical Care",
      mandatory_facilities: ["Ventilator", "ICU Bed", "Oxygen Supply"],
      doctor_specialty_required: "Pulmonologist / Intensivist",
      esi_level: 1,
      suggested_actions: "Sit patient upright. Open windows for fresh air. If inhaler available, use it. Do not lay patient flat."
    };
  }

  // Trauma keywords
  if (lower.includes('accident') || lower.includes('bleeding') || lower.includes('fracture') ||
      lower.includes('khoon') || lower.includes('hadsa') || lower.includes('gir') ||
      lower.includes('fell') || lower.includes('crash') || lower.includes('trauma') ||
      lower.includes('injury') || lower.includes('chot')) {
    return {
      triage_urgency: "CRITICAL",
      suspected_condition: "Trauma / Injury with Possible Internal Damage",
      required_department: "Trauma & Emergency Surgery",
      mandatory_facilities: ["Trauma Bay", "CT Scanner", "Blood Bank"],
      doctor_specialty_required: "Trauma Surgeon",
      esi_level: 2,
      suggested_actions: "Do not move patient if spine injury suspected. Apply pressure to bleeding wounds with clean cloth. Keep patient warm."
    };
  }

  // Burn keywords
  if (lower.includes('burn') || lower.includes('jalana') || lower.includes('aag') ||
      lower.includes('fire') || lower.includes('jal')) {
    return {
      triage_urgency: "CRITICAL",
      suspected_condition: "Severe Burns",
      required_department: "Burns Unit / Plastic Surgery",
      mandatory_facilities: ["Burn Unit", "Ventilator", "ICU Bed"],
      doctor_specialty_required: "Burns Specialist / Plastic Surgeon",
      esi_level: 1,
      suggested_actions: "Cool burn with running water for 10 minutes. Do not apply ice, butter, or toothpaste. Cover loosely with clean cloth."
    };
  }

  // Stroke keywords
  if (lower.includes('stroke') || lower.includes('paralysis') || lower.includes('lakwa') ||
      lower.includes('face droop') || lower.includes('speech') || lower.includes('falij')) {
    return {
      triage_urgency: "CRITICAL",
      suspected_condition: "Acute Stroke (Possible Cerebrovascular Event)",
      required_department: "Neurology / Stroke Unit",
      mandatory_facilities: ["Stroke Suite", "CT Scanner", "Neuro ICU"],
      doctor_specialty_required: "Neurologist",
      esi_level: 1,
      suggested_actions: "Note exact time symptoms started. Do not give food or water. Lay patient on side. Call ambulance immediately."
    };
  }

  // Pediatric keywords
  if (lower.includes('child') || lower.includes('baby') || lower.includes('bacha') ||
      lower.includes('bachha') || lower.includes('toddler') || lower.includes('infant') ||
      lower.includes('pediatric') || lower.includes('newborn')) {
    return {
      triage_urgency: "URGENT",
      suspected_condition: "Pediatric Emergency",
      required_department: "Pediatric Emergency",
      mandatory_facilities: ["Pediatric ICU", "Pediatric Emergency Bed"],
      doctor_specialty_required: "Pediatrician",
      esi_level: 2,
      suggested_actions: "Keep child calm and comfortable. Monitor breathing. Do not give adult medications."
    };
  }

  // Default
  return {
    triage_urgency: "URGENT",
    suspected_condition: "Medical Emergency (Requires Assessment)",
    required_department: "Emergency Department",
    mandatory_facilities: ["Emergency Bed", "Basic Diagnostics"],
    doctor_specialty_required: "Emergency Physician",
    esi_level: 3,
    suggested_actions: "Keep patient comfortable. Monitor breathing and consciousness. Be ready to describe symptoms to the ambulance team."
  };
}

export function getActiveGeminiKey(explicitKey = '') {
  if (explicitKey && explicitKey.trim()) return explicitKey.trim();
  const envKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY)
    ? import.meta.env.VITE_GEMINI_API_KEY.trim()
    : '';
  if (envKey) return envKey;
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('gemini_api_key');
    if (stored && stored.trim()) return stored.trim();
  }
  return '';
}

export async function parseWithGemini(apiKey, userMessage) {
  const keyToUse = getActiveGeminiKey(apiKey);

  if (!keyToUse) {
    return { result: fallbackParse(userMessage), source: 'fallback', error: 'No API key provided (Fallback rule engine active)' };
  }

  const payload = {
    system_instruction: { parts: [{ text: GEMINI_SYSTEM_PROMPT }] },
    contents: [{ parts: [{ text: userMessage }] }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 2048,
      responseMimeType: "application/json"
    }
  };

  // Supported models in Google Gemini API
  const models = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.6-flash'];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (response.status === 429) {
        return {
          result: fallbackParse(userMessage),
          source: 'fallback',
          error: 'API rate limit reached — using built-in emergency rule engine'
        };
      }

      if (response.status === 400) {
        return {
          result: fallbackParse(userMessage),
          source: 'fallback',
          error: 'Invalid API key — using built-in emergency rule engine'
        };
      }

      if ((response.status === 404 || response.status === 503) && model !== models[models.length - 1]) {
        // Model not available or temporarily busy, try next model in chain
        continue;
      }

      if (!response.ok) {
        return {
          result: fallbackParse(userMessage),
          source: 'fallback',
          error: `API error (${response.status}) — using built-in emergency rule engine`
        };
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        return { result: fallbackParse(userMessage), source: 'fallback', error: 'Empty API response' };
      }

      let cleanText = text.trim();
      if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
      }

      const parsed = JSON.parse(cleanText);
      return { result: parsed, source: 'gemini', error: null };

    } catch (err) {
      if (model !== models[models.length - 1]) continue;
      return {
        result: fallbackParse(userMessage),
        source: 'fallback',
        error: `${err.message} — using built-in emergency rule engine`
      };
    }
  }

  return { result: fallbackParse(userMessage), source: 'fallback', error: 'Could not connect to Gemini — fallback active' };
}

export { fallbackParse };
