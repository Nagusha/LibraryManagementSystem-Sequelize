// routes/queryRoutes.js
const express = require('express');
const router = express.Router();
const { Author } = require('../models/author.js');

// Middleware to handle async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all authors
router.get('/authors', asyncHandler(async (req, res) => {
  const allAuthors = await Author.findAll();
  res.json(allAuthors);
}));

// Find authors from a specific nationality
router.get('/authors/nationality/:nationality', asyncHandler(async (req, res) => {
  const nationality = req.params.nationality;
  const authors = await Author.findAll({
    where: { nationality }
  });
  res.json(authors);
}));

// Delete an author by name
router.delete('/authors/name/:name', asyncHandler(async (req, res) => {
  const name = req.params.name;
  const authorToDelete = await Author.findOne({
    where: { name }
  });
  if (authorToDelete) {
    await authorToDelete.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
}));

module.exports = router;

