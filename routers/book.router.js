const express = require('express');
const bookrouter = express.Router();
const bodyParser = require("body-parser");
const Book = require('../models/book.js');

// Middleware function for logging
const logMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call next to pass control to the next middleware or route handler
};

// Applying middleware globally to the router
bookrouter.use(logMiddleware);

// Parse application/json
bookrouter.use(bodyParser.json());

// Get all books
bookrouter.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        if (books.length === 0) {
            return res.status(404).json({ message: "No Book Found" });
        }
        res.json({ Books: books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new book
bookrouter.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get one book
bookrouter.get('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book === null) {
            return res.status(404).json({ message: "Book Not Found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a book
bookrouter.put('/:id', async (req, res) => {
    try {
        const [updated] = await Book.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedBook = await Book.findByPk(req.params.id);
            return res.status(200).json(updatedBook);
        }
        throw new Error('Book not found');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a book
bookrouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await Book.findByPk(req.params.id);
        if (deleted) {
            await deleted.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = bookrouter;
