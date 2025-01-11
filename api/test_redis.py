# filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/test_redis.py
from example_usage import some_endpoint

def test_redis_connection():
    # Simulate a request to the endpoint
    response = some_endpoint()
    print("First request (should not be cached):", response)

    # Simulate a second request to the same endpoint
    response = some_endpoint()
    print("Second request (should be cached):", response)

if __name__ == '__main__':
    test_redis_connection()