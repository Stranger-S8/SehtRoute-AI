#!/usr/bin/env python3
"""
Generate a beautiful, descriptive Excalidraw flow diagram for SehatRoute AI.
Outputs:
1. /mnt/New_Volume/SehatRoute AI/docs/SehatRoute_AI_Flow.excalidraw (Native Excalidraw JSON)
2. /mnt/New_Volume/SehatRoute AI/docs/SehatRoute_AI_Flow.svg (Vector SVG for instant browser preview)
"""

import json
import random
import time

def make_id():
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return "".join(random.choice(chars) for _ in range(16))

elements = []

def add_rect(x, y, w, h, bg_color="#ffffff", stroke_color="#1e1e1e", stroke_width=2, roundness=3, stroke_style="solid", fill_style="solid"):
    el_id = make_id()
    el = {
        "id": el_id,
        "type": "rectangle",
        "x": x,
        "y": y,
        "width": w,
        "height": h,
        "angle": 0,
        "strokeColor": stroke_color,
        "backgroundColor": bg_color,
        "fillStyle": fill_style,
        "strokeWidth": stroke_width,
        "strokeStyle": stroke_style,
        "roughness": 1,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": {"type": roundness} if roundness else None,
        "seed": random.randint(1000, 999999),
        "version": 1,
        "versionNonce": 1,
        "isDeleted": False,
        "boundElements": [],
        "updated": int(time.time()),
        "link": None,
        "locked": False
    }
    elements.append(el)
    return el_id

def add_text(x, y, text, font_size=16, font_family=2, color="#1e1e1e", text_align="center", bold=False):
    el_id = make_id()
    lines = text.split("\n")
    line_height = font_size * 1.35
    w = max(len(l) for l in lines) * (font_size * 0.58)
    h = len(lines) * line_height
    el = {
        "id": el_id,
        "type": "text",
        "x": x,
        "y": y,
        "width": w,
        "height": h,
        "angle": 0,
        "strokeColor": color,
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 1,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": None,
        "seed": random.randint(1000, 999999),
        "version": 1,
        "versionNonce": 1,
        "isDeleted": False,
        "boundElements": [],
        "updated": int(time.time()),
        "link": None,
        "locked": False,
        "text": text,
        "fontSize": font_size,
        "fontFamily": font_family,
        "textAlign": text_align,
        "verticalAlign": "top",
        "baseline": font_size,
        "containerId": None,
        "originalText": text,
        "lineHeight": 1.35
    }
    elements.append(el)
    return el_id

def add_arrow(start_x, start_y, end_x, end_y, stroke_color="#495057", stroke_width=2, stroke_style="solid"):
    el_id = make_id()
    dx = end_x - start_x
    dy = end_y - start_y
    el = {
        "id": el_id,
        "type": "arrow",
        "x": start_x,
        "y": start_y,
        "width": abs(dx),
        "height": abs(dy),
        "angle": 0,
        "strokeColor": stroke_color,
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": stroke_width,
        "strokeStyle": stroke_style,
        "roughness": 1,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": {"type": 2},
        "seed": random.randint(1000, 999999),
        "version": 1,
        "versionNonce": 1,
        "isDeleted": False,
        "boundElements": [],
        "updated": int(time.time()),
        "link": None,
        "locked": False,
        "points": [[0, 0], [dx, dy]],
        "lastCommittedPoint": None,
        "startBinding": None,
        "endBinding": None,
        "startArrowhead": None,
        "endArrowhead": "arrow"
    }
    elements.append(el)
    return el_id

# ─────────────────────────────────────────────────────────────────────────────
# BUILD THE DIAGRAM
# ─────────────────────────────────────────────────────────────────────────────

# 1. Header Banner
add_rect(40, 30, 1120, 90, bg_color="#0f172a", stroke_color="#38bdf8", stroke_width=2, roundness=3)
add_text(500, 45, "SEHATROUTE AI — END-TO-END DISPATCH & ROUTING FLOW", font_size=24, font_family=2, color="#38bdf8", text_align="center")
add_text(520, 80, "From Emergency Call to Guaranteed Definitive Care Bay  •  Pre-Hospital Fleet: Alkhidmat 1023 & Rescue 1122", font_size=14, font_family=2, color="#94a3b8", text_align="center")

# SECTION A: THE CORE 5-STEP PIPELINE
y_start = 150
box_w = 200
box_h = 160
gap_x = 35

