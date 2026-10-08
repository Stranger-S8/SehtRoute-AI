#!/usr/bin/env python3
"""
SehatRoute AI — 7-Slide Championship Pitch Deck Generator
Structure: Prototype + Policy Path (Government Partnership Model)
Output: Professional PPTX with dark tactical theme
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

# ─── Color Palette (Dark Tactical / Executive) ───
BG_DARK       = RGBColor(0x0F, 0x17, 0x2A)  # Navy-black
BG_SURFACE    = RGBColor(0x1E, 0x29, 0x3B)  # Slate card
ACCENT_TEAL   = RGBColor(0x0F, 0x76, 0x6E)  # Primary brand teal
ACCENT_CYAN   = RGBColor(0x06, 0xB6, 0xD4)  # Highlight cyan
ACCENT_GREEN  = RGBColor(0x10, 0xB9, 0x81)  # Success green
ACCENT_RED    = RGBColor(0xEF, 0x44, 0x44)  # Danger red
ACCENT_AMBER  = RGBColor(0xF5, 0x9E, 0x0B)  # Warning amber
TEXT_WHITE    = RGBColor(0xF8, 0xFA, 0xFC)  # Primary text
TEXT_LIGHT    = RGBColor(0xCB, 0xD5, 0xE1)  # Body text
TEXT_MUTED    = RGBColor(0x94, 0xA3, 0xB8)  # Captions
TEXT_DARK     = RGBColor(0x0F, 0x17, 0x2A)  # Text on light bg
WHITE         = RGBColor(0xFF, 0xFF, 0xFF)

SLIDE_WIDTH  = Inches(13.333)
SLIDE_HEIGHT = Inches(7.5)

OUTPUT_PATH = "/mnt/New_Volume/SehatRoute AI/docs/SehatRoute_AI_Pitch_Deck.pptx"

def set_slide_bg(slide, color):
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_shape(slide, left, top, width, height, fill_color, border_color=None, border_width=Pt(0)):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = border_width
    else:
        shape.line.fill.background()
    shape.shadow.inherit = False
    # Smaller corner radius
    shape.adjustments[0] = 0.04
    return shape

def add_rect(slide, left, top, width, height, fill_color, border_color=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1)
    else:
        shape.line.fill.background()
    shape.shadow.inherit = False
    return shape

def add_text_box(slide, left, top, width, height):
    return slide.shapes.add_textbox(left, top, width, height)

def set_text(tf, text, size=14, bold=False, color=TEXT_WHITE, alignment=PP_ALIGN.LEFT, font_name="Calibri"):
    tf.clear()
    p = tf.paragraphs[0]
    p.alignment = alignment
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font_name
    return p

def add_paragraph(tf, text, size=14, bold=False, color=TEXT_WHITE, alignment=PP_ALIGN.LEFT, font_name="Calibri", space_before=Pt(0), space_after=Pt(4)):
    p = tf.add_paragraph()
    p.alignment = alignment
    p.space_before = space_before
    p.space_after = space_after
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font_name
    return p

def add_slide_number(slide, num, total=7):
    tb = add_text_box(slide, Inches(12.0), Inches(7.05), Inches(1.2), Inches(0.35))
    set_text(tb.text_frame, f"{num} / {total}", size=9, color=TEXT_MUTED, alignment=PP_ALIGN.RIGHT)

def add_top_tag(slide, tag_text):
    # Colored accent bar at very top
    add_rect(slide, Inches(0), Inches(0), SLIDE_WIDTH, Inches(0.06), ACCENT_TEAL)
    # Tag pill
    shape = add_shape(slide, Inches(0.6), Inches(0.35), Inches(3.2), Inches(0.35), ACCENT_TEAL)
    shape.text_frame.word_wrap = True
    set_text(shape.text_frame, tag_text, size=9, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER, font_name="Calibri")

def add_bottom_brand(slide):
    tb = add_text_box(slide, Inches(0.6), Inches(7.05), Inches(5), Inches(0.35))
    set_text(tb.text_frame, "SehatRoute AI  •  Alkhidmat Foundation 1023 & Rescue 1122  •  Powered by Alibaba Cloud & Google", size=8, color=TEXT_MUTED, alignment=PP_ALIGN.LEFT)

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SLIDE BUILDERS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def build_slide_1_problem(prs):
    """SLIDE 1: THE PROBLEM (Data-Heavy)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank
    set_slide_bg(slide, BG_DARK)
    add_top_tag(slide, "THE CRISIS  //  VERIFIED PAKISTANI DATA")
    add_bottom_brand(slide)
    add_slide_number(slide, 1)

    # Title
    tb = add_text_box(slide, Inches(0.6), Inches(0.95), Inches(12), Inches(0.7))
    set_text(tb.text_frame, "The Closest Hospital Is Killing Pakistani Patients", size=32, bold=True, color=TEXT_WHITE)

    # Subtitle
    tb = add_text_box(slide, Inches(0.6), Inches(1.55), Inches(12), Inches(0.45))
    set_text(tb.text_frame, "When 310+ ambulances blindly route to the nearest ER, they trap patients in lethal secondary transfers.", size=15, color=TEXT_LIGHT)

    # ─── 3 Stat Cards ───
    card_data = [
        {
            "number": "96.7%",
            "label": "Extreme ED Overcrowding",
            "detail": "PEMH Rawalpindi: 29 of 30\nobservation intervals at NEDOCS\nLevel-6 (mean 578) — maximum saturation.",
            "source": "Zafar et al., PAFMJ 2023",
            "accent": ACCENT_RED,
        },
        {
            "number": "0.71",
            "label": "ICU Beds per 100k Citizens",
            "detail": "Pakistan maintains 0.71 ICU beds/100k.\nOnly 52.2% of ICUs maintain a 1:1\nventilator-to-bed ratio.",
            "source": "Hashmi et al., Critical Care (PMC7441021)",
            "accent": ACCENT_AMBER,
        },
        {
            "number": "4.7 hrs",
            "label": "Mean Trauma Arrival Delay",
            "detail": "Mean injury-to-ER arrival: 4.7 hours.\nOnly 30.9% of acute patients reach care\nwithin the critical Golden Hour.",
            "source": "Khan et al., AKUH (Int J Surg 2010)",
            "accent": ACCENT_TEAL,
        },
    ]

    card_w = Inches(3.8)
    card_h = Inches(3.7)
    start_x = Inches(0.6)
    card_y = Inches(2.35)
    gap = Inches(0.35)

    for i, card in enumerate(card_data):
        x = start_x + i * (card_w + gap)
        # Card background
        c = add_shape(slide, x, card_y, card_w, card_h, BG_SURFACE, border_color=RGBColor(0x33, 0x40, 0x55), border_width=Pt(1))

        # Accent bar at top of card
        add_rect(slide, x, card_y, card_w, Inches(0.06), card["accent"])

        # Big number
        tb = add_text_box(slide, x + Inches(0.3), card_y + Inches(0.35), card_w - Inches(0.5), Inches(0.8))
        set_text(tb.text_frame, card["number"], size=38, bold=True, color=card["accent"])

        # Label
        tb = add_text_box(slide, x + Inches(0.3), card_y + Inches(1.1), card_w - Inches(0.5), Inches(0.45))
        set_text(tb.text_frame, card["label"], size=13, bold=True, color=TEXT_WHITE)

        # Detail text
        tb = add_text_box(slide, x + Inches(0.3), card_y + Inches(1.6), card_w - Inches(0.5), Inches(1.2))
        tb.text_frame.word_wrap = True
        set_text(tb.text_frame, card["detail"], size=11, color=TEXT_LIGHT)

        # Source citation
        tb = add_text_box(slide, x + Inches(0.3), card_y + Inches(3.05), card_w - Inches(0.5), Inches(0.35))
        set_text(tb.text_frame, f"Source: {card['source']}", size=9, color=TEXT_MUTED, font_name="Calibri")

    # Right-side context callout
    tb = add_text_box(slide, Inches(0.6), Inches(6.3), Inches(12), Inches(0.6))
    tb.text_frame.word_wrap = True
    set_text(tb.text_frame, "Scale: 257.26M Projected Population (PBS/NIPS 2026)  •  Rescue 1122: 11.47M Medical Emergencies across all 37 Punjab Districts  •  Alkhidmat: 310 Ambulances", size=11, color=TEXT_MUTED)


