#!/usr/bin/env python3
"""
Louis Renner Conference Presentation Server
Supports HTTP 206 Partial Content (Range requests) for smooth MP4 streaming.
Multithreaded with ThreadingHTTPServer for fast concurrent media delivery.
Serves on http://localhost:8080
"""
import os
import sys
import json
import time
import signal
import socket
import subprocess
import threading
import mimetypes
import unicodedata
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

PORT = 8080
CANDIDATE_PORTS = (8080, 8090, 8181, 8585, 3535, 28080, 38080)
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
LAST_TRANSLATION_UPDATE = time.time()
SHUTTING_DOWN = False

def get_bundle_mtime():
    """Return latest mtime across index.html, CSS, and JS files for live page reload."""
    latest = 0.0
    candidates = [
        os.path.join(DIRECTORY, "index.html"),
        os.path.join(DIRECTORY, "css", "presentation.css"),
    ]
    js_dir = os.path.join(DIRECTORY, "js")
    if os.path.isdir(js_dir):
        for fn in os.listdir(js_dir):
            if fn.endswith(".js") and fn != "translations-data.js":
                candidates.append(os.path.join(js_dir, fn))
    for p in candidates:
        try:
            if os.path.exists(p):
                latest = max(latest, os.path.getmtime(p))
        except Exception:
            pass
    return round(latest, 3)

