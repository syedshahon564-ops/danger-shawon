import sys, re
sys.stdout.reconfigure(encoding='utf-8')

print("=== DISCORD IN EMON_CONFIG.JS ===")
with open('d:/forza/emon_config.js', 'r', encoding='utf-8', errors='ignore') as f:
    config = f.read()

for m in re.finditer(r'([^{}]*discord[^{}]*:[^{}]*\{[^{}]*\})', config, re.I):
    print(m.group(0))

print("\n=== DISCORD IN EMON_SOURCE.HTML ===")
with open('d:/forza/emon_source.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

for m in re.finditer(r'<[^>]+(?:discord|login|connect|sync|server|user-id)[^>]*>', html, re.I):
    tag = m.group(0)
    if any(k in tag.lower() for k in ['btn', 'button', 'modal', 'card', 'input', 'id=', 'class=']):
        print(tag)

print("\n=== DISCORD IN EMON_SCRIPT.MIN.JS ===")
with open('d:/forza/emon_script.min.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

matches = re.findall(r'.{0,80}(?:lanyard|discord\.com/api|discord_user|inviteCode|serverInvite).{0,120}', js, re.I)
for m in matches[:15]:
    print(m.strip())
    print('-'*30)
