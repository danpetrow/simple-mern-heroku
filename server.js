const express = require('express');
const app = express();
require('dotenv').config()

//get and serve index.html
app.use(express.static('./public'))

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});