def watch_translations():
    """Background watcher that automatically compiles translations when slides_content.json changes."""
    global LAST_TRANSLATION_UPDATE
    slides_json = os.path.join(DIRECTORY, "translations", "slides_content.json")
    last_mtime = 0
    if os.path.exists(slides_json):
        last_mtime = os.path.getmtime(slides_json)

    while True:
        time.sleep(0.8)
        try:
            if os.path.exists(slides_json):
                current_mtime = os.path.getmtime(slides_json)
                if current_mtime > last_mtime:
                    last_mtime = current_mtime
                    print("\n[LIVE-SYNC] translations/slides_content.json geändert -> Automatische Kompilierung...")
                    # Run manage_translations.cmd_apply
                    trans_dir = os.path.join(DIRECTORY, "translations")
                    if trans_dir not in sys.path:
                        sys.path.insert(0, trans_dir)
                    import importlib
                    import manage_translations
                    importlib.reload(manage_translations)
                    manage_translations.cmd_apply()
                    LAST_TRANSLATION_UPDATE = time.time()
                    print(f"[LIVE-SYNC] ✓ Synchronisation abgeschlossen ({time.strftime('%H:%M:%S')})\n")
        except Exception as e:
            print(f"[LIVE-SYNC-HINWEIS] {e}")

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        clean_path = self.path.split('?')[0].lower()
        if clean_path.endswith(('.json', '.js', '.html', '.css')):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        else:
            self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        global SHUTTING_DOWN
        clean_req_path = self.path.split('?')[0]
        if clean_req_path == '/__renner_shutdown__':
            client_ip = (self.client_address[0] or '') if self.client_address else ''
            if client_ip in ('127.0.0.1', '::1', 'localhost', '::ffff:127.0.0.1'):
                SHUTTING_DOWN = True
                payload = b'{"ok":true,"stopping":true}\n'
                try:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.send_header('Content-Length', str(len(payload)))
                    self.end_headers()
                    self.wfile.write(payload)
                    self.wfile.flush()
                except OSError:
                    pass
                def _stop_srv(srv):
                    time.sleep(0.04)
                    try:
                        srv.shutdown()
                    except Exception:
                        pass
                    try:
                        srv.server_close()
                    except Exception:
                        pass
                threading.Thread(target=_stop_srv, args=(self.server,), daemon=True).start()
                return
            self.send_error(403, "Forbidden")
            return

        # Default route to index.html if root requested
        if self.path in ('/', ''):
            self.path = '/index.html'
        elif self.path == '/favicon.ico':
            self.path = '/Visuell/web_assets/renner_logo_weiss_schatten.png'
        elif self.path.startswith('/api/translation-version'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.end_headers()
            data = json.dumps({"version": LAST_TRANSLATION_UPDATE, "bundle_version": get_bundle_mtime()})
            self.wfile.write(data.encode('utf-8'))
            return
        elif self.path.startswith('/api/images'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.end_headers()
            try:
                import importlib, image_manager_backend
                importlib.reload(image_manager_backend)
                catalog = image_manager_backend.get_all_catalog_images()
                data = json.dumps(catalog, ensure_ascii=False)
                self.wfile.write(data.encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return
        elif self.path.startswith('/api/export-csv'):
            try:
                import importlib, image_manager_backend
                importlib.reload(image_manager_backend)
                csv_data = image_manager_backend.export_catalog_to_csv()
                self.send_response(200)
                self.send_header('Content-Type', 'text/csv; charset=utf-8')
                self.send_header('Content-Disposition', 'attachment; filename="Louis_Renner_Bilder_Katalog.csv"')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(csv_data.encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'text/plain; charset=utf-8')
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return
        return super().do_GET()

    def do_POST(self):
        global LAST_TRANSLATION_UPDATE
        if self.path == '/api/save-image':
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length)
            try:
                payload = json.loads(post_body.decode('utf-8'))
                import importlib, image_manager_backend
                importlib.reload(image_manager_backend)
                result = image_manager_backend.update_single_image_caption(payload, compile_now=True)
                LAST_TRANSLATION_UPDATE = time.time()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(result, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
            return
        elif self.path == '/api/save-all-images':
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length)
            try:
                items_list = json.loads(post_body.decode('utf-8'))
                import importlib, image_manager_backend
                importlib.reload(image_manager_backend)
                updated = 0
                for item in items_list:
                    image_manager_backend.update_single_image_caption(item, compile_now=False)
                    updated += 1
                image_manager_backend.run_compilation(sync=True)
                LAST_TRANSLATION_UPDATE = time.time()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "updated": updated, "message": f"{updated} Bildunterschriften erfolgreich gespeichert!"}, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
            return
        self.send_error(404, "Endpoint not found")

    def handle(self):
        """Suppress noisy socket-abort exceptions when Edge/Chrome cancels open Range streams."""
        try:
            super().handle()
        except (ConnectionError, BrokenPipeError, TimeoutError, OSError):
            pass

    def copyfile(self, source, outputfile):
        """Silently ignore broken pipes / aborted connections when client skips or pauses videos."""
        try:
            super().copyfile(source, outputfile)
        except (ConnectionError, BrokenPipeError, TimeoutError, OSError):
            pass

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path):
            # Cross-platform NFC/NFD fallback (macOS APFS <-> Windows NTFS ZIP extraction)
            for form in ('NFC', 'NFD'):
                cand = unicodedata.normalize(form, path)
                if os.path.exists(cand):
                    path = cand
                    break
        if os.path.isdir(path):
            if not self.path.endswith('/'):
                self.send_response(301)
                self.send_header('Location', self.path + '/')
                self.end_headers()
                return None
            for index in ['index.html', 'index.htm']:
                index_path = os.path.join(path, index)
                if os.path.exists(index_path):
                    path = index_path
                    break

        if not os.path.exists(path) or os.path.isdir(path):
            self.send_error(404, "File not found")
            return None

        # Prefer 1080p H.264 + FastStart optimized video cache when present (instant start in Edge/Chrome/Windows)
        if path.lower().endswith('.mp4'):
            cached_h264 = os.path.join(DIRECTORY, 'Visuell', 'Video_Standalone_H264', os.path.basename(path))
            if os.path.isfile(cached_h264):
                path = cached_h264

        ctype = self.guess_type(path)
        is_video = path.lower().endswith(('.mp4', '.webm'))
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        size = fs.st_size
        range_header = self.headers.get('Range')
        max_video_chunk = 4 * 1024 * 1024  # 4 MB slice prevents Chromium/Edge 6-socket pool stalls

        if range_header:
            # Handle Range: bytes=start-end
            try:
                range_match = range_header.strip().replace('bytes=', '').split(',')[0].strip()
                start_str, end_str = range_match.split('-')
                open_ended = (end_str == '')
                start = int(start_str) if start_str else max(0, size - int(end_str))
                end = int(end_str) if (start_str and end_str) else size - 1
                if start >= size or start < 0:
                    self.send_response(416)
                    self.send_header('Content-Range', f'bytes */{size}')
                    self.end_headers()
                    f.close()
                    return None
                if is_video and open_ended and (size - start) > max_video_chunk:
                    end = start + max_video_chunk - 1
                end = min(end, size - 1)
                content_length = end - start + 1

                self.send_response(206)
                self.send_header('Content-Type', ctype)
                self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
                self.send_header('Content-Length', str(content_length))
                self.send_header('Accept-Ranges', 'bytes')
                self.end_headers()

                f.seek(start)
                class RangeFile:
                    def __init__(self, fp, length):
                        self.fp = fp
                        self.remaining = length
                    def read(self, n=-1):
                        if self.remaining <= 0:
                            return b''
                        if n < 0 or n > self.remaining:
                            n = self.remaining
                        chunk = self.fp.read(n)
                        self.remaining -= len(chunk)
                        return chunk
                    def close(self):
                        self.fp.close()
                return RangeFile(f, content_length)
            except Exception:
                pass

        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(size))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        return f

