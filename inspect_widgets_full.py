import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/forza/emon_source.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

m0 = re.search(r'<div class="widget-card discord-widget">.*?</div>\s*</div>\s*</div>', html, re.S)
if m0:
    print("=== FULL DISCORD WIDGET 0 ===")
    print(m0.group(0))

m2 = re.search(r'<div class="about-widget-card discord-widget">.*?</div>\s*</div>\s*</div>', html, re.S)
if m2:
    print("\n=== FULL DISCORD WIDGET 2 ===")
    print(m2.group(0))
