import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
import redis
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

class CachingHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
        super().__init__(*args, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'public, max-age=31536000')  # Cache for 1 year
        super().end_headers()

    def do_GET(self):
        cache_key = f"static:{self.path}"
        try:
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
        except Exception as e:
            logging.error(f"Error serving {self.path}: {e}")
            self.send_error(503, "Service Unavailable")

def run(server_class=HTTPServer, handler_class=CachingHTTPRequestHandler):
    server_address = ('', 3000)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting server on port 3000...')
    httpd.serve_forever()

if __name__ == '__main__':
    # Use an absolute path to the public_html directory
    os.chdir('public_html')
    run()