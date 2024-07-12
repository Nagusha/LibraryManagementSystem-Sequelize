/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//import { DataTypes } from "sequelize";
//import sequelize from "../config/database";

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  birth_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nationality: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Author',

});

module.exports = Author;
//export default Author;
*/
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Author extends Model {}

Author.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_year: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Author',
});

module.exports = Author;
