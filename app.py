import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
import redis

class CachingHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
        super().__init__(*args, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'public, max-age=31536000')  # Cache for 1 year
        super().end_headers()

    def do_GET(self):
        cache_key = f"static:{self.path}"
        cached_response = self.redis_client.get(cache_key)
        if cached_response:
            self.send_response(200)
            self.send_header('Content-type', self.guess_type(self.path))
            self.end_headers()
            self.wfile.write(cached_response)
        else:
            super().do_GET()
            if self.path != '/':
                self.redis_client.setex(cache_key, 31536000, self.wfile.getvalue())  # Cache for 1 year

def run(server_class=HTTPServer, handler_class=CachingHTTPRequestHandler):
    server_address = ('', 3000)
    httpd = server_class(server_address, handler_class)
    print('Starting server on port 3000...')
    httpd.serve_forever()

if __name__ == '__main__':
    os.chdir('public_html')
    run()