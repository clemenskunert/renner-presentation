@echo off
setlocal enabledelayedexpansion
title Louis Renner Masterclass Launcher
pushd "%~dp0"

echo =======================================================
echo   LOUIS RENNER - MASTERCLASS PRESENTATION (OFFLINE)
echo =======================================================
echo.

set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8

REM Cleanly stop any previous server window titled "Louis Renner Offline Server" before starting a fresh instance
taskkill /FI "WINDOWTITLE eq Louis Renner Offline Server*" /F >nul 2>nul

REM Remove stale .active_port marker so we wait strictly for the newly started server instance
REM (Keep .server_pid intact so server.py / server_windows.ps1 also shuts down any headless old instance cleanly!)
if exist ".active_port" del /f /q ".active_port" >nul 2>nul

REM 1. Detect real Python 3 installation (ignore Windows Store AppExecutionAlias stub)
set HAS_PYTHON=0
python -c "import sys; sys.exit(0 if sys.version_info[0]>=3 else 1)" >nul 2>nul
if !ERRORLEVEL! equ 0 (
    set HAS_PYTHON=1
    set PY_CMD=python
)
if !HAS_PYTHON! equ 0 (
    py -3 -c "import sys; sys.exit(0)" >nul 2>nul
    if !ERRORLEVEL! equ 0 (
        set HAS_PYTHON=1
        set PY_CMD=py -3
    )
)

if !HAS_PYTHON! equ 1 (
    if exist "%~dp0server.py" (
        echo [INFO] Starting local offline streaming server via Python...
        start "Louis Renner Offline Server" /min !PY_CMD! "%~dp0server.py"
        goto wait_for_server
    )
)

REM 2. Built-in Windows PowerShell HTTP Server (available on every Windows 10/11 PC)
where powershell >nul 2>nul
if !ERRORLEVEL! equ 0 (
    if exist "%~dp0scripts\server_windows.ps1" (
        echo [INFO] Starting built-in Windows PowerShell offline server...
        start "Louis Renner Offline Server" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\server_windows.ps1"
        goto wait_for_server
    )
)

REM 3. Direct zero-server fallback: open embedded standalone HTML directly in browser
goto open_direct_file

:wait_for_server
echo [INFO] Waiting for local server port...
for /l %%i in (1,1,25) do (
    if exist ".active_port" (
        set /p ACT_PORT=<".active_port"
        if defined ACT_PORT (
            for /f "tokens=* delims= " %%a in ("!ACT_PORT!") do set ACT_PORT=%%a
            echo [OK] Offline server ready at http://localhost:!ACT_PORT!
            start "" "http://localhost:!ACT_PORT!"
            popd
            exit /b 0
        )
    )
    ping 127.0.0.1 -n 2 >nul 2>nul
)

echo [INFO] Local port blocked by system policy. Opening direct offline bundle...

:open_direct_file
if exist "%~dp0index_offline_tablet.html" (
    start "" "%~dp0index_offline_tablet.html"
) else (
    start "" "%~dp0index.html"
)
popd
exit /b 0
