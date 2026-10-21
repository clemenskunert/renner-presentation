@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Louis Renner Masterclass
pushd "%~dp0"

echo =======================================================
echo   🎹 Louis Renner Masterclass & Konferenz 2025
echo =======================================================
echo.

if exist .active_port del /f /q .active_port >nul 2>nul

REM 1. Echtes Python ermitteln (Windows Store Stubs ausschliessen)
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

REM 2. Integrierter Windows PowerShell Server (laeuft auf jedem Windows 10/11)
where powershell >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Starte integrierten Windows PowerShell Server...
    start /b "" powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0scripts\server_windows.ps1"
    goto wait_for_server
)

REM 3. Direkter Fallback: Im Standardbrowser oeffnen (100%% offline & autark)
echo [INFO] Weder Python noch PowerShell aktiv. Oeffne Praesentation direkt...
if exist "%~dp0index_offline_tablet.html" (
    start "" "%~dp0index_offline_tablet.html"
) else (
    start "" "%~dp0index.html"
)
popd
exit /b 0

:wait_for_server
echo [INFO] Warte kurz auf Port-Zuweisung und Serverbereitschaft...
for /l %%i in (1,1,20) do (
    if exist .active_port (
        set /p ACT_PORT=<.active_port
        if defined ACT_PORT (
            echo [OK] Server laeuft auf Port !ACT_PORT!! Oeffne Browser...
            start "" "http://localhost:!ACT_PORT!"
            popd
            exit /b 0
        )
    )
    timeout /t 1 /nobreak >nul 2>nul
)

REM Zweite Pruefung ueber Socket-Fallback
for %%p in (8080 8090 8181 8585 3535 28080) do (
    netstat -ano | findstr /R /C:":%%p .*LISTENING" >nul 2>nul
    if !ERRORLEVEL! equ 0 (
        echo [OK] Server auf Port %%p erkannt! Oeffne Browser...
        start "" "http://localhost:%%p"
        popd
        exit /b 0
    )
)

echo [HINWEIS] Kein Server-Port verfuegbar. Oeffne Praesentation im Offline-Modus...
if exist "%~dp0index_offline_tablet.html" (
    start "" "%~dp0index_offline_tablet.html"
) else (
    start "" "%~dp0index.html"
)
popd
exit /b 0
