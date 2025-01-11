# filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/cache_middleware.py
import redis
from redis_config import client
import json

def cache_middleware(request_path, response_func):
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