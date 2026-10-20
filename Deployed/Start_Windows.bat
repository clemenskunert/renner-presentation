@echo off
chcp 65001 >nul
title Louis Renner Masterclass
pushd "%~dp0"

echo =======================================================
echo   🎹 Louis Renner Masterclass & Konferenz 2025
echo =======================================================
echo.

REM 1. Pruefen ob Praesentations-Server bereits auf Port 8080 laeuft
netstat -ano | findstr /R ":8080 .*LISTENING" >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Server laeuft bereits auf Port 8080. Oeffne Browser...
    start "" "http://localhost:8080"
    popd
    exit /b 0
)

REM 2. Echtes Python ermitteln (Windows Store Stubs ausschliessen)
set HAS_PYTHON=0
python -c "import sys; sys.exit(0)" >nul 2>nul
if %ERRORLEVEL% equ 0 (
    set HAS_PYTHON=1
    set PY_CMD=python
)
if %HAS_PYTHON% equ 0 (
    py -3 -c "import sys; sys.exit(0)" >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        set HAS_PYTHON=1
        set PY_CMD=py -3
    )
)

if %HAS_PYTHON% equ 1 (
    echo [INFO] Starte lokalen Streaming-Server ueber Python...
    start /b "" %PY_CMD% server.py
    goto wait_for_server
)

REM 3. Integrierter Windows PowerShell Server (laeuft auf jedem Windows 10/11)
where powershell >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Starte integrierten Windows PowerShell Server...
    start /b "" powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0scripts\server_windows.ps1" -Port 8080
    goto wait_for_server
)

REM 4. Direkter Fallback: Im Standardbrowser oeffnen
echo [INFO] Weder Python noch PowerShell aktiv. Oeffne Praesentation direkt...
start "" "%~dp0index.html"
popd
exit /b 0

:wait_for_server
echo [INFO] Warte kurz auf Serverbereitschaft...
for /l %%i in (1,1,15) do (
    netstat -ano | findstr /R ":8080 .*LISTENING" >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo [OK] Server ist bereit! Oeffne Browser...
        start "" "http://localhost:8080"
        popd
        exit /b 0
    )
    timeout /t 1 /nobreak >nul 2>nul
)

echo [HINWEIS] Server braucht laenger - Oeffne Praesentation im Browser...
start "" "http://localhost:8080"
start "" "%~dp0index.html"
popd
exit /b 0
