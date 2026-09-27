import urllib.request

files = ['style.css', 'script.min.js', 'config.js']
for f in files:
    url = f'https://emon7xx.xyz/{f}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            content = r.read().decode('utf-8', errors='ignore')
            print(f'{f} len: {len(content)}')
            with open(f'd:/forza/emon_{f}', 'w', encoding='utf-8') as out:
                out.write(content)
    except Exception as e:
        print(f'Error fetching {f}:', e)
