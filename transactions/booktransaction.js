const express = require('express');
const bookrouter = express.Router();
const bodyParser = require("body-parser");
const { Op } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed
const Book = require('../models/book.js');

// Middleware setup
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

// Create a new book with transaction
bookrouter.post('/', async (req, res) => {
    const { title, author, genre } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const newBook = await Book.create({
                title,
                author,
                genre
            }, { transaction: t });

            // Additional operations within the same transaction if needed

            return newBook;
        });

        res.status(201).json(result);
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

// Update a book with transaction
bookrouter.put('/:id', async (req, res) => {
    const { title, author, genre } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const [updated] = await Book.update({
                title,
                author,
                genre
            }, { where: { id: req.params.id }, transaction: t });

            if (updated > 0) {
                const updatedBook = await Book.findByPk(req.params.id, { transaction: t });
                return updatedBook;
            } else {
                throw new Error('Book not found');
            }
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a book with transaction
bookrouter.delete('/:id', async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const book = await Book.findByPk(req.params.id, { transaction: t });
            if (!book) {
                throw new Error('Book not found');
            }

            await book.destroy({ transaction: t });
            return { message: 'Book deleted successfully' };
        });

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = bookrouter;
