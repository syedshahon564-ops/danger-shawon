import re

with open('d:/forza/emon_source.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("--- Sections / Divs in emon_source.html ---")
sections = re.findall(r'<(?:section|div)[^>]*(?:id|class)=["\'][^"\']*(?:page|slide|section|module|scroll|panel)[^"\']*["\'][^>]*>', html)
for s in sections[:25]:
    print(s[:100])

print("\n--- Scroll / Snap / Reveal CSS in emon_style.css ---")
with open('d:/forza/emon_style.css', 'r', encoding='utf-8') as f:
    css = f.read()

for match in re.finditer(r'([^{}]*(?:scroll|snap|reveal|slide|transform|perspective|card-wrapper|now-playing)[^{}]*\{[^{}]*\})', css, re.I):
    rule = match.group(1).strip()
    if any(k in rule for k in ['scroll-snap', 'reveal', 'slide', 'transform', 'perspective', 'translate']):
        print(rule[:250])
        print("...")
        if len(rule) > 300: break

print("\n--- Discord in emon_config.js ---")
with open('d:/forza/emon_config.js', 'r', encoding='utf-8') as f:
    config = f.read()
print(config[:1500])
