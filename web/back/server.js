const express = require('express');
const cors = require('cors')
const jsParse = require('./tree-sitter-parse').parseJs
const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Handle get request on path /
app.get('/', (req, res) => {
res.send('Hello World!')
})

// Handle post request on path /submit-data
app.post('/submit-data', (req, res) => {
console.log('Received a POST request');
res.send("hello world <br> yes");
});

app.post('/get-tree-structure', (req, res) => {
    console.log('Received a POST request');
    const code = req.body.code
    res.send(jsParse(code));
    })

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
