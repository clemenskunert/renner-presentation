@echo off
chcp 65001 >nul
title Louis Renner Masterclass 2025
cd /d "%~dp0"

echo =======================================================
echo   🎹 Louis Renner Masterclass & Konferenz 2025
echo =======================================================
echo.

REM 1. Pruefen ob Port 8080 bereits aktiv ist
netstat -ano | findstr /R ":8080 .*LISTENING" >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Praesentations-Server laeuft bereits auf Port 8080.
    start "" "http://localhost:8080"
    goto end
)

REM 2. Versuch: Python 3
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Starte lokalen Server ueber Python...
    start "" "http://localhost:8080"
    python server.py
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Starte lokalen Server ueber Windows py Launcher...
    start "" "http://localhost:8080"
    py -3 server.py
    goto end
)

REM 3. Versuch: Windows PowerShell HttpListener (keine Installation noetig)
where powershell >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Starte integrierten Windows PowerShell Server...
    start "" "http://localhost:8080"
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\server_windows.ps1"
    goto end
)

REM 4. Fallback: Direktes Oeffnen im Standardbrowser (Edge / Chrome)
echo [HINWEIS] Weder Python noch PowerShell Server verfuegbar.
echo [HINWEIS] Oeffne Praesentation direkt im Browser...
start "" "%~dp0index.html"

:end