steps = [
    {
        "title": "STEP 1: INTAKE",
        "subtitle": "Multilingual Intake",
        "desc": "• Citizen or 1122 / 1023 call\n• Voice / Text in Urdu,\n  Roman Urdu, or English\n• Zero complex forms",
        "bg": "#eff6ff",
        "border": "#3b82f6",
        "header_color": "#1d4ed8"
    },
    {
        "title": "STEP 2: AI TRIAGE",
        "subtitle": "Clinical Parsing",
        "desc": "• Google Gemini + Fallback\n• ESI Urgency Level (1–5)\n• Extracts mandatory asset:\n  [Cath Lab, ICU, Burns]",
        "bg": "#f0fdf4",
        "border": "#22c55e",
        "header_color": "#15803d"
    },
    {
        "title": "STEP 3: TELEMETRY",
        "subtitle": "Dual-Stream Ingestion",
        "desc": "• Road: Google/TPL Maps (T_transit)\n• Hospital: Punjab HISDU live\n  portal + 1-tap nurse counter\n• NEDOCS queue backlog",
        "bg": "#fefce8",
        "border": "#eab308",
        "header_color": "#a16207"
    },
    {
        "title": "STEP 4: TTDC ENGINE",
        "subtitle": "Definitive Routing",
        "desc": "• Min (Transit + Queue + Gate)\n• If asset missing: penalty = +∞\n  (Instant auto-bypass)\n• Ranked candidate matrix",
        "bg": "#faf5ff",
        "border": "#a855f7",
        "header_color": "#7e22ce"
    },
    {
        "title": "STEP 5: ATOMIC LOCK",
        "subtitle": "Distributed Lease",
        "desc": "• Redis SET NX PX 45-min TTL\n• Prevents Thundering Herd\n• Bed reserved exclusively\n  while ambulance is en route",
        "bg": "#fff1f2",
        "border": "#f43f5e",
        "header_color": "#be123c"
    }
]

step_coords = []
for i, step in enumerate(steps):
    x = 40 + i * (box_w + gap_x)
    step_coords.append((x, y_start))
    # Box
    add_rect(x, y_start, box_w, box_h, bg_color=step["bg"], stroke_color=step["border"], stroke_width=2)
    # Header
    add_text(x + 20, y_start + 12, step["title"], font_size=14, font_family=2, color=step["header_color"])
    add_text(x + 20, y_start + 32, step["subtitle"], font_size=12, font_family=2, color="#475569")
    # Body text
    add_text(x + 15, y_start + 60, step["desc"], font_size=11, font_family=2, color="#1e293b", text_align="left")

