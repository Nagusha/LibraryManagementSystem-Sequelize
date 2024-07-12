
// controllers/bookController.js
const Book = require('../models/book');

// Create a new book
async function createBook(title, authorId, genre, isbn, publicationYear) {
  try {
    const newBook = await Book.create({
      title,
      authorId,
      genre,
      isbn,
      publication_year: publicationYear // Match field name with database column
    });
    console.log('Created new book:', newBook.toJSON());
  } catch (error) {
    console.error('Error creating book:', error);
  }
}

// Retrieve all books
async function getAllBooks() {
  try {
    const books = await Book.findAll();
    console.table(books.map(book => book.toJSON()));
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Retrieve a book by ID
async function getBookById(id) {
  try {
    const book = await Book.findByPk(id);
    if (book) {
      console.log('Book found:', book.toJSON());
    } else {
      console.log('Book not found');
    }
  } catch (error) {
    console.error('Error fetching book:', error);
  }
}

// Update a book by ID
async function updateBook(id, newData) {
  try {
    const [updatedRows] = await Book.update(newData, {
      where: { id }
    });
    if (updatedRows > 0) {
      console.log('Book updated successfully');
    } else {
      console.log('No book found with the given ID');
    }
  } catch (error) {
    console.error('Error updating book:', error);
  }
}

// Delete a book by ID
async function deleteBookById(id) {
  try {
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();
      console.log('Book deleted successfully');
    } else {
      console.log('Book not found');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBookById
};
