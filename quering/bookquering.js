const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Adjust the path as needed

// Query books by genre
router.get('/genre/:genre', async (req, res) => {
    try {
        const books = await Book.findAll({ where: { genre: req.params.genre } });
        if (books.length === 0) {
            return res.status(404).json({ message: "No Books Found in this Genre" });
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Query books by publication year
router.get('/year/:year', async (req, res) => {
    try {
        const books = await Book.findAll({ where: { publicationYear: req.params.year } });
        if (books.length === 0) {
            return res.status(404).json({ message: "No Books Found Published in this Year" });
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Query books by author
router.get('/author/:authorId', async (req, res) => {
    try {
        const books = await Book.findAll({ where: { authorId: req.params.authorId } });
        if (books.length === 0) {
            return res.status(404).json({ message: "No Books Found for this Author" });
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
