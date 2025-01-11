// filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/redisConfig.js
const redis = require('redis');
const client = redis.createClient({
  socket: '/home/dojpzhqm/.redis/redis.sock' // Use the Unix socket path
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = client;