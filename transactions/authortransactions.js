const express = require('express');
const authorrouter = express.Router(); // Create a new router instance

const sequelize = require('../config/database');
const Author = require('../models/author');

// Define your transaction routes here

// Example: Create a new author with transaction
authorrouter.post('/create', async (req, res) => {
    const { name, bio } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const newAuthor = await Author.create({
                name,
                bio
            }, { transaction: t });

            return newAuthor;
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Example: Update an author with transaction
authorrouter.put('/:id', async (req, res) => {
    const { name, bio } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const [updated] = await Author.update({
                name,
                bio
            }, { where: { id: req.params.id }, transaction: t });

            if (updated > 0) {
                const updatedAuthor = await Author.findByPk(req.params.id, { transaction: t });
                return updatedAuthor;
            } else {
                throw new Error('Author not found');
            }
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Export the router instance so it can be used in other parts of your application
module.exports = authorrouter;