def build_slide_2_existing_failures(prs):
    """SLIDE 2: WHY EXISTING SOLUTIONS FAIL"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_DARK)
    add_top_tag(slide, "LANDSCAPE ANALYSIS  //  WHY CURRENT SYSTEMS FAIL")
    add_bottom_brand(slide)
    add_slide_number(slide, 2)

    tb = add_text_box(slide, Inches(0.6), Inches(0.95), Inches(12), Inches(0.7))
    set_text(tb.text_frame, "Three Approaches Have Been Tried — All Leave a Fatal Gap", size=28, bold=True, color=TEXT_WHITE)

    # ─── 3 Failure Cards ───
    failures = [
        {
            "name": "Google Maps / Standard GPS",
            "status": "❌  Solves Wrong Problem",
            "why": "Optimizes purely for road transit time\n(T_transit). Treats every hospital as an\ninfinite-capacity destination. No clinical\nstate awareness. No bed or equipment\nvisibility whatsoever.",
            "gap": "Zero clinical capacity intelligence",
        },
        {
            "name": "Rescue 1122 EMDS (HoboeTech)",
            "status": "⚠️  Fleet Tracking Only",
            "why": "Tracks ambulance GPS positions and\nmanages dispatch queue across 37 districts.\nExcels at vehicle deployment, but does NOT\nevaluate hospital clinical capacity or bed\nreadiness before routing.",
            "gap": "No hospital-side decision layer",
        },
        {
            "name": "Administrative Dashboards (HISDU)",
            "status": "⚠️  Trapped in Silos",
            "why": "Punjab Health tracks hospital beds and\nventilators digitally on portal dashboards.\nHowever, this data sits in an administrative\nsilo, totally disconnected from real-time\nambulance navigation in the field.",
            "gap": "Zero live dispatch integration",
        },
    ]

    card_w = Inches(3.8)
    card_h = Inches(4.0)
    start_x = Inches(0.6)
    card_y = Inches(2.0)
    gap = Inches(0.35)

    for i, f in enumerate(failures):
        x = start_x + i * (card_w + gap)
        c = add_shape(slide, x, card_y, card_w, card_h, BG_SURFACE, border_color=RGBColor(0x33, 0x40, 0x55), border_width=Pt(1))

        # Name
        tb = add_text_box(slide, x + Inches(0.25), card_y + Inches(0.25), card_w - Inches(0.4), Inches(0.45))
        set_text(tb.text_frame, f["name"], size=14, bold=True, color=ACCENT_CYAN)

        # Status tag
        tb = add_text_box(slide, x + Inches(0.25), card_y + Inches(0.65), card_w - Inches(0.4), Inches(0.35))
        set_text(tb.text_frame, f["status"], size=11, bold=True, color=ACCENT_RED)

        # Why it fails
        tb = add_text_box(slide, x + Inches(0.25), card_y + Inches(1.1), card_w - Inches(0.4), Inches(1.8))
        tb.text_frame.word_wrap = True
        set_text(tb.text_frame, f["why"], size=11, color=TEXT_LIGHT)

        # Gap line
        add_rect(slide, x + Inches(0.25), card_y + Inches(3.1), card_w - Inches(0.5), Inches(0.02), ACCENT_RED)
        tb = add_text_box(slide, x + Inches(0.25), card_y + Inches(3.2), card_w - Inches(0.4), Inches(0.4))
        set_text(tb.text_frame, f"Gap: {f['gap']}", size=10, bold=True, color=ACCENT_AMBER)

    # Bottom insight
    tb = add_text_box(slide, Inches(0.6), Inches(6.3), Inches(12), Inches(0.7))
    tb.text_frame.word_wrap = True
    set_text(tb.text_frame, "The Defensible Gap: Pakistan already tracks hospital capacity (HISDU) and manages fleet dispatch (Rescue 1122), but they exist as disconnected silos. SehatRoute AI is the missing algorithmic bridge that injects real-time clinical capacity directly into the ambulance's routing decision.", size=11, bold=True, color=ACCENT_GREEN)


def build_slide_3_solution(prs):
    """SLIDE 3: OUR SOLUTION (Working Prototype)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_DARK)
    add_top_tag(slide, "WORKING PROTOTYPE  //  LIVE DEMONSTRATION")
    add_bottom_brand(slide)
    add_slide_number(slide, 3)

    tb = add_text_box(slide, Inches(0.6), Inches(0.95), Inches(12), Inches(0.7))
    set_text(tb.text_frame, "SehatRoute AI: Capacity-Aware Emergency Routing Engine", size=28, bold=True, color=TEXT_WHITE)

    tb = add_text_box(slide, Inches(0.6), Inches(1.55), Inches(10), Inches(0.5))
    tb.text_frame.word_wrap = True
    set_text(tb.text_frame, "Routes ambulances to the hospital where definitive care begins fastest — not just the closest one.", size=14, color=TEXT_LIGHT)

    # TTDC Formula box
    formula_box = add_shape(slide, Inches(0.6), Inches(2.25), Inches(12.1), Inches(1.1), BG_SURFACE, border_color=ACCENT_TEAL, border_width=Pt(2))
    tb = add_text_box(slide, Inches(0.9), Inches(2.35), Inches(11.5), Inches(0.9))
    tf = tb.text_frame
    tf.word_wrap = True
    set_text(tf, "CORE ALGORITHMIC FORMULATION", size=10, bold=True, color=ACCENT_TEAL)
    add_paragraph(tf, "TTDC(h) = T_transit(h, t) + T_offload(h, t) + P_capacity(h, C_req, t)", size=18, bold=True, color=WHITE, font_name="Consolas", space_before=Pt(6))
    add_paragraph(tf, "If mandatory equipment is missing (e.g., Cath Lab offline) → P_capacity = ∞ → Instant automated bypass", size=11, color=TEXT_LIGHT, space_before=Pt(4))

    # ─── 4 Feature Pillars ───
    features = [
        ("🗣️  Multilingual AI Triage", "Accepts plain Urdu, Roman Urdu,\nand English via Google Gemini.\nExtracts ESI severity + mandatory\nclinical requirements in <150ms."),
        ("🏥  80+ Punjab Hospital Registry", "Verified bed counts, NEDOCS\nscores, specialized departments,\nand equipment profiles across\nall 10 administrative divisions."),
        ("🗺️  Tactical GIS Decision Map", "Color-coded bypass routes (red)\nvs. recommended routes (green)\nwith full clinical justifications\nfor each facility."),
        ("🔒  Atomic Capacity Lock", "Redis-based 45-minute TTL lease\nprevents race conditions when\nmultiple ambulances converge on\nthe same remaining bed/Cath Lab."),
    ]

    fw = Inches(2.85)
    fh = Inches(3.0)
    fy = Inches(3.65)
    fgap = Inches(0.25)
    fx_start = Inches(0.6)

    for i, (title, desc) in enumerate(features):
        x = fx_start + i * (fw + fgap)
        c = add_shape(slide, x, fy, fw, fh, BG_SURFACE, border_color=RGBColor(0x33, 0x40, 0x55), border_width=Pt(1))

        tb = add_text_box(slide, x + Inches(0.2), fy + Inches(0.2), fw - Inches(0.35), Inches(0.5))
        set_text(tb.text_frame, title, size=12, bold=True, color=ACCENT_CYAN)

        tb = add_text_box(slide, x + Inches(0.2), fy + Inches(0.7), fw - Inches(0.35), Inches(2.0))
        tb.text_frame.word_wrap = True
        set_text(tb.text_frame, desc, size=11, color=TEXT_LIGHT)


