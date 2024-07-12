const express = require('express');
const router = express.Router();
const Member = require('../models/members'); // Adjust the path as needed

// Query members by name
router.get('/name/:name', async (req, res) => {
    try {
        const members = await Member.findAll({ where: { name: req.params.name } });
        if (members.length === 0) {
            return res.status(404).json({ message: "No Members Found with this Name" });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Query members by address
router.get('/address/:address', async (req, res) => {
    try {
        const members = await Member.findAll({ where: { address: req.params.address } });
        if (members.length === 0) {
            return res.status(404).json({ message: "No Members Found with this Address" });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Query members by email
router.get('/email/:email', async (req, res) => {
    try {
        const members = await Member.findAll({ where: { email: req.params.email } });
        if (members.length === 0) {
            return res.status(404).json({ message: "No Members Found with this Email" });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
