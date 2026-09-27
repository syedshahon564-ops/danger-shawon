import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/forza/emon_style.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

for m in re.finditer(r'([^{}]*\.module-title[^{}]*\{[^{}]*\})', css, re.I):
    print(m.group(0).strip())
    print('-'*40)

# Check google fonts imported in emon_style.css
for m in re.finditer(r'@import url\([^)]+\);', css):
    print("FONT IMPORT:", m.group(0))
