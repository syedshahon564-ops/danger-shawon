import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/forza/emon_style.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

# Let's extract the exact CSS rules for portfolio modules, active-slide, and keyframes
patterns = [
    r'/\* Slide \d -.*?(?=/\* Slide|\Z)',
    r'\.portfolio-section[^{]*\{[^}]*\}',
    r'\.portfolio-module[^{]*\{[^}]*\}',
    r'\.about-module-content[^{]*\{[^}]*\}',
    r'\.about-text-content[^{]*\{[^}]*\}',
    r'\.about-subcards-row[^{]*\{[^}]*\}',
    r'\.clock-subcard[^{]*\{[^}]*\}',
    r'\.discord-subcard[^{]*\{[^}]*\}',
    r'\.other-bios-flex[^{]*\{[^}]*\}',
    r'\.bio-list-item[^{]*\{[^}]*\}',
    r'\.projects-grid[^{]*\{[^}]*\}',
    r'\.thanks-card[^{]*\{[^}]*\}',
    r'@keyframes (?:aboutLeftReveal|aboutRightReveal|musicTrackReveal|musicLyricsReveal|projectCardReveal|bioItemReveal|customBtnReveal|headerGlowPulse)[^{]*\{[^}]*\}'
]

for p in patterns:
    matches = re.findall(p, css, re.S)
    for m in matches:
        print(m.strip()[:600])
        print("="*50)
