import re

with open('d:/forza/emon_style.css', 'r', encoding='utf-8') as f:
    css = f.read()

keywords = ['reveal-now-playing', 'reveal-about-me', 'reveal-projects', 'reveal-other-bios', 'reveal-thanks', 'portfolio-section', 'scroll-pagination', 'pagination-track', 'pagination-thumb']
for kw in keywords:
    for m in re.finditer(rf'([^{{}}]*\.{kw}[^{{}}]*\{{[^{{}}]*\}})', css):
        print(m.group(0).strip())
        print('-'*40)

print("\n=== JS SCROLL / REVEAL LOGIC ===")
with open('d:/forza/emon_script.min.js', 'r', encoding='utf-8') as f:
    js = f.read()

# search for reveal or observer
for m in re.finditer(r'(.{0,100}(?:reveal|IntersectionObserver|scroll-pagination|scrollSnap|wheel).{0,150})', js):
    print(m.group(0).strip())
    print('~'*40)
