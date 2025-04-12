const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

// GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello This is Philosophy Forum!' });
});

// POST endpoint
app.post('/api/data', (req, res) => {
  const { name, age } = req.body;
  res.json({
    message: 'Data received successfully!',
    data: {
      name,
      age
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
