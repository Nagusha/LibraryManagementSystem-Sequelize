const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Reservation = require('../models/reservations'); // Adjust the path as needed

// Get reservations by member ID
router.get('/byMember/:memberId', async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            where: { memberId: req.params.memberId }
        });
        if (reservations.length === 0) {
            return res.status(404).json({ message: "No Reservations Found for the Member" });
        }
        res.json({ Reservations: reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reservations by book ID
router.get('/byBook/:bookId', async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            where: { bookId: req.params.bookId }
        });
        if (reservations.length === 0) {
            return res.status(404).json({ message: "No Reservations Found for the Book" });
        }
        res.json({ Reservations: reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reservations within a date range
router.get('/byDateRange', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const reservations = await Reservation.findAll({
            where: {
                reservationDate: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        });
        if (reservations.length === 0) {
            return res.status(404).json({ message: "No Reservations Found in the Date Range" });
        }
        res.json({ Reservations: reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
