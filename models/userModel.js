// models/userModel.js

// Import the database connection
const db = require('./db');

// Create the users table if it doesn't exist
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- unique ID for each user
    username TEXT NOT NULL UNIQUE,         -- username, must be unique
    email TEXT NOT NULL UNIQUE,            -- email, must be unique
    password TEXT NOT NULL,                -- hashed password
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- timestamp when user is created
)
`, (err) => {
    if (err) {
        console.error('❌ Error creating users table', err.message);
    } else {
        console.log('✅ Users table created or already exists');
    }
});
