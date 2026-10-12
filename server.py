#!/usr/bin/env python3
"""
Louis Renner Conference Presentation Server
Supports HTTP 206 Partial Content (Range requests) for smooth MP4 streaming.
Serves on http://localhost:8080
"""
import os
import sys
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def do_GET(self):
        # Default route to index.html if root requested
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        return super().do_GET()

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            parts = [p for p in self.path.split('/') if p]
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
    mimetypes.add_type('text/javascript', '.js')
    mimetypes.add_type('text/css', '.css')

    server_address = ('', PORT)
    httpd = HTTPServer(server_address, RangeRequestHandler)
    print(f"🎵 Louis Renner Presentation Server active at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.server_close()

if __name__ == '__main__':
    run()
