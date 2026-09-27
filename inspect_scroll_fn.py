import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/forza/emon_script.min.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

idx = js.find('function scrollToSection')
if idx == -1:
    idx = js.find('scrollToSection')
print("=== SCROLL TO SECTION FUNCTION ===")
print(js[idx:idx+2500])
