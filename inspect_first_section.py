import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/forza/emon_source.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

idx = html.find('<div class="portfolio-section">')
print("=== HTML BEFORE FIRST PORTFOLIO SECTION ===")
print(html[idx-1500:idx])
