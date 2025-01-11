// filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/cacheMiddleware.js
const client = require('./redisConfig');

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  client.get(key, (err, data) => {
    if (err) throw err;

    if (data) {
      res.send(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, 3600, JSON.stringify(body)); // Cache for 1 hour
        res.sendResponse(body);
      };
      next();
    }
  });
};

module.exports = cacheMiddleware;