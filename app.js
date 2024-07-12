const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const authorRouter = require('./routers/author.router');
const bookRouter = require('./routers/book.router');
const loanRouter = require('./routers/loan.router');
const membersRouter = require('./routers/members.router');
const reservationsRouter = require('./routers/reservations.router');

const authorQueryRouter = require('./quering/authorquering');
const reservationQueryRouter = require('./quering/reservationsquering');
const bookQueryRouter = require('./quering/bookquering');
const membersQueryRouter = require('./quering/membersquering');
const loanQueryRouter = require('./quering/loanquering');

const { createAuthor, getAuthorsData, getParticularAuthorData, updateAuthorData, deleteAuthorById, deleteAuthorByCondition } = require('./crud/authorcrud');
const { createBook, getAllBooks, getBookById, updateBook, deleteBookById } = require('./crud/bookcrud');
const { createMember, getAllMembers, getMemberById, updateMember, deleteMemberById } = require('./crud/memberscrud');
const { createLoan, getAllLoans, getLoanById, updateLoan, deleteLoanById } = require('./crud/loancrud');
const { createReservation, getAllReservations, getReservationById, updateReservation, deleteReservationById } = require('./crud/reservationscrud');


const Author = require('./models/author');
const Book = require('./models/book');
const Loan = require('./models/loan');
const Member = require('./models/members');
const Reservation = require('./models/reservations');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


const logMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logMiddleware);


app.get('/api', (req, res) => {
  res.json({ info: 'index.js Express & Postgres CRUD REST API' });
});


/*const authorindex = require('./indexes/authorindex');
const bookindex = require('./indexes/bookindex');
const reservationsindex = require('./indexes/reservationsindex');
const loanIndex = require('./indexes/loanindex');
const membersindex = require('./indexes/membersindex');

const authorTransactions = require('./transactions/authortransactions');
const bookTransactions = require('./transactions/booktransaction');
const loanTransactions = require('./transactions/loantransactions');
const membersTransactions = require('./transactions/memberstransactions');
const reservationsTransactions = require('./transactions/reservationstransaction');
*/

app.use('/author', authorRouter);
app.use('/book', bookRouter);
app.use('/loan', loanRouter);
app.use('/members', membersRouter);
app.use('/reservations', reservationsRouter);

app.use('/transactions/author', require('./transactions/authortransactions'));
app.use('/transactions/loan', require('./transactions/loantransactions'));
app.use('/transactions/book', require('./transactions/booktransaction'));
app.use('/transactions/member', require('./transactions/memberstransactions'));
app.use('/transactions/author', require('./transactions/authortransactions'));
app.use('/transactions/reservations', require('./transactions/reservationstransaction'));

app.use('/indexes/authorindex', require('./indexes/authorindex'));
app.use('/indexes/bookindex', require('./indexes/bookindex'));
app.use('/indexes/membersindex', require('./indexes/membersindex'));
app.use('/indexes/loanindex', require('./indexes/loanindex'));
app.use('/indexes/reservationsindex', require('./indexes/reservationsindex'));

app.use('/quering/authorquering', authorQueryRouter);
app.use('/quering/reservationsquering', reservationQueryRouter);
app.use('/quering/bookquering', bookQueryRouter);
app.use('/quering/membersquering', membersQueryRouter);
app.use('/quering/loanquering', loanQueryRouter);

/*app.use('/transactions/loan', loanTransactions);
app.use('/transactions/book', bookTransactions);
app.use('/transactions/member', membersTransactions);
app.use('/transactions/author', authorTransactions);
app.use('/transactions/reservations', reservationsTransactions);
app.use ('/indexes/authorindex', authorindex);
app.use('/indexes/bookindex', bookindex);
*/
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

    (async () => {
      await sequelize.sync({ force: true }); // This creates the table and applies indexes
  
      try {
          const authorindex = await Author.create({
              name: 'J.K. Rowling',
              bio: 'British author, best known for the Harry Potter series.'
          });
          console.log('Author created:', author.toJSON());
      } catch (error) {
          console.error('Error creating author:', error);
      }
  })();
  (async () => {
    await sequelize.sync({ force: true }); // This creates the table and applies indexes

    try {
        const book = await Book.create({
            title: 'Harry Potter and the Philosopher\'s Stone',
            authorId: 1,
            genre: 'Fantasy',
            isbn: '9780747532699',
            publicationYear: 1997
        });
        console.log('Book created:', book.toJSON());
    } catch (error) {
        console.error('Error creating book:', error);
    }
})();
(async () => {
  await sequelize.sync({ force: true }); 

  try {
      const loan = await Loan.create({
          memberId: 1,
          bookId: 1,
          loanDate: new Date('2024-07-15'),
          dueDate: new Date('2024-08-15')
      });
      console.log('Loan created:', loan.toJSON());
  } catch (error) {
      console.error('Error creating loan:', error);
  }
})();

(async () => {
  await sequelize.sync({ force: true }); // This creates the table and applies indexes

  try {
      const member = await Member.create({
          name: 'Nagusha',
          address: '506164 Hanumankonda',
          phone: '8007654322',
          email: 'nagu@example.com'
      });
      console.log('Member created:', member.toJSON());
  } catch (error) {
      console.error('Error creating member:', error);
  }
})();

initializeApp();

async function initializeApp() {
  try {
    // Author CRUD operations
    await createAuthor({ name: "nagusha", bio: "Author bio" });
    await getAuthorsData();
    await getParticularAuthorData(1);  
    await updateAuthorData(1, { name: "Updated Nagusha", bio: "Updated bio" });  
    await deleteAuthorById(1);
    await deleteAuthorByCondition({ name: "Author Name" });

    // Book CRUD operations
    await createBook('Book Title', 1, 'Fiction', '9781234567890', 2023);
    await getAllBooks();
    await getBookById(1);
    await updateBook(1, { title: 'Updated Title', genre: 'Science Fiction' });
    await deleteBookById(1);
    
    // Member CRUD operations
    await createMember('Nagusha', '123 Main St', '555-1234', 'nagu@example.com');
    await getAllMembers();
    await getMemberById(1);
    await updateMember(1, { address: '456 Elm St' });
    await deleteMemberById(1);

    // Loan CRUD operations
    await createLoan(1, 1, new Date('2024-07-15'), new Date('2024-08-15'));
    await getAllLoans();
    await getLoanById(1);
    await updateLoan(1, { due_date: new Date('2024-09-15') });
    await deleteLoanById(1);

    // Reservation CRUD operations
    await createReservation(1, 1, new Date('2024-07-15'));
    await getAllReservations();
    await getReservationById(1);
    await updateReservation(1, { reservation_date: new Date('2024-08-15') });
    await deleteReservationById(1);
  
} catch (error) {
console.error('Unable to connect to the database:', error);
}
}