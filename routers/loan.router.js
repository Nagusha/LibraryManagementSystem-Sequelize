const express = require('express');
const loanrouter = express.Router();
const bodyParser = require("body-parser");
const Loan = require('../models/loan.js');

// Middleware function for logging
const logMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call next to pass control to the next middleware or route handler
};

// Applying middleware globally to the router
loanrouter.use(logMiddleware);

// Parse application/json
loanrouter.use(bodyParser.json());

// Get all loans
loanrouter.get('/', async (req, res) => {
    try {
        const loans = await Loan.findAll();
        if (loans.length === 0) {
            return res.status(404).json({ message: "No Loan Found" });
        }
        res.json({ Loans: loans });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new loan
loanrouter.post('/', async (req, res) => {
    try {
        const loan = await Loan.create(req.body);
        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get one loan
loanrouter.get('/:id', async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: "Loan Not Found" });
        }
        res.json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a loan
loanrouter.put('/:id', async (req, res) => {
    try {
        const [updated] = await Loan.update(req.body, { where: { id: req.params.id } });
        if (updated > 0) {
            const updatedLoan = await Loan.findByPk(req.params.id);
            res.json(updatedLoan);
        } else {
            res.status(404).json({ message: "Loan Not Found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a loan
loanrouter.delete('/:id', async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        await loan.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = loanrouter;
