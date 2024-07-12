const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Loan extends Model {}

Loan.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    loanDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Loan',
    indexes: [
        {
            unique: true,
            fields: ['memberId', 'bookId', 'loanDate'] 
        },
        {
            fields: ['memberId'] 
        },
        {
            fields: ['bookId'] 
        },
        {
            fields: ['dueDate'] 
        }
    ]
});

module.exports = Loan;

/*
const Loan = require('./models/loan');

(async () => {
    await sequelize.sync({ force: true }); // This creates the table and applies indexes

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
*/