def build_slide_4_architecture(prs):
    """SLIDE 4: AI & CLOUD ARCHITECTURE"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_DARK)
    add_top_tag(slide, "CLOUD ARCHITECTURE  //  ALIBABA CLOUD & GOOGLE")
    add_bottom_brand(slide)
    add_slide_number(slide, 4)

    tb = add_text_box(slide, Inches(0.6), Inches(0.95), Inches(12), Inches(0.7))
    set_text(tb.text_frame, "Enterprise Cloud Architecture: Sub-25ms Decision Latency", size=28, bold=True, color=TEXT_WHITE)

    # Architecture flow as layered boxes
    layers = [
        {
            "label": "EDGE INGESTION",
            "color": ACCENT_CYAN,
            "items": [
                "Alibaba Cloud API Gateway",
                "Paramedic PWA / 1023 Dispatch",
                "Citizen Portal (Web / SMS)",
            ]
        },
        {
            "label": "AI CLINICAL PARSING",
            "color": ACCENT_GREEN,
            "items": [
                "Google Gemini / Qwen-2.5-72B",
                "Urdu + Roman Urdu + English NLP",
                "ESI Triage + Equipment Tags (<150ms)",
                "Deterministic Fallback Engine",
            ]
        },
        {
            "label": "TTDC DECISION ENGINE",
            "color": ACCENT_TEAL,
            "items": [
                "Function Compute 3.0 (Serverless)",
                "Bitmask Capability Gate Pruning",
                "NEDOCS Queue Delay Regression",
                "TTDC Ranking in < 25ms",
            ]
        },
        {
            "label": "STATE & SPATIAL LAYER",
            "color": ACCENT_AMBER,
            "items": [
                "ApsaraDB for Redis (Atomic Leases)",
                "ApsaraDB RDS + PostGIS Geofencing",
                "Google Routes API (Traffic Feed)",
                "TPL Maps (Pakistan Micro-Geometry)",
            ]
        },
        {
            "label": "HOSPITAL INTEGRATION",
            "color": ACCENT_RED,
            "items": [
                "Pre-Arrival WebSocket + SMS Alert",
                "ER Charge Nurse 1-Tap Widget",
                "60-Min State Decay Heuristic",
                "Self-Hosted OSRM Offline Fallback",
            ]
        },
    ]

    lw = Inches(2.3)
    lh = Inches(3.3)
    ly = Inches(1.95)
    lgap = Inches(0.18)
    lx_start = Inches(0.5)

    for i, layer in enumerate(layers):
        x = lx_start + i * (lw + lgap)
        c = add_shape(slide, x, ly, lw, lh, BG_SURFACE, border_color=RGBColor(0x33, 0x40, 0x55), border_width=Pt(1))

        # Accent top bar
        add_rect(slide, x, ly, lw, Inches(0.05), layer["color"])

        # Label
        tb = add_text_box(slide, x + Inches(0.12), ly + Inches(0.15), lw - Inches(0.2), Inches(0.4))
        set_text(tb.text_frame, layer["label"], size=9, bold=True, color=layer["color"], font_name="Calibri")

        # Items
        tb = add_text_box(slide, x + Inches(0.12), ly + Inches(0.55), lw - Inches(0.2), Inches(2.5))
        tf = tb.text_frame
        tf.word_wrap = True
        for j, item in enumerate(layer["items"]):
            if j == 0:
                set_text(tf, f"• {item}", size=10, color=TEXT_LIGHT)
            else:
                add_paragraph(tf, f"• {item}", size=10, color=TEXT_LIGHT, space_before=Pt(4))

    # Arrow connectors (simplified as text)
    for i in range(4):
        x = lx_start + (i + 1) * (lw + lgap) - Inches(0.12)
        tb = add_text_box(slide, x, ly + Inches(1.3), Inches(0.2), Inches(0.3))
        set_text(tb.text_frame, "→", size=16, bold=True, color=ACCENT_TEAL)

    # Bottom metrics bar
    metrics_box = add_shape(slide, Inches(0.5), Inches(5.55), Inches(12.3), Inches(0.9), BG_SURFACE, border_color=ACCENT_TEAL, border_width=Pt(1))
    metrics = [
        ("Clinical Parse", "< 150ms"),
        ("TTDC Decision", "< 25ms"),
        ("Capacity Lock", "< 2ms"),
        ("End-to-End", "< 200ms"),
        ("Cost per Run", "~$0.008 (~2.2 PKR)"),
    ]
    mw = Inches(2.3)
    for i, (label, value) in enumerate(metrics):
        mx = Inches(0.7) + i * mw
        tb = add_text_box(slide, mx, Inches(5.65), mw, Inches(0.35))
        set_text(tb.text_frame, value, size=16, bold=True, color=ACCENT_GREEN)
        tb = add_text_box(slide, mx, Inches(5.98), mw, Inches(0.3))
        set_text(tb.text_frame, label, size=9, color=TEXT_MUTED)

    # Traffic data justification
    tb = add_text_box(slide, Inches(0.6), Inches(6.6), Inches(12), Inches(0.5))
    tb.text_frame.word_wrap = True
    set_text(tb.text_frame, "Why Google Routes for Pakistan: 90.71% of smartphones run Android (Statcounter) → densest passive traffic probe network. TPL Maps adds Pakistan-specific micro-geometry (250K+ fleet trackers).", size=10, color=TEXT_MUTED)


def build_slide_5_government_path(prs):
    """SLIDE 5: THE GOVERNMENT PATH (Key Slide)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_DARK)
    add_top_tag(slide, "PUBLIC-PRIVATE PARTNERSHIP  //  IMPLEMENTATION ROADMAP")
    add_bottom_brand(slide)
    add_slide_number(slide, 5)

    tb = add_text_box(slide, Inches(0.6), Inches(0.95), Inches(12), Inches(0.7))
    set_text(tb.text_frame, "3-Step Government Partnership Roadmap", size=28, bold=True, color=TEXT_WHITE)

    tb = add_text_box(slide, Inches(0.6), Inches(1.55), Inches(11), Inches(0.5))
    tb.text_frame.word_wrap = True
    set_text(tb.text_frame, "Our platform handles the AI/infrastructure layer. Government provides data access and regulatory framework.", size=14, color=TEXT_LIGHT)

    # ─── 3 Phase Cards ───
    phases = [
        {
            "phase": "STEP 1",
            "title": "Twin Cities Pilot",
            "timeline": "Q3–Q4 2026 (90 Days)",
            "color": ACCENT_GREEN,
            "details": [
                "Partner: Alkhidmat Islamabad + PIMS",
                "Scope: 30 ambulances, 5 hospitals",
                "Data: PITB bed telemetry webhook",
                "Agency: Ministry of NHSR&C",
                "Cost: ~$12K cloud + $8K integration",
                "KPI: Measure secondary transfer Δ",
            ],
        },
        {
            "phase": "STEP 2",
            "title": "Punjab Provincial Scale",
            "timeline": "Q1–Q2 2027 (6 Months)",
            "color": ACCENT_CYAN,
            "details": [
                "Partner: Rescue 1122 + PSCA IC3",
                "Scope: 120 ambulances, Lahore+Rwp",
                "Data: PSCA camera traffic corridors",
                "Agency: Punjab Health Department",
                "Cost: ~$45K cloud + $30K ops",
                "KPI: Offload delay reduction %",
            ],
        },
        {
            "phase": "STEP 3",
            "title": "National Federation",
            "timeline": "Q3–Q4 2027 (12 Months)",
            "color": ACCENT_AMBER,
            "details": [
                "Partner: NDMA + all provincial EMS",
                "Scope: 310+ ambulances nationwide",
                "Data: National health dashboard API",
                "Agency: PM's Digital Pakistan Office",
                "Cost: ~$180K/yr operational",
                "KPI: Lives saved / DALY reduction",
            ],
        },
    ]

    pw = Inches(3.8)
    ph = Inches(3.65)
    py = Inches(2.25)
    pgap = Inches(0.35)

    for i, phase in enumerate(phases):
        x = Inches(0.6) + i * (pw + pgap)
        c = add_shape(slide, x, py, pw, ph, BG_SURFACE, border_color=RGBColor(0x33, 0x40, 0x55), border_width=Pt(1))
        add_rect(slide, x, py, pw, Inches(0.06), phase["color"])

        # Phase label
        tb = add_text_box(slide, x + Inches(0.25), py + Inches(0.2), Inches(1.0), Inches(0.3))
        set_text(tb.text_frame, phase["phase"], size=10, bold=True, color=phase["color"])

        # Title
        tb = add_text_box(slide, x + Inches(0.25), py + Inches(0.48), pw - Inches(0.4), Inches(0.35))
        set_text(tb.text_frame, phase["title"], size=16, bold=True, color=TEXT_WHITE)

        # Timeline
        tb = add_text_box(slide, x + Inches(0.25), py + Inches(0.82), pw - Inches(0.4), Inches(0.3))
        set_text(tb.text_frame, phase["timeline"], size=10, color=TEXT_MUTED)

        # Bullet details
        tb = add_text_box(slide, x + Inches(0.25), py + Inches(1.2), pw - Inches(0.4), Inches(2.2))
        tf = tb.text_frame
        tf.word_wrap = True
        for j, detail in enumerate(phase["details"]):
            if j == 0:
                set_text(tf, f"▸ {detail}", size=10, color=TEXT_LIGHT)
            else:
                add_paragraph(tf, f"▸ {detail}", size=10, color=TEXT_LIGHT, space_before=Pt(3))

    # Arrow connectors between phases
    for i in range(2):
        x = Inches(0.6) + (i + 1) * (pw + pgap) - Inches(0.22)
        tb = add_text_box(slide, x, py + Inches(1.5), Inches(0.3), Inches(0.3))
        set_text(tb.text_frame, "→", size=20, bold=True, color=ACCENT_TEAL)

    # Policy hooks bar
    policy_box = add_shape(slide, Inches(0.6), Inches(6.15), Inches(12.1), Inches(0.7), BG_SURFACE, border_color=ACCENT_TEAL, border_width=Pt(1))
    tb = add_text_box(slide, Inches(0.85), Inches(6.2), Inches(11.6), Inches(0.6))
    tf = tb.text_frame
    tf.word_wrap = True
    set_text(tf, "POLICY ALIGNMENT", size=9, bold=True, color=ACCENT_TEAL)
    add_paragraph(tf, "National AI Policy 2024  •  Digital Pakistan Vision  •  Universal Health Coverage (UHC) Framework  •  CPEC Digital Corridor  •  WHO Emergency Care Systems Assessment", size=10, color=TEXT_LIGHT, space_before=Pt(2))


