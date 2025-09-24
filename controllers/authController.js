// controllers/authController.js

// Import database connection
const db = require('../models/db');

// Import bcrypt to hash passwords
const bcrypt = require('bcrypt');

// Import jsonwebtoken to create auth tokens
const jwt = require('jsonwebtoken');

// Import dotenv for JWT secret
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to handle user registration
const register = (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash password for privacy/security
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user into the database
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(query, [username, email, hashedPassword], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'User could not be created' });
        }
        res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
    });
};

// Function to handle user login
const login = (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user in database
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Server error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare input password with hashed password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username }, // payload
            process.env.JWT_SECRET,                  // secret key
            { expiresIn: '1h' }                      // token expiry
        );

        res.json({ message: 'Login successful', token });
    });
};


// Export the function to use in routes
module.exports = { register, login };