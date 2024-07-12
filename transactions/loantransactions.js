const express = require('express');
const Sequelize = require('../config/database');
const Loans = require('../models/loan');
const Reservation = require('../models/reservations')
const router = express.Router();
const { Op } = require('sequelize');


router.get('/:id/:member_id', async (req, res) => {
    try {
        const books_id = parseInt(req.params.id);
        const members_id = parseInt(req.params.member_id);

        // Ensure the values are integers and not NaN
        if (isNaN(books_id) || isNaN(members_id)) {
            return res.status(400).json({ message: "Invalid book or member ID" });
        }

        const reservation = await Reservation.findOne({
            where: {
                member_id: members_id,
                book_id: books_id
            }
        });

        if (!reservation) {
            return res.status(404).json({ message: "No reservation found for this book by this person" });
        }

        // Start a transaction
        const result = await Sequelize.transaction(async (t) => {
            // Create a loan record
            await Loans.create({
                member_id: members_id,
                book_id: books_id,
                loan_date: new Date(), // Adjust as necessary
                due_date: new Date(new Date().setDate(new Date().getDate() + 14)) // Example: 2 weeks from now
            }, { transaction: t });
            

            // Delete the reservation
            await Reservation.destroy({
                where: {
                    [Op.and]:
                   [ {member_id: members_id},
                    {book_id: books_id}]
                }
            }, { transaction: t });
        });

        res.status(200).json({
                message: "Loan created and reservation deleted successfully",
                reservation: Reservation,
                loan: Loans
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;