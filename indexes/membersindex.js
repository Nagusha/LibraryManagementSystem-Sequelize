const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Member extends Model {}

Member.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensuring the phone number is unique
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensuring the email is unique
    }
}, {
    sequelize,
    modelName: 'Member',
    indexes: [
        {
            unique: true,
            fields: ['phone'] 
        },
        {
            unique: true,
            fields: ['email'] 
        },
        {
            fields: ['name'] 
        }
    ]
});

module.exports = Member;
/*
const Member = require('./models/member');

(async () => {
    await sequelize.sync({ force: true }); // This creates the table and applies indexes

    try {
        const member = await Member.create({
            name: 'John Doe',
            address: '123 Main St',
            phone: '555-1234',
            email: 'john@example.com'
        });
        console.log('Member created:', member.toJSON());
    } catch (error) {
        console.error('Error creating member:', error);
    }
})();
*/