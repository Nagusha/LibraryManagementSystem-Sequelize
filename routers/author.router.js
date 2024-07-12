const express = require('express');
const authorRouter = express.Router();
const Author = require('../models/author'); // Adjusted the path to the Author model

// Example of middleware function for logging
const logMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Call next to pass control to the next middleware or route handler
};

// Applying middleware globally to the router
authorRouter.use(logMiddleware);

// Get all authors
authorRouter.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    if (authors.length === 0) {
      return res.status(404).json({ message: "No Author Found" });
    }
    res.json({ Authors: authors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new author
authorRouter.post('/', async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get one author
authorRouter.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author === null) {
      return res.status(404).json({ message: "Author Not Found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an author
authorRouter.put('/:id', async (req, res) => {
  try {
    const [updated] = await Author.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedAuthor = await Author.findByPk(req.params.id);
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ message: "Author Not Found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an author
authorRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await Author.findByPk(req.params.id);
    if (deleted) {
      await author.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Author Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = authorRouter;
