import re

with open('d:/forza/emon_style.css', 'r', encoding='utf-8') as f:
    css = f.read()

print("=== KEYFRAMES IN EMON_STYLE.CSS ===")
for m in re.finditer(r'@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}', css):
    name = m.group(1)
    body = m.group(2)
    if any(k in name.lower() for k in ['reveal', 'slide', 'scroll', 'fade', 'bounce', 'track', 'about', 'project', 'card']):
        print(f"@keyframes {name} {{{body}}}")
        print("="*40)

print("\n=== JS WHEEL / SCROLL LOGIC IN EMON_SCRIPT.MIN.JS ===")
with open('d:/forza/emon_script.min.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('handleWheel')
if idx != -1:
    print(js[max(0, idx - 100):min(len(js), idx + 2500)])
else:
    idx2 = js.find('scrollSnap')
    print(js[max(0, idx2 - 100):min(len(js), idx2 + 2500)])
