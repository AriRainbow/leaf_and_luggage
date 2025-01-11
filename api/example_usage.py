# filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/example_usage.py
from cache_middleware import cache_middleware

@cache_middleware('/some-endpoint')
def some_endpoint():
    # Your endpoint logic
    return {'data': 'This is some data'}

if __name__ == '__main__':
    response = some_endpoint()
    print(response)