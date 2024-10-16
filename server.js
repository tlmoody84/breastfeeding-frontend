require('dotenv').config();

const express = require('express');
const next = require('next');
const cors = require('cors');
const path = require('path');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

// Enable CORS for your API routes
server.use(cors({
  origin: ['http://localhost:4001'], // Adjust origins as needed
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
server.use(express.json());

// Example API route
server.get('/api/feeds', (req, res) => {
  res.json([{ id: 1, content: 'Feed content 1' }, { id: 2, content: 'Feed content 2' }]);
});

// Handle all other requests with Next.js
server.all('*', (req, res) => {
  return handle(req, res);
});


// Route to fetch questions
router.get('/questions', async (req, res) => {
    // Logic to fetch questions from the database
});

// Route to submit a new question
router.post('/questions', async (req, res) => {
    // Logic to add a new question to the database
});

module.exports = router;



// Start the server
const PORT = process.env.PORT || 4000; // Set your desired port
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});