def build_slide_6_impact(prs):
    """SLIDE 6: IMPACT & SCALABILITY"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_DARK)
    add_top_tag(slide, "PROJECTED IMPACT  //  QUANTIFIED OUTCOMES")
    add_bottom_brand(slide)
    add_slide_number(slide, 6)

    tb = add_text_box(slide, Inches(0.6), Inches(0.95), Inches(12), Inches(0.7))
    set_text(tb.text_frame, "Impact at Scale: Lives Saved, Time Recovered, Cost Avoided", size=28, bold=True, color=TEXT_WHITE)

    # ─── Impact Projection Table ───
    # Create a table
    rows, cols = 5, 5
    table_shape = slide.shapes.add_table(rows, cols, Inches(0.6), Inches(2.0), Inches(12.1), Inches(2.8))
    table = table_shape.table

    # Headers
    headers = ["Deployment Scope", "Ambulances", "Population Served", "Est. Secondary Transfers\nAvoided / Year", "Est. Annual Cost\nSavings (PKR)"]
    for j, h in enumerate(headers):
        cell = table.cell(0, j)
        cell.text = h
        for p in cell.text_frame.paragraphs:
            p.font.size = Pt(10)
            p.font.bold = True
            p.font.color.rgb = WHITE
            p.font.name = "Calibri"
            p.alignment = PP_ALIGN.CENTER
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(0x0F, 0x76, 0x6E)

    # Data rows
    data = [
        ["Twin Cities Pilot\n(Islamabad/Rawalpindi)", "30", "4.5 Million", "~800", "~120 Million"],
        ["Punjab Provincial\n(Lahore + Rawalpindi)", "120", "35 Million", "~4,200", "~650 Million"],
        ["National Rollout\n(All Major Cities)", "310+", "110 Million", "~12,000", "~1.8 Billion"],
        ["5-Year Projection\n(Full Integration)", "500+", "230 Million", "~25,000+", "~4.5 Billion"],
    ]

    for i, row_data in enumerate(data):
        bg_color = BG_SURFACE if i % 2 == 0 else BG_DARK
        for j, val in enumerate(row_data):
            cell = table.cell(i + 1, j)
            cell.text = val
            for p in cell.text_frame.paragraphs:
                p.font.size = Pt(10)
                p.font.color.rgb = TEXT_LIGHT if j > 0 else TEXT_WHITE
                p.font.bold = (j == 0)
                p.font.name = "Calibri"
                p.alignment = PP_ALIGN.CENTER if j > 0 else PP_ALIGN.LEFT
            cell.fill.solid()
            cell.fill.fore_color.rgb = bg_color

    # Set column widths
    widths = [Inches(2.8), Inches(1.4), Inches(2.2), Inches(2.8), Inches(2.9)]
    for j, w in enumerate(widths):
        table.columns[j].width = w

    # Bottom insight cards
    insights = [
        ("72%", "Estimated Reduction\nin Secondary Transfers", ACCENT_GREEN),
        ("35 min", "Average Time Saved\nper Critical Patient", ACCENT_CYAN),
        ("$0.008", "Cost per Dispatch Run\n(~2.2 Pakistani Rupees)", ACCENT_AMBER),
        ("12ms", "Failover Reroute Latency\non Contention Rejection", ACCENT_TEAL),
    ]

    iw = Inches(2.85)
    ih = Inches(1.4)
    iy = Inches(5.2)
    igap = Inches(0.25)

    for i, (val, label, color) in enumerate(insights):
        x = Inches(0.6) + i * (iw + igap)
        c = add_shape(slide, x, iy, iw, ih, BG_SURFACE, border_color=RGBColor(0x33, 0x40, 0x55), border_width=Pt(1))
        add_rect(slide, x, iy, iw, Inches(0.05), color)

        tb = add_text_box(slide, x + Inches(0.2), iy + Inches(0.15), iw - Inches(0.35), Inches(0.5))
        set_text(tb.text_frame, val, size=24, bold=True, color=color)

        tb = add_text_box(slide, x + Inches(0.2), iy + Inches(0.65), iw - Inches(0.35), Inches(0.6))
        tb.text_frame.word_wrap = True
        set_text(tb.text_frame, label, size=10, color=TEXT_LIGHT)


def build_slide_7_team_ask(prs):
    """SLIDE 7: TEAM + ASK"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_DARK)
    add_top_tag(slide, "THE ASK  //  PARTNERSHIP INVITATION")
    add_bottom_brand(slide)
    add_slide_number(slide, 7)

    tb = add_text_box(slide, Inches(0.6), Inches(0.95), Inches(12), Inches(0.7))
    set_text(tb.text_frame, "Time Is Not Distance — Time Is Tissue, and Time Is Life", size=28, bold=True, color=TEXT_WHITE)

    # Core thesis
    thesis_box = add_shape(slide, Inches(0.6), Inches(1.85), Inches(12.1), Inches(1.0), BG_SURFACE, border_color=ACCENT_TEAL, border_width=Pt(2))
    tb = add_text_box(slide, Inches(0.9), Inches(1.95), Inches(11.5), Inches(0.8))
    tf = tb.text_frame
    tf.word_wrap = True
    set_text(tf, "SehatRoute AI transforms ambulance dispatch from a blind distance gamble into algorithmic definitive care —", size=15, color=TEXT_LIGHT)
    add_paragraph(tf, "bridging the gap between Pakistan's overloaded hospitals and 310+ field ambulances with sub-25ms clinical intelligence.", size=15, bold=True, color=TEXT_WHITE, space_before=Pt(4))

    # ─── The Ask ───
    ask_items = [
        ("🤝  Partnership with Alkhidmat Foundation", "Pilot SehatRoute AI across 30 ambulances in the Islamabad–Rawalpindi healthcare corridor, validating clinical outcomes with PIMS and Rawalpindi Institute of Cardiology."),
        ("📡  Data Access from PITB / Rescue 1122", "Integrate live hospital bed telemetry webhooks from the Punjab Health Department's provincial dashboard into the TTDC decision engine."),
        ("🏛️  Government Advocacy via Ministry of NHSR&C", "Position SehatRoute AI within the National AI Policy framework and Universal Health Coverage (UHC) initiative as a public-private dispatch optimization layer."),
    ]

    ay = Inches(3.15)
    aw = Inches(12.1)
    ah = Inches(0.9)
    agap = Inches(0.15)

    for i, (title, desc) in enumerate(ask_items):
        y = ay + i * (ah + agap)
        c = add_shape(slide, Inches(0.6), y, aw, ah, BG_SURFACE, border_color=RGBColor(0x33, 0x40, 0x55), border_width=Pt(1))

        tb = add_text_box(slide, Inches(0.9), y + Inches(0.1), Inches(11.5), Inches(0.35))
        set_text(tb.text_frame, title, size=13, bold=True, color=ACCENT_CYAN)

        tb = add_text_box(slide, Inches(0.9), y + Inches(0.42), Inches(11.5), Inches(0.45))
        tb.text_frame.word_wrap = True
        set_text(tb.text_frame, desc, size=11, color=TEXT_LIGHT)

    # Bottom closing + references
    tb = add_text_box(slide, Inches(0.6), Inches(6.35), Inches(12), Inches(0.5))
    tb.text_frame.word_wrap = True
    set_text(tb.text_frame, "Verified References:  PAFMJ 2023 (96.7% NEDOCS-6)  •  Critical Care PMC7441021 (0.71 ICU/100K)  •  AKUH Trauma Registry (4.7hr delay, p=0.004)  •  Statcounter (90.71% Android)  •  PSCA  •  PITB  •  Rescue 1122  •  Alkhidmat Foundation", size=9, color=TEXT_MUTED)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# MAIN
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def main():
    prs = Presentation()
    prs.slide_width = Emu(int(SLIDE_WIDTH))
    prs.slide_height = Emu(int(SLIDE_HEIGHT))

    print("Building Slide 1: The Problem...")
    build_slide_1_problem(prs)
    print("Building Slide 2: Why Existing Solutions Fail...")
    build_slide_2_existing_failures(prs)
    print("Building Slide 3: Our Solution (Working Prototype)...")
    build_slide_3_solution(prs)
    print("Building Slide 4: AI & Cloud Architecture...")
    build_slide_4_architecture(prs)
    print("Building Slide 5: Government Partnership Path...")
    build_slide_5_government_path(prs)
    print("Building Slide 6: Impact & Scalability...")
    build_slide_6_impact(prs)
    print("Building Slide 7: Team + Ask...")
    build_slide_7_team_ask(prs)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    prs.save(OUTPUT_PATH)
    file_size = os.path.getsize(OUTPUT_PATH) / 1024
    print(f"\n✅ SUCCESS: Pitch deck saved to:\n   {OUTPUT_PATH}")
    print(f"   Size: {file_size:.1f} KB | Slides: 7 | Format: 16:9 Widescreen")

if __name__ == "__main__":
    main()
