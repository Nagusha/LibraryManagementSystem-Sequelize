const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const Reservation = require('../models/reservations.js');

// Middleware function for logging
const logMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call next to pass control to the next middleware or route handler
};

// Apply middleware globally to the router
router.use(logMiddleware);

// Parse application/json
router.use(bodyParser.json());

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        if (reservations.length === 0) {
            return res.status(404).json({ message: "No Reservations Found" });
        }
        res.json({ Reservations: reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new reservation
router.post('/', async (req, res) => {
    try {
        const newReservation = await Reservation.create(req.body);
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get one reservation by ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation Not Found" });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a reservation
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Reservation.update(req.body, { where: { id: req.params.id } });
        if (updated > 0) {
            const updatedReservation = await Reservation.findByPk(req.params.id);
            res.json(updatedReservation);
        } else {
            res.status(404).json({ message: "Reservation Not Found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            await reservation.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    router
};
