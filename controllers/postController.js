// Import the database connection
const db = require('../models/db');

// Controller function to handle creating a new post
const createPost = (req, res) => {
    // Extract post data from request body
    const { title, content } = req.body;

    // Make sure title and content are provided
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    // Get user ID from the request (set by authMiddleware)
    const userId = req.user.id;

    // Insert the post into the database
    const query = `INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)`;
    db.run(query, [userId, title, content], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error creating post' });
        }

        // Respond with the new post ID
        res.status(201).json({
            message: 'Post created successfully',
            postId: this.lastID, // SQLite provides the ID of the inserted row
        });
    });
};

// Export the controller
module.exports = { createPost };
