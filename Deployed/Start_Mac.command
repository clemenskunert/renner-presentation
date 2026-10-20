#!/bin/bash
# ==============================================================================
# Louis Renner Masterclass 2025 - Mac One-Click Launcher
# ==============================================================================
cd "$(dirname "$0")"

echo "======================================================="
echo "  🎹 Louis Renner Masterclass & Konferenz 2025"
echo "======================================================="
echo ""

PORT=8080

# 1. Pruefen ob der Server bereits aktiv ist
if lsof -i :$PORT >/dev/null 2>&1; then
    echo "✓ Präsentations-Server läuft bereits auf Port $PORT."
    open "http://localhost:$PORT"
    exit 0
fi

# 2. Server starten und Browser oeffnen
if command -v python3 >/dev/null 2>&1; then
    echo "✓ Starte lokalen Präsentations-Server..."
    python3 server.py &
    SERVER_PID=$!
    sleep 0.8
    open "http://localhost:$PORT"
    echo ""
    echo "Präsentation wurde im Standardbrowser geöffnet (http://localhost:$PORT)."
    echo "Drücke Strg+C (Ctrl+C), um den Server zu beenden."
    wait $SERVER_PID
else
    echo "[HINWEIS] Python 3 nicht gefunden. Öffne Präsentation direkt im Standardbrowser..."
    open "index.html"
fi
