// server.js

// Import required packages
const express = require('express');          // Express framework for server
const bodyParser = require('body-parser');   // To parse JSON bodies in requests
const dotenv = require('dotenv');            // To load environment variables from .env
const authRoutes = require('./routes/auth');  // import auth routes
const postsRoutes = require('./routes/posts');   // handles /api/posts (protected)


// Load environment variables from .env file
dotenv.config();

// Create an Express app instance
const app = express();

// Middleware: parse JSON requests
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);            // mount routes under /api/auth
app.use('/api', postsRoutes);

// Simple test route to check server is running
app.get('/', (req, res) => {
    res.send('📝 Personal Blog API is running!');
});

// Set the port from .env or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});