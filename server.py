"""
Shahon Cyber Portfolio & Bio-Link Server (server.py)
Provides high-performance static file serving, real-time Video Downloader API via yt-dlp,
and Built-in Anti-DDoS / Rate-Limiting Protection Shield.
"""
import http.server
import socketserver
import json
import os
import sys
import time
import threading
import urllib.parse
from collections import defaultdict

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

download_status = {
    "is_downloading": False,
    "last_file": "",
    "last_url": "",
    "error": None,
    "progress": 0
}

# -----------------------------------------------------------------------------
# ANTI-DDOS & CONCURRENT TRAFFIC RATE LIMITER SHIELD
# -----------------------------------------------------------------------------
class AntiDDoSShield:
    def __init__(self, max_requests=120, window_seconds=10, max_post_requests=20):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.max_post_requests = max_post_requests
        self.requests = defaultdict(list)
        self.post_requests = defaultdict(list)
        self.lock = threading.Lock()

    def is_allowed(self, ip, is_post=False):
        now = time.time()
        with self.lock:
            # Clean old timestamps
            self.requests[ip] = [t for t in self.requests[ip] if now - t < self.window_seconds]
            if len(self.requests[ip]) >= self.max_requests:
                return False, "Rate limit exceeded (Too many requests - Anti-DDoS Shield Active)"

            if is_post:
                self.post_requests[ip] = [t for t in self.post_requests[ip] if now - t < self.window_seconds]
                if len(self.post_requests[ip]) >= self.max_post_requests:
                    return False, "POST request rate limit exceeded (Anti-Spam Active)"
                self.post_requests[ip].append(now)

            self.requests[ip].append(now)
            return True, None

ddos_shield = AntiDDoSShield()

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Security & Anti-DDoS HTTP Headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()

    def check_rate_limit(self, is_post=False):
        client_ip = self.client_address[0] if hasattr(self, 'client_address') and self.client_address else '127.0.0.1'
        allowed, msg = ddos_shield.is_allowed(client_ip, is_post)
        if not allowed:
            self.send_response(429)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Retry-After', '5')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "429 Too Many Requests", "message": msg}).encode('utf-8'))
            return False
        return True

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        self.end_headers()

    def do_GET(self):
        if not self.check_rate_limit(is_post=False):
            return

        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/video/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
            self.end_headers()
            self.wfile.write(json.dumps(download_status).encode('utf-8'))
            return
        
        if parsed.path == '/api/clients':
            clients_file = os.path.join(DIRECTORY, 'clients.json')
            db = {}
            if os.path.exists(clients_file):
                try:
                    with open(clients_file, 'r', encoding='utf-8') as f:
                        db = json.load(f)
                except Exception:
                    pass
            self._send_json(200, db)
            return

        # Default static file serving
        return super().do_GET()

    def do_POST(self):
        if not self.check_rate_limit(is_post=True):
            return

        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/clients/save':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
                clients_file = os.path.join(DIRECTORY, 'clients.json')
                db = {}
                if os.path.exists(clients_file):
                    try:
                        with open(clients_file, 'r', encoding='utf-8') as f:
                            db = json.load(f)
                    except Exception:
                        pass
                
                if 'slug' in data and 'data' in data:
                    db[data['slug']] = data['data']
                elif isinstance(data, dict):
                    db.update(data)

                with open(clients_file, 'w', encoding='utf-8') as f:
                    json.dump(db, f, indent=2, ensure_ascii=False)

                self._send_json(200, {"success": True, "count": len(db)})
            except Exception as e:
                self._send_json(500, {"success": False, "error": str(e)})
            return

        if parsed.path == '/api/video/download':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
                url = data.get('url', '').strip()
                if not url:
                    self._send_json(400, {"success": False, "error": "No URL provided"})
                    return

                # Start background download thread
                threading.Thread(target=self._download_video, args=(url,)).start()
                self._send_json(200, {"success": True, "message": "Download initiated in background"})
            except Exception as e:
                self._send_json(500, {"success": False, "error": str(e)})
            return

        self._send_json(404, {"error": "Not Found"})

    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode('utf-8'))

    def _download_video(self, url):
        global download_status
        download_status["is_downloading"] = True
        download_status["last_url"] = url
        download_status["error"] = None
        download_status["progress"] = 10

        media_dir = os.path.join(DIRECTORY, 'assets', 'media')
        os.makedirs(media_dir, exist_ok=True)
        target_path = os.path.join(media_dir, 'custom_bg.mp4')

        try:
            import yt_dlp

            # Remove existing custom_bg.mp4 if present
            if os.path.exists(target_path):
                try:
                    os.remove(target_path)
                except Exception:
                    pass

            def progress_hook(d):
                if d.get('status') == 'downloading':
                    p = d.get('_percent_str', '50%').replace('%', '').strip()
                    try:
                        download_status["progress"] = min(95, max(15, float(p)))
                    except:
                        pass
                elif d.get('status') == 'finished':
                    download_status["progress"] = 100

            ydl_opts = {
                'outtmpl': os.path.join(media_dir, 'custom_bg.%(ext)s'),
                'format': 'best[ext=mp4][height<=720]/best[height<=720]/best[ext=mp4]/best',
                'extractor_args': {'youtube': {'player_client': ['android', 'ios', 'web']}},
                'overwrites': True,
                'progress_hooks': [progress_hook],
                'quiet': True,
                'no_warnings': True
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                if info:
                    download_status["title"] = info.get("title", "Custom Background Video")
                    download_status["thumbnail"] = info.get("thumbnail", "")
                    download_status["duration"] = info.get("duration", 0)

            # Ensure file is named custom_bg.mp4
            files = [f for f in os.listdir(media_dir) if f.startswith('custom_bg.')]
            if files:
                main_file = os.path.join(media_dir, files[0])
                if not main_file.endswith('.mp4'):
                    # rename to .mp4
                    try:
                        os.replace(main_file, target_path)
                    except:
                        target_path = main_file
                download_status["last_file"] = "./assets/media/custom_bg.mp4"
            else:
                download_status["last_file"] = "./assets/media/custom_bg.mp4"

            download_status["is_downloading"] = False
            download_status["progress"] = 100
            print(f"[Video API] Successfully downloaded and saved background video: {target_path}")

        except Exception as e:
            download_status["is_downloading"] = False
            download_status["error"] = str(e)
            print(f"[Video API] Error downloading video: {e}")

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True
    request_queue_size = 256

if __name__ == '__main__':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    with ThreadedHTTPServer(("", PORT), CustomHandler) as httpd:
        print(f"[SERVER] Shahon Cyber OS Server running concurrently on http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
