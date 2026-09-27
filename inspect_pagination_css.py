import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/forza/emon_style.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

for m in re.finditer(r'([^{}]*pagination[^{}]*\{[^{}]*\})', css, re.I):
    print(m.group(0).strip())
    print('-'*40)
