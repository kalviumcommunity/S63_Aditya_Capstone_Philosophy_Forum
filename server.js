const express = require('express');
const app = express();
const port = 3000;

// GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello This is Philosophy Forum!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
