@echo off
title SHAHON CYBER OS - MASTER BIO & TEMPLATES SERVER
chcp 65001 >nul
color 0b

echo.
echo  ==============================================================
echo     👑 SHAHON CYBER OS - MASTER BIO & TEMPLATES SERVER
echo  ==============================================================
echo.
echo  [*] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo  [!] Python is not found! Please install Python from https://python.org
    pause
    exit /b
)

echo  [*] Python is detected.
echo  [*] Verifying required packages (yt-dlp)...
python -c "import yt_dlp" >nul 2>&1
if errorlevel 1 (
    echo  [*] Installing yt-dlp for video downloader engine...
    pip install yt-dlp
)

echo.
echo  [*] Starting Web Server & Video Engine API on http://localhost:8080 ...
echo  [*] Automatically opening browser...
echo.

start "" "http://localhost:8080/index.html"
start "" "http://localhost:8080/admin.html"
start "" "http://localhost:8080/setup.html"

echo  --------------------------------------------------------------
echo   LIVE ACCESS URLS:
echo   - 👑 Master Admin:   http://localhost:8080/admin.html
echo   - 👥 Buyer Setup:    http://localhost:8080/setup.html
echo   - 🌐 Live Bio Page:  http://localhost:8080/index.html
echo  --------------------------------------------------------------
echo   Server is LIVE! Keep this window open.
echo   Press Ctrl+C to stop the server anytime.
echo.

python server.py

pause
