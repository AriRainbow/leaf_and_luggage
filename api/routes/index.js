// filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/routes/index.js
const express = require('express');
const router = express.Router();
const client = require('../redisConfig');

// Test Redis connection
router.get('/test-redis', (req, res) => {
  const testKey = 'test';
  const testValue = 'Redis is connected!';

  client.set(testKey, testValue, (err) => {
    if (err) {
      return res.status(500).send('Error setting value in Redis');
    }

    client.get(testKey, (err, value) => {
      if (err) {
        return res.status(500).send('Error getting value from Redis');
      }

      res.send(`Value from Redis: ${value}`);
    });
  });
});

// Example endpoint with caching middleware
const cacheMiddleware = require('../cacheMiddleware');
router.get('/some-endpoint', cacheMiddleware, (req, res) => {
  // Your endpoint logic
  res.json({ data: 'This is some data' });
});

module.exports = router;