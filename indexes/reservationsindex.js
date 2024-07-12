const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Reservation extends Model {}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Members', // Assuming there's a Member model
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Books', // Assuming there's a Book model
            key: 'id'
        }
    },
    reservationDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Reservation',
    indexes: [
        {
            fields: ['memberId', 'bookId'] // Composite index on memberId and bookId
        },
        {
            fields: ['reservationDate'] // Index on reservationDate
        }
    ]
});

module.exports = Reservation;