class ManagedThreadingHTTPServer(ThreadingHTTPServer):
    # On Windows, SO_REUSEADDR allows duplicate binds on active ports; disable it on Windows
    allow_reuse_address = (os.name != "nt")
    daemon_threads = True

    def handle_error(self, request, client_address):
        _, exc_val, _ = sys.exc_info()
        if SHUTTING_DOWN or isinstance(exc_val, (ConnectionError, BrokenPipeError, TimeoutError, OSError)):
            return
        super().handle_error(request, client_address)


def _send_shutdown_probe(port: int) -> bool:
    """Ask a running Louis Renner server (Python or PowerShell) on 127.0.0.1:port to exit cleanly."""
    try:
        with socket.create_connection(("127.0.0.1", port), timeout=0.08) as sock:
            sock.settimeout(0.35)
            req = f"GET /__renner_shutdown__ HTTP/1.0\r\nHost: 127.0.0.1:{port}\r\nConnection: close\r\n\r\n"
            sock.sendall(req.encode("ascii"))
            resp = sock.recv(512).decode("utf-8", errors="ignore")
            return '"stopping":true' in resp
    except OSError:
        return False


def _is_port_in_use(port: int) -> bool:
    try:
        with socket.create_connection(("127.0.0.1", port), timeout=0.06):
            return True
    except OSError:
        return False


def _terminate_pid_safely(pid: int):
    """Terminate an old server process (Python or PowerShell) without throwing exceptions."""
    if not pid or pid <= 0 or pid == os.getpid():
        return
    try:
        if os.name == "nt":
            chk = subprocess.run(
                ["tasklist", "/FI", f"PID eq {pid}", "/NH"],
                capture_output=True, text=True, timeout=2
            )
            out_low = (chk.stdout or "").lower()
            if any(exe in out_low for exe in ("python", "powershell", "pwsh", "py.exe")):
                subprocess.run(
                    ["taskkill", "/F", "/T", "/PID", str(pid)],
                    capture_output=True, timeout=3
                )
        else:
            chk = subprocess.run(
                ["ps", "-p", str(pid), "-o", "command="],
                capture_output=True, text=True, timeout=2
            )
            cmd_line = (chk.stdout or "").strip()
            if "server.py" in cmd_line or "server_windows.ps1" in cmd_line:
                try:
                    os.kill(pid, signal.SIGTERM)
                except OSError:
                    return
                for _ in range(10):
                    time.sleep(0.05)
                    try:
                        os.kill(pid, 0)
                    except OSError:
                        return
                try:
                    os.kill(pid, signal.SIGKILL)
                except OSError:
                    pass
    except Exception:
        pass


def stop_existing_instances(preferred_port: int = 8080):
    """Ensure any prior Standalone server instance is cleanly stopped before binding."""
    my_pid = os.getpid()
    pid_file = os.path.join(DIRECTORY, ".server_pid")
    port_file = os.path.join(DIRECTORY, ".active_port")

    ports_to_check = []
    if os.path.isfile(port_file):
        try:
            p_txt = open(port_file, "r", encoding="utf-8").read().strip()
            if p_txt.isdigit():
                ports_to_check.append(int(p_txt))
        except Exception:
            pass

    old_pid = None
    if os.path.isfile(pid_file):
        try:
            meta = json.loads(open(pid_file, "r", encoding="utf-8").read())
            old_pid = int(meta.get("pid", 0))
            meta_port = int(meta.get("port", 0))
            if meta_port and meta_port not in ports_to_check:
                ports_to_check.append(meta_port)
        except Exception:
            pass

    for p in (preferred_port,) + CANDIDATE_PORTS:
        if p and p not in ports_to_check:
            ports_to_check.append(p)

    # 1. Graceful HTTP shutdown probe across active Renner ports
    stopped_any = False
    for p in ports_to_check:
        if _send_shutdown_probe(p):
            stopped_any = True

    if stopped_any:
        for _ in range(15):
            if not _is_port_in_use(preferred_port):
                time.sleep(0.12)
                break
            time.sleep(0.05)

    # 2. Terminate recorded PID if still lingering
    if old_pid and old_pid != my_pid:
        _terminate_pid_safely(old_pid)

    # 3. Sweep any orphaned server.py processes from this presentation on POSIX / Windows
    try:
        if os.name != "nt":
            res = subprocess.run(["pgrep", "-f", "server.py"], capture_output=True, text=True, timeout=2)
            for line in (res.stdout or "").splitlines():
                line = line.strip()
                if line.isdigit() and int(line) != my_pid:
                    _terminate_pid_safely(int(line))
        elif _is_port_in_use(preferred_port):
            res = subprocess.run(["netstat", "-ano"], capture_output=True, text=True, timeout=3)
            for line in (res.stdout or "").splitlines():
                if f"127.0.0.1:{preferred_port}" in line and "LISTENING" in line.upper():
                    parts = line.split()
                    if parts and parts[-1].isdigit():
                        _terminate_pid_safely(int(parts[-1]))
    except Exception:
        pass

    # Wait briefly for kernel TCP socket release
    for _ in range(10):
        if not _is_port_in_use(preferred_port):
            break
        time.sleep(0.08)


