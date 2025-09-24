// routes/auth.js

// Import Express
const express = require('express');
const router = express.Router();  // Create a router instance

// Import the auth controller
const { register, login } = require('../controllers/authController');

// Route: POST /register
// Handles new user registration
router.post('/register', register);
router.post('/login', login);

// Export the router
module.exports = router;
