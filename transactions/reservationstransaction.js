const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { Op } = require('sequelize');
//const sequelize = require('../config/database'); // Adjust path as needed
//const Reservation = require('../models/reservations.js');

// Middleware setup
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

// Create a new reservation with transaction
router.post('/', async (req, res) => {
    const { memberId, bookId, reservationDate } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const newReservation = await Reservation.create({
                memberId,
                bookId,
                reservationDate
            }, { transaction: t });

            // Additional operations within the same transaction if needed

            return newReservation;
        });

        res.status(201).json(result);
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

// Update a reservation with transaction
router.put('/:id', async (req, res) => {
    const { memberId, bookId, reservationDate } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const [updated] = await Reservation.update({
                memberId,
                bookId,
                reservationDate
            }, { where: { id: req.params.id }, transaction: t });

            if (updated > 0) {
                const updatedReservation = await Reservation.findByPk(req.params.id, { transaction: t });
                return updatedReservation;
            } else {
                throw new Error('Reservation not found');
            }
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a reservation with transaction
router.delete('/:id', async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const reservation = await Reservation.findByPk(req.params.id, { transaction: t });
            if (!reservation) {
                throw new Error('Reservation not found');
            }

            await reservation.destroy({ transaction: t });
            return { message: 'Reservation deleted successfully' };
        });

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
