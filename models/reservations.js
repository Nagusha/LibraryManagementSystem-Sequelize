/*const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//import { DataTypes } from "sequelize";
//import sequelize from "../config/database";

const Reservations = sequelize.define('Reservations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservation_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Reservations',
  timestamps: false
});

module.exports = Reservations;
*/
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Reservation extends Model {}

Reservation.init({
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Reservation',
});

module.exports = Reservation;

