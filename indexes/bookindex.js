const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Book extends Model {}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING
    },
    isbn: {
        type: DataTypes.STRING,
        unique: true
    },
    publicationYear: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Book',
    indexes: [
        {
            unique: true,
            fields: ['isbn'] // Create a unique index on the ISBN column
        },
        {
            fields: ['title'] // Create a non-unique index on the title column
        },
        {
            fields: ['authorId'] // Create a non-unique index on the authorId column
        },
        {
            fields: ['genre'] // Create a non-unique index on the genre column
        },
        {
            fields: ['publicationYear'] // Create a non-unique index on the publicationYear column
        }
    ]
});

module.exports = Book;

/*
const Book = require('./models/book');

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
*/