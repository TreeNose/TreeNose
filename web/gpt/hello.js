const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000; // You can change this port number if needed

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());


// Define a route that captures POST requests
app.post('/hello', (req, res) => {
  res.send('Hello, World');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
