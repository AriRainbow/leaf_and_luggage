// filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/routes/index.js
const express = require('express');
const router = express.Router();
const cacheMiddleware = require('../cacheMiddleware');

router.get('/some-endpoint', cacheMiddleware, (req, res) => {
  // Your endpoint logic
  res.json({ data: 'This is some data' });
});

module.exports = router;