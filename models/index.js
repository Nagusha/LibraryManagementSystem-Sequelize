const sequelize = require('../config/database');
const Author = require('./author');
const Book = require('./book');
const Loan = require('./loan');
const Members = require('./members');
const Reservations = require('./reservations');

Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

Loan.hasMany(Members, { foreignKey: 'loanId' });
Members.belongsTo(Loan, { foreignKey: 'loanId' });

Book.hasMany(Reservations, { foreignKey: 'bookId' });
Reservations.belongsTo(Book, { foreignKey: 'bookId' });

Loan.hasMany(Reservations, { foreignKey: 'loanId' });
Reservations.belongsTo(Loan, { foreignKey: 'loanId' });
//}


module.exports = {
    sequelize,
    Author,
    Book,
    Loan,
    Members,
    Reservations
};
