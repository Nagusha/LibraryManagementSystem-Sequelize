const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { Op } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed
const Member = require('../models/members.js');

// Middleware setup
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

// Create a new member with transaction
router.post('/', async (req, res) => {
    const { name, address, phone, email } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const newMember = await Member.create({
                name,
                address,
                phone,
                email
            }, { transaction: t });

            // Additional operations within the same transaction if needed

            return newMember;
        });

        res.status(201).json(result);
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

// Update a member by ID with transaction
router.put('/:id', async (req, res) => {
    const { name, address, phone, email } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const [updated] = await Member.update({
                name,
                address,
                phone,
                email
            }, { where: { id: req.params.id }, transaction: t });

            if (updated > 0) {
                const updatedMember = await Member.findByPk(req.params.id, { transaction: t });
                return updatedMember;
            } else {
                throw new Error('Member not found');
            }
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a member by ID with transaction
router.delete('/:id', async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const member = await Member.findByPk(req.params.id, { transaction: t });
            if (!member) {
                throw new Error('Member not found');
            }

            await member.destroy({ transaction: t });
            return { message: 'Member deleted successfully' };
        });

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
