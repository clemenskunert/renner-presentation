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
import threading
import mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
LAST_TRANSLATION_UPDATE = time.time()

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
                    import manage_translations
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
        if self.path.endswith('.json') or self.path.endswith('.js') or self.path.endswith('.html') or self.path.endswith('.css'):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        else:
            self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
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
            data = json.dumps({"version": LAST_TRANSLATION_UPDATE})
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
        if self.path == '/api/save-image':
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length)
            try:
                payload = json.loads(post_body.decode('utf-8'))
                import importlib, image_manager_backend
                importlib.reload(image_manager_backend)
                result = image_manager_backend.update_single_image_caption(payload)
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
                    image_manager_backend.update_single_image_caption(item)
                    updated += 1
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

    def copyfile(self, source, outputfile):
        """Silently ignore broken pipes when client skips or pauses videos."""
        try:
            super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def send_head(self):
        path = self.translate_path(self.path)
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

        ctype = self.guess_type(path)
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        size = fs.st_size
        range_header = self.headers.get('Range')

        if range_header:
            # Handle Range: bytes=start-end
            try:
                range_match = range_header.strip().replace('bytes=', '')
                start_str, end_str = range_match.split('-')
                start = int(start_str) if start_str else 0
                end = int(end_str) if end_str else size - 1
                if start >= size:
                    self.send_error(416, "Requested Range Not Satisfiable")
                    f.close()
                    return None
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

def run():
    # Ensure correct MIME types
    mimetypes.add_type('video/mp4', '.mp4')
    mimetypes.add_type('image/jpeg', '.jpg')
    mimetypes.add_type('image/jpeg', '.jpeg')
    mimetypes.add_type('image/png', '.png')
    mimetypes.add_type('image/svg+xml', '.svg')
    mimetypes.add_type('text/javascript', '.js')
    mimetypes.add_type('text/css', '.css')

    server_address = ('', PORT)
    ThreadingHTTPServer.allow_reuse_address = True
    httpd = ThreadingHTTPServer(server_address, RangeRequestHandler)
    print(f"🎵 Louis Renner Presentation Server active at http://localhost:{PORT}")
    
    # Start live translation watcher thread
    watcher_thread = threading.Thread(target=watch_translations, daemon=True)
    watcher_thread.start()
    print("🔄 Live-Sync aktiv: Änderungen in translations/slides_content.json werden sofort automatisch übernommen.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.server_close()

if __name__ == '__main__':
    run()
