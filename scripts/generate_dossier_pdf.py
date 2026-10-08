#!/usr/bin/env python3
import os
import re
import subprocess
import markdown

SOURCE_MD = "/mnt/New_Volume/SehatRoute AI/docs/SEHATROUTE_AI_TECHNICAL_DOSSIER.md"
OUTPUT_HTML = "/mnt/New_Volume/SehatRoute AI/docs/SehatRoute_AI_Technical_Dossier.html"
OUTPUT_PDF = "/mnt/New_Volume/SehatRoute AI/docs/SehatRoute_AI_Technical_Dossier.pdf"

def main():
    if not os.path.exists(SOURCE_MD):
        print(f"Error: {SOURCE_MD} not found")
        return

    with open(SOURCE_MD, "r", encoding="utf-8") as f:
        md_content = f.read()

    # Remove duplicate meta lines that are already displayed in the executive header grid
    md_content = re.sub(
        r'\*\*System:\*\*.*?\n\*\*Target Fleet:\*\*.*?\n\*\*Geographic Focus:\*\*.*?\n',
        '',
        md_content,
        flags=re.DOTALL
    )

    # Pre-process math equations for clean HTML rendering
    # Replace $$\min \sum_{(u,v) \in P} w(u,v)$$ with clean styled math HTML
    md_content = re.sub(
        r'\$\$\\min \\sum_{\(u,v\) \\in P} w\(u,v\)\$\$',
        '<div class="math-equation"><strong>Objective:</strong> min ∑ w(u, v) &nbsp;for all road edges (u, v) ∈ Path</div>',
        md_content
    )

    # Convert Markdown to HTML
    html_body = markdown.markdown(
        md_content,
        extensions=["tables", "fenced_code", "nl2br", "sane_lists"]
    )

    # Wrap tables for responsive/clean styling
    html_body = html_body.replace("<table>", '<div class="table-container"><table>')
    html_body = html_body.replace("</table>", "</table></div>")

    # Complete standalone HTML document with executive print styling
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SehatRoute AI — Technical Specification & Defense Dossier</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {{
    size: A4 portrait;
    margin: 18mm 14mm 18mm 14mm;
    @bottom-center {{
      content: "SehatRoute AI • Technical Specification Dossier • Page " counter(page);
      font-size: 8pt;
      font-family: 'Inter', sans-serif;
      color: #64748b;
    }}
  }}

  *, *:before, *:after {{
    box-sizing: border-box;
  }}

  body {{
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.6;
    font-size: 9.5pt;
    margin: 0;
    padding: 0;
  }}

  /* Executive Document Header Banner */
  .doc-header {{
    border-bottom: 2px solid #0f766e;
    padding-bottom: 12px;
    margin-bottom: 22px;
  }}
  .doc-badge {{
    display: inline-block;
    background: #0f766e;
    color: #ffffff;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  }}
  .doc-title {{
    font-size: 20pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.25;
    margin: 4px 0 8px 0;
    letter-spacing: -0.5px;
  }}
  .doc-meta-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 8pt;
    color: #475569;
    margin-top: 10px;
  }}
  .doc-meta-item strong {{
    color: #0f172a;
    display: block;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}

  /* Headings */
  h1 {{
    display: none; /* Handled in executive header */
  }}
  h2 {{
    font-size: 13pt;
    font-weight: 800;
    color: #0f172a;
    border-left: 4px solid #0f766e;
    padding-left: 8px;
    margin-top: 24px;
    margin-bottom: 12px;
    page-break-after: avoid;
    letter-spacing: -0.3px;
  }}
  h3 {{
    font-size: 10.5pt;
    font-weight: 700;
    color: #1e293b;
    margin-top: 16px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }}

  p {{
    margin: 0 0 10px 0;
    text-align: justify;
  }}

  strong {{
    color: #0f172a;
    font-weight: 600;
  }}

  hr {{
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 20px 0;
  }}

  /* Math Equations & Box Display */
  .math-equation {{
    background: #f1f5f9;
    border-left: 3px solid #0f766e;
    padding: 8px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    color: #0f172a;
    margin: 10px 0;
    border-radius: 0 4px 4px 0;
  }}

  pre {{
    background: #0f172a;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    line-height: 1.45;
    padding: 12px 14px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 12px 0;
    page-break-inside: avoid;
    border: 1px solid #1e293b;
    white-space: pre;
  }}
  code {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    background: #f1f5f9;
    color: #0f766e;
    padding: 1px 4px;
    border-radius: 3px;
    border: 1px solid #e2e8f0;
  }}
  pre code {{
    background: transparent;
    color: inherit;
    padding: 0;
    border: none;
    font-size: inherit;
  }}

  /* Tables */
  .table-container {{
    width: 100%;
    margin: 12px 0;
    page-break-inside: avoid;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 8pt;
    line-height: 1.4;
  }}
  th, td {{
    padding: 6px 10px;
    border: 1px solid #cbd5e1;
    text-align: left;
    vertical-align: top;
  }}
  th {{
    background: #0f172a;
    color: #ffffff;
    font-weight: 600;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }}
  tr:nth-child(even) {{
    background: #f8fafc;
  }}

  /* Lists */
  ul, ol {{
    margin: 0 0 10px 0;
    padding-left: 20px;
  }}
  li {{
    margin-bottom: 4px;
  }}

  /* Links & Citations */
  a {{
    color: #0f766e;
    text-decoration: none;
    font-weight: 500;
  }}
  a:hover {{
    text-decoration: underline;
  }}

  /* References Section */
  .references-list {{
    font-size: 8pt;
    line-height: 1.4;
  }}

  /* Avoid page breaks inside key units */
  .table-container, pre, blockquote {{
    page-break-inside: avoid;
  }}
</style>
</head>
<body>

<div class="doc-header">
  <div class="doc-badge">Technical Specification & Engineering Whitepaper</div>
  <div class="doc-title">SehatRoute AI: Core Problem, Algorithmic Engine & Technical Dossier</div>
  <div class="doc-meta-grid">
    <div class="doc-meta-item">
      <strong>System Architecture</strong>
      Capacity-Aware Emergency Dispatch & Routing
    </div>
    <div class="doc-meta-item">
      <strong>Target Pre-Hospital Fleets</strong>
      Alkhidmat Foundation (310+ Ambulances) & Rescue 1122
    </div>
    <div class="doc-meta-item">
      <strong>Geographic Scope</strong>
      Pakistan Urban Corridors (Lahore, Rawalpindi/Islamabad)
    </div>
  </div>
</div>

{html_body}

</body>
</html>
"""

    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"Generated HTML: {OUTPUT_HTML}")

    # Generate PDF via headless Chrome
    chrome_cmd = [
        "google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={OUTPUT_PDF}",
        f"file://{OUTPUT_HTML}"
    ]
    print("Running Chrome PDF generation...")
    res = subprocess.run(chrome_cmd, capture_output=True, text=True)
    if res.returncode == 0:
        file_size = os.path.getsize(OUTPUT_PDF)
        print(f"SUCCESS: PDF created at {OUTPUT_PDF} ({file_size / 1024:.1f} KB)")
    else:
        print(f"Chrome error: {res.stderr}")

if __name__ == "__main__":
    main()
