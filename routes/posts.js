// Import Express framework
const express = require('express');

// Create a new router object (like a mini-Express app just for routes)
const router = express.Router();

// Import our authentication middleware
// This will check if the user is logged in before allowing access
const authenticateToken = require('../middleware/authMiddleware');

// Import the controller function that handles creating a post
const { createPost } = require('../controllers/postController');

// Define the route for creating a new post
// 1. First, "authenticateToken" middleware runs
// 2. If the user has a valid JWT, then "createPost" runs
router.post('/posts', authenticateToken, createPost);

// Export the router so it can be used in server.js
module.exports = router;
