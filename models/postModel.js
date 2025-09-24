// models/postModel.js

// Import the database connection
const db = require('./db');

// Create the posts table if it doesn't exist
db.run(`
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    -- unique ID for each post
    user_id INTEGER NOT NULL,                -- ID of the user who created the post
    title TEXT NOT NULL,                     -- title of the blog post
    content TEXT NOT NULL,                   -- body content of the blog post
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- timestamp when post is created
    FOREIGN KEY (user_id) REFERENCES users(id)     -- link to users table
)
`, (err) => {
    if (err) {
        console.error('❌ Error creating posts table', err.message);
    } else {
        console.log('✅ Posts table created or already exists');
    }
});
