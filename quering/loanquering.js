const express = require('express');
const router = express.Router();
const Loan = require('../models/loan'); // Adjust the path as needed

// Query loans by member ID
router.get('/member/:memberId', async (req, res) => {
    try {
        const loans = await Loan.findAll({ where: { memberId: req.params.memberId } });
        if (loans.length === 0) {
            return res.status(404).json({ message: "No Loans Found for this Member" });
        }
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Query loans by book ID
router.get('/book/:bookId', async (req, res) => {
    try {
        const loans = await Loan.findAll({ where: { bookId: req.params.bookId } });
        if (loans.length === 0) {
            return res.status(404).json({ message: "No Loans Found for this Book" });
        }
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Query loans by due date
router.get('/duedate/:dueDate', async (req, res) => {
    try {
        const loans = await Loan.findAll({ where: { due_date: req.params.dueDate } });
        if (loans.length === 0) {
            return res.status(404).json({ message: "No Loans Found with this Due Date" });
        }
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
