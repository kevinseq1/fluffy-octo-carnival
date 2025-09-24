// models/db.js

const sqlite3 = require('sqlite3').verbose();  // Import sqlite3 package
const dotenv = require('dotenv');              // Import dotenv to read DB_PATH from .env

// Load environment variables from .env file
dotenv.config();

// Connect to SQLite database using path from .env
const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
    if (err) {
        console.error('❌ Could not connect to database', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
    }
});

// Export the db object so other files can use it
module.exports = db;
