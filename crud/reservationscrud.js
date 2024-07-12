// controllers/reservationController.js
const Reservation = require('../models/reservations');

// Create a new reservation
async function createReservation(bookId, memberId, reservationDate) {
  try {
    const newReservation = await Reservation.create({
      book_id: bookId,
      member_id: memberId,
      reservation_date: reservationDate
    });
    console.log('Created new reservation:', newReservation.toJSON());
  } catch (error) {
    console.error('Error creating reservation:', error);
  }
}

// Retrieve all reservations
async function getAllReservations() {
  try {
    const reservations = await Reservation.findAll();
    console.table(reservations.map(reservation => reservation.toJSON()));
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
}

// Retrieve a reservation by ID
async function getReservationById(id) {
  try {
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      console.log('Reservation found:', reservation.toJSON());
    } else {
      console.log('Reservation not found');
    }
  } catch (error) {
    console.error('Error fetching reservation:', error);
  }
}

// Update a reservation by ID
async function updateReservation(id, newData) {
  try {
    const [updatedRows] = await Reservation.update(newData, {
      where: { id }
    });
    if (updatedRows > 0) {
      console.log('Reservation updated successfully');
    } else {
      console.log('No reservation found with the given ID');
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
  }
}

// Delete a reservation by ID
async function deleteReservationById(id) {
  try {
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      await reservation.destroy();
      console.log('Reservation deleted successfully');
    } else {
      console.log('Reservation not found');
    }
  } catch (error) {
    console.error('Error deleting reservation:', error);
  }
}

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservationById
};
