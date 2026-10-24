import http.server, os, sys
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = super().translate_path(path)
        if not os.path.exists(p) and os.path.exists(p + '.html'):
            return p + '.html'
        return p
http.server.ThreadingHTTPServer(('', 8080), H).serve_forever()
