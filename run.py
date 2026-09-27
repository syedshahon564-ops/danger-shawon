"""
Shahon Cyber OS - 1-Click Python Launcher (run.py)
Starts server.py and automatically opens default browser to admin and live bio page.
"""
import os
import sys
import time
import webbrowser
import threading

def open_browser():
    time.sleep(1.2)
    print("\n[*] Launching all 3 pages in browser simultaneously...")
    webbrowser.open("http://localhost:8080/index.html")
    webbrowser.open("http://localhost:8080/admin.html")
    webbrowser.open("http://localhost:8080/setup.html")

def main():
    print("=" * 65)
    print("  👑 SHAHON CYBER OS - MASTER BIO & TEMPLATES RUNNER")
    print("=" * 65)
    print("  - 🌐 Live Bio Page:  http://localhost:8080/index.html")
    print("  - 👑 Master Admin:   http://localhost:8080/admin.html")
    print("  - 👥 Buyer Portal:   http://localhost:8080/setup.html")
    print("=" * 65)

    threading.Thread(target=open_browser, daemon=True).start()
    
    # Run server.py with multi-threading
    import server
    with server.ThreadedHTTPServer(("", server.PORT), server.CustomHandler) as httpd:
        print(f"\n[SERVER] Running concurrently on http://localhost:{server.PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == '__main__':
    main()
