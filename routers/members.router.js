const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const Member = require('../models/members.js');

// Middleware function for logging
const logMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call next to pass control to the next middleware or route handler
};

// Applying middleware globally to the router
router.use(logMiddleware);

// Parse application/json
router.use(bodyParser.json());

// Get all members
router.get('/', async (req, res) => {
    try {
        const members = await Member.findAll();
        if (members.length === 0) {
            return res.status(404).json({ message: "No Members Found" });
        }
        res.json({ members });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new member
router.post('/', async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get one member by ID
router.get('/:id', async (req, res) => {
    try {
        const member = await Member.findByPk(req.params.id);
        if (!member) {
            return res.status(404).json({ message: "Member Not Found" });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a member by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Member.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ message: "Member Not Found" });
        }
        const updatedMember = await Member.findByPk(req.params.id);
        res.json(updatedMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a member by ID
router.delete('/:id', async (req, res) => {
    try {
        const member = await Member.findByPk(req.params.id);
        if (!member) {
            return res.status(404).json({ message: "Member Not Found" });
        }
        await member.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    router
};