def _cleanup_state_files(my_pid: int):
    """Remove .server_pid and .active_port on exit ONLY if still owned by this instance."""
    pid_file = os.path.join(DIRECTORY, ".server_pid")
    port_file = os.path.join(DIRECTORY, ".active_port")
    try:
        if os.path.isfile(pid_file):
            meta = json.loads(open(pid_file, "r", encoding="utf-8").read())
            if int(meta.get("pid", 0)) != my_pid:
                return
            os.remove(pid_file)
        if os.path.isfile(port_file):
            os.remove(port_file)
    except Exception:
        pass


def find_and_bind_server():
    """Stops any previous Renner server instance and binds ManagedThreadingHTTPServer cleanly."""
    requested_port = None
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        requested_port = int(sys.argv[1])
    elif os.environ.get("PORT") and os.environ.get("PORT").isdigit():
        requested_port = int(os.environ.get("PORT"))

    preferred = requested_port or 8080
    stop_existing_instances(preferred_port=preferred)

    candidate_ports = [requested_port] if requested_port else []
    for p in CANDIDATE_PORTS:
        if p not in candidate_ports:
            candidate_ports.append(p)

    bind_host = os.environ.get("HOST", "127.0.0.1")
    for port in candidate_ports:
        for attempt in range(4 if port == preferred else 1):
            try:
                httpd = ManagedThreadingHTTPServer((bind_host, port), RangeRequestHandler)
                return httpd, port
            except OSError:
                if attempt < 3 and port == preferred:
                    time.sleep(0.12)
                continue

    # Fallback to random ephemeral port
    httpd = ManagedThreadingHTTPServer((bind_host, 0), RangeRequestHandler)
    return httpd, httpd.server_address[1]


def run():
    # Ensure correct MIME types across Windows & macOS
    mimetypes.add_type('video/mp4', '.mp4')
    mimetypes.add_type('video/webm', '.webm')
    mimetypes.add_type('image/jpeg', '.jpg')
    mimetypes.add_type('image/jpeg', '.jpeg')
    mimetypes.add_type('image/png', '.png')
    mimetypes.add_type('image/webp', '.webp')
    mimetypes.add_type('image/svg+xml', '.svg')
    mimetypes.add_type('font/woff2', '.woff2')
    mimetypes.add_type('font/woff', '.woff')
    mimetypes.add_type('text/javascript', '.js')
    mimetypes.add_type('text/css', '.css')
    mimetypes.add_type('application/pdf', '.pdf')

    global PORT, SHUTTING_DOWN
    my_pid = os.getpid()

    def _on_term_signal(signum, frame):
        global SHUTTING_DOWN
        SHUTTING_DOWN = True
        sys.exit(0)

    try:
        signal.signal(signal.SIGTERM, _on_term_signal)
        signal.signal(signal.SIGINT, _on_term_signal)
    except Exception:
        pass

    try:
        httpd, active_port = find_and_bind_server()
    except Exception as exc:
        print(f"[HINWEIS] Lokaler Server-Start abgebrochen: {exc}")
        sys.exit(0)

    PORT = active_port

    try:
        with open(os.path.join(DIRECTORY, ".server_pid"), "w", encoding="utf-8") as f:
            json.dump({"pid": my_pid, "port": active_port, "type": "python"}, f)
        with open(os.path.join(DIRECTORY, ".active_port"), "w", encoding="utf-8") as f:
            f.write(str(active_port))
    except Exception:
        pass

    print(f"Louis Renner Presentation Server active at http://localhost:{PORT} (PID {my_pid})")

    # Start live translation watcher thread only when authoring source exists
    slides_json = os.path.join(DIRECTORY, "translations", "slides_content.json")
    if os.path.exists(slides_json):
        watcher_thread = threading.Thread(target=watch_translations, daemon=True)
        watcher_thread.start()
        print("Live-Sync aktiv: Aenderungen in translations/slides_content.json werden automatisch uebernommen.")
    try:
        httpd.serve_forever()
    except (KeyboardInterrupt, SystemExit):
        pass
    except OSError:
        pass
    finally:
        try:
            httpd.server_close()
        except Exception:
            pass
        _cleanup_state_files(my_pid)
        print("Server stopped cleanly.")


if __name__ == '__main__':
    run()