# Horizontal Connecting Arrows between Steps 1 -> 2 -> 3 -> 4 -> 5
for i in range(4):
    start_x = 40 + (i + 1) * box_w + i * gap_x
    end_x = start_x + gap_x
    add_arrow(start_x, y_start + box_h // 2, end_x, y_start + box_h // 2, stroke_color="#64748b", stroke_width=2)

# SECTION B: THE FORK — TRADITIONAL ROUTING VS SEHATROUTE TTDC ROUTING
fork_y = 360
add_rect(40, fork_y, 1120, 240, bg_color="#f8fafc", stroke_color="#cbd5e1", stroke_width=2, roundness=3)
add_text(400, fork_y + 15, "REAL-WORLD CLINICAL IMPACT COMPARISON (STEMI CARDIAC EMERGENCY IN LAHORE)", font_size=15, font_family=2, color="#0f172a")

# Path A: Standard GPS / Closest Hospital Trap (RED)
path_a_y = fork_y + 50
add_rect(60, path_a_y, 510, 160, bg_color="#fef2f2", stroke_color="#ef4444", stroke_width=2)
add_text(80, path_a_y + 12, "❌ TRADITIONAL ROUTING (Google Maps / Closest ER)", font_size=13, font_family=2, color="#b91c1c")
add_text(80, path_a_y + 35, "1. Ambulance routes to closest hospital: Mayo Hospital (6 min transit)\n2. Unchecked Ground Reality: Cath Lab busy & NEDOCS Level-6 overcrowding\n3. Result: 45 min hallway offload delay + 0 available angioplasty slots\n4. Triggers secondary inter-hospital transfer: 3.8 to 4.7 hours delay\n⚠️ FATAL OUTCOME / EXTENSIVE MYOCARDIAL INFARCTION", font_size=11, font_family=2, color="#7f1d1d", text_align="left")

# Path B: SehatRoute TTDC Routing (GREEN)
path_b_y = fork_y + 50
add_rect(610, path_b_y, 530, 160, bg_color="#f0fdf4", stroke_color="#10b981", stroke_width=2)
add_text(630, path_b_y + 12, "✅ SEHATROUTE AI (TTDC Capacity-Aware Routing)", font_size=13, font_family=2, color="#047857")
add_text(630, path_b_y + 35, "1. Mayo Cath Lab busy -> P_capacity = +∞ -> Automated Algorithmic Bypass\n2. Next optimal candidate: Punjab Institute of Cardiology (PIC) (12 min transit)\n3. Pre-arrival Redis Atomic Lease locks Cath Lab Team en route\n4. Patient bypasses ER waiting queue directly to definitive angioplasty bay\n🎉 DEFINITIVE TREATMENT IN 16 MINUTES / HEART MUSCLE PRESERVED", font_size=11, font_family=2, color="#065f46", text_align="left")

# Arrow from Step 5 down to the comparison box
add_arrow(40 + 4 * (box_w + gap_x) + box_w // 2, y_start + box_h, 875, path_b_y, stroke_color="#10b981", stroke_width=2)

# SECTION C: INTEGRATION ARCHITECTURE (BOTTOM LAYER)
arch_y = 630
add_rect(40, arch_y, 1120, 110, bg_color="#0f172a", stroke_color="#6366f1", stroke_width=2, roundness=3)
add_text(450, arch_y + 15, "THREE-TIER ZERO-IT TELEMETRY ARCHITECTURE", font_size=14, font_family=2, color="#a5b4fc")

col_w = 340
# Tier 1
add_rect(60, arch_y + 40, col_w, 55, bg_color="#1e293b", stroke_color="#475569", stroke_width=1)
add_text(75, arch_y + 46, "TIER 1: HOSPITAL EDGE (NURSE)", font_size=11, font_family=2, color="#38bdf8")
add_text(75, arch_y + 64, "1-tap mobile/physical micro-counter (+1/-1 bed)\nat triage desk. Takes 2 seconds. Zero IT overhaul.", font_size=10, font_family=2, color="#94a3b8", text_align="left")

# Tier 2
add_rect(430, arch_y + 40, col_w, 55, bg_color="#1e293b", stroke_color="#475569", stroke_width=1)
add_text(445, arch_y + 46, "TIER 2: GOVERNMENT PORTAL INGESTION", font_size=11, font_family=2, color="#38bdf8")
add_text(445, arch_y + 64, "REST webhooks ingest live Punjab HISDU & PITB\nBed & Ventilator Occupancy data into cloud core.", font_size=10, font_family=2, color="#94a3b8", text_align="left")

# Tier 3
add_rect(800, arch_y + 40, col_w, 55, bg_color="#1e293b", stroke_color="#475569", stroke_width=1)
add_text(815, arch_y + 46, "TIER 3: AUTOMATED STATE DECAY", font_size=11, font_family=2, color="#38bdf8")
add_text(815, arch_y + 64, "If network drops, capacity confidence decays to 0\nover 60 mins. No routing on stale assumptions.", font_size=10, font_family=2, color="#94a3b8", text_align="left")

# Save to Excalidraw JSON file
excalidraw_data = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": elements,
    "appState": {
        "gridSize": None,
        "viewBackgroundColor": "#ffffff"
    },
    "files": {}
}

output_path = "/mnt/New_Volume/SehatRoute AI/docs/SehatRoute_AI_Flow.excalidraw"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(excalidraw_data, f, indent=2)

print(f"✅ Excalidraw diagram generated successfully: {output_path}")
print(f"Total elements: {len(elements)}")

# Also generate a crisp SVG export for direct browser / IDE viewing
svg_lines = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 780" width="1200" height="780" style="background:#ffffff; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;">',
    '<defs>',
    '  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">',
    '    <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569"/>',
    '  </marker>',
    '  <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">',
    '    <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981"/>',
    '  </marker>',
    '</defs>'
]

for el in elements:
    if el["type"] == "rectangle":
        rx = 8 if el.get("roundness") else 0
        fill = el["backgroundColor"]
        stroke = el["strokeColor"]
        sw = el["strokeWidth"]
        svg_lines.append(f'  <rect x="{el["x"]}" y="{el["y"]}" width="{el["width"]}" height="{el["height"]}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    elif el["type"] == "text":
        lines = el["text"].split("\n")
        fs = el["fontSize"]
        color = el["strokeColor"]
        weight = "bold" if "STEP" in el["text"] or "SEHATROUTE" in el["text"] or "TRADITIONAL" in el["text"] or "TIER" in el["text"] else "normal"
        line_spacing = fs * 1.35
        for idx, line in enumerate(lines):
            ly = el["y"] + fs + idx * line_spacing
            safe_text = line.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            svg_lines.append(f'  <text x="{el["x"]}" y="{ly}" font-size="{fs}" fill="{color}" font-weight="{weight}">{safe_text}</text>')
    elif el["type"] == "arrow":
        sx, sy = el["x"], el["y"]
        dx, dy = el["points"][1]
        ex, ey = sx + dx, sy + dy
        color = el["strokeColor"]
        marker = "arrow-green" if color == "#10b981" else "arrow"
        svg_lines.append(f'  <line x1="{sx}" y1="{sy}" x2="{ex}" y2="{ey}" stroke="{color}" stroke-width="{el["strokeWidth"]}" marker-end="url(#{marker})"/>')

svg_lines.append('</svg>')

svg_output_path = "/mnt/New_Volume/SehatRoute AI/docs/SehatRoute_AI_Flow.svg"
with open(svg_output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(svg_lines))

print(f"✅ SVG export generated successfully: {svg_output_path}")
