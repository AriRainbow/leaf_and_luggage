// filepath: /src/app.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware to set caching headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '../public_html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});