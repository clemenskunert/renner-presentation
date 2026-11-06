#!/bin/bash
# ==============================================================================
# Louis Renner Masterclass - macOS One-Click Offline Launcher
# Cleanly stops any previously running server instance before starting fresh.
# ==============================================================================
DIR="$( cd "$( dirname "$0" )" && pwd )"
cd "$DIR" || exit 1

# Remove macOS Gatekeeper quarantine attributes inside this folder if copied from USB/ZIP
xattr -dr com.apple.quarantine "$DIR" >/dev/null 2>&1 || true

echo "======================================================="
echo "  Louis Renner Masterclass (Offline Presentation)"
echo "======================================================="
echo ""

# Cleanly stop any prior server instance from a previous launch (prevents duplicate instances / exceptions)
if [ -f ".active_port" ]; then
    OLD_PORT="$(tr -d '[:space:]' < .active_port)"
    if [ -n "$OLD_PORT" ]; then
        curl -s --max-time 1 "http://127.0.0.1:$OLD_PORT/__renner_shutdown__" >/dev/null 2>&1 || true
    fi
    rm -f ".active_port"
fi

# Locate a real Python 3 without triggering macOS Xcode Command Line Tools install popup offline!
PYTHON_BIN=""
for cand in "/opt/homebrew/bin/python3" "/usr/local/bin/python3" "/Library/Frameworks/Python.framework/Versions/Current/bin/python3"; do
    if [ -x "$cand" ]; then
        PYTHON_BIN="$cand"
        break
    fi
done
if [ -z "$PYTHON_BIN" ] && xcode-select -p >/dev/null 2>&1 && [ -x "/usr/bin/python3" ]; then
    PYTHON_BIN="/usr/bin/python3"
fi

if [ -n "$PYTHON_BIN" ] && [ -f "server.py" ]; then
    echo "Starte lokalen Offline-Server..."
    "$PYTHON_BIN" server.py &
    SERVER_PID=$!

    ACT_PORT=""
    for _ in {1..30}; do
        if [ -f ".active_port" ]; then
            ACT_PORT="$(tr -d '[:space:]' < .active_port)"
            if [ -n "$ACT_PORT" ] && lsof -Pi :"$ACT_PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
                break
            fi
        fi
        sleep 0.2
    done

    if [ -n "$ACT_PORT" ]; then
        open "http://localhost:$ACT_PORT"
        echo ""
        echo "Praesentation geoeffnet unter: http://localhost:$ACT_PORT"
        echo "Dieses Fenster kann im Hintergrund offen bleiben (Ctrl+C beendet den Server)."
        wait "$SERVER_PID" 2>/dev/null || true
        exit 0
    fi
fi

# Zero-dependency fallback: open standalone bundle directly in browser
if [ -f "index_offline_tablet.html" ]; then
    open "index_offline_tablet.html"
else
    open "index.html"
fi
