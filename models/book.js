const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publicationYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Book;
