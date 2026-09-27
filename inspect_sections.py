import re

with open('d:/forza/emon_source.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# find scrollPagination in html
m = re.search(r'<div class="scroll-pagination"[^>]*>.*?</div>\s*</div>', html, re.S)
if not m:
    m = re.search(r'<div[^>]*id="scrollPagination"[^>]*>.*?</div>', html, re.S)
if m:
    print("=== SCROLL PAGINATION HTML ===")
    print(m.group(0))

# find all portfolio-section in html
sections = re.findall(r'<div class="portfolio-section[^"]*".*?</div>\s*</div>\s*(?=<div class="portfolio-section|<!--|$)', html, re.S)
print(f"\nFound {len(sections)} portfolio sections:")
for i, s in enumerate(sections):
    print(f"--- Section {i} ({len(s)} chars) ---")
    print(s[:300])
