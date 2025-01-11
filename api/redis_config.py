import redis

client = redis.StrictRedis(
    unix_socket_path='/home/dojpzhqm/.redis/redis.sock',
    decode_responses=True
)

try:
    client.ping()
    print("Connected to Redis")
except redis.ConnectionError as e:
    print(f"Redis error: {e}")