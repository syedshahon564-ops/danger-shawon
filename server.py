"""
Shahon Cyber Portfolio & Bio-Link Server (server.py)
Provides high-performance static file serving and real-time Video Downloader API via yt-dlp.
"""
import http.server
import socketserver
import json
import os
import sys
import threading
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

download_status = {
    "is_downloading": False,
    "last_file": "",
    "last_url": "",
    "error": None,
    "progress": 0
}

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        self.end_headers()

    def do_GET(self):
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
