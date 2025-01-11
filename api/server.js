// filepath: /c:/Users/James/Leaf_And_Luggage/leaf_and_luggage/api/server.js
const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});