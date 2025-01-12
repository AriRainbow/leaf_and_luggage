import redis
from redis_config import client
import json

def cache_middleware(request_path):
    def decorator(response_func):
        key = f"{request_path}_id"  # Add an ID to avoid key issues

        def wrapper(*args, **kwargs):
            cached_data = client.get(key)
            if cached_data:
                return json.loads(cached_data)
            else:
                response = response_func(*args, **kwargs)
                client.setex(key, 3600, json.dumps(response))  # Cache for 1 hour
                return response

        return wrapper
    return decorator