// models/Loan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const Member = require('./members');

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id'
    }
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'id'
    }
  },
  loan_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Loan',
  timestamps: false
});

module.exports = Loan;
