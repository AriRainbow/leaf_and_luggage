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

// Handle root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});