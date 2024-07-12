const sequelize = require('../config/database');
const Author = require('./models/Author');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Loan = require('./models/Loan');
const Reservation = require('./models/Reservation');

// Associations
Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

Member.hasMany(Loan, { foreignKey: 'member_id' });
Loan.belongsTo(Member, { foreignKey: 'member_id' });

Book.hasMany(Loan, { foreignKey: 'book_id' });
Loan.belongsTo(Book, { foreignKey: 'book_id' });

Member.hasMany(Reservation, { foreignKey: 'member_id' });
Reservation.belongsTo(Member, { foreignKey: 'member_id' });

Book.hasMany(Reservation, { foreignKey: 'book_id' });
Reservation.belongsTo(Book, { foreignKey: 'book_id' });

sequelize.sync({ alter: true });

module.exports = {
  Author,
  Book,
  Member,
  Loan,
  Reservation
};
