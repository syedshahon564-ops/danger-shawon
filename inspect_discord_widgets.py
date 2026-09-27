import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/forza/emon_source.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# find discord widgets in slide 0 (bio card) and slide 2 (about me)
m0 = re.search(r'<div class="widget-card discord-widget">.*?</div>\s*</div>\s*</div>', html, re.S)
if m0:
    print("=== DISCORD WIDGET (SLIDE 0) ===")
    print(m0.group(0)[:1000])

m2 = re.search(r'<div class="about-widget-card discord-widget">.*?</div>\s*</div>', html, re.S)
if m2:
    print("\n=== DISCORD WIDGET (ABOUT ME) ===")
    print(m2.group(0)[:1000])
