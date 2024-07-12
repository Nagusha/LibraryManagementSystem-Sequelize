// controllers/loanController.js
const Loan = require('../models/loan');

// Create a new loan
async function createLoan(bookId, memberId, loanDate, dueDate) {
  try {
    const newLoan = await Loan.create({
      book_id: bookId,
      member_id: memberId,
      loan_date: loanDate,
      due_date: dueDate
    });
    console.log('Created new loan:', newLoan.toJSON());
  } catch (error) {
    console.error('Error creating loan:', error);
  }
}

// Retrieve all loans
async function getAllLoans() {
  try {
    const loans = await Loan.findAll();
    console.table(loans.map(loan => loan.toJSON()));
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
}

// Retrieve a loan by ID
async function getLoanById(id) {
  try {
    const loan = await Loan.findByPk(id);
    if (loan) {
      console.log('Loan found:', loan.toJSON());
    } else {
      console.log('Loan not found');
    }
  } catch (error) {
    console.error('Error fetching loan:', error);
  }
}

// Update a loan by ID
async function updateLoan(id, newData) {
  try {
    const [updatedRows] = await Loan.update(newData, {
      where: { id }
    });
    if (updatedRows > 0) {
      console.log('Loan updated successfully');
    } else {
      console.log('No loan found with the given ID');
    }
  } catch (error) {
    console.error('Error updating loan:', error);
  }
}

// Delete a loan by ID
async function deleteLoanById(id) {
  try {
    const loan = await Loan.findByPk(id);
    if (loan) {
      await loan.destroy();
      console.log('Loan deleted successfully');
    } else {
      console.log('Loan not found');
    }
  } catch (error) {
    console.error('Error deleting loan:', error);
  }
}

module.exports = {
  createLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoanById
};
