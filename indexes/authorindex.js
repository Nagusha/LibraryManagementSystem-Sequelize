const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Author extends Model {}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Author',
    indexes: [
        {
            unique: true,
            fields: ['name'] // Create a unique index on the name column
        },
        {
            fields: ['name'] // Create a non-unique index on the name column
        }
    ]
});

module.exports = Author;

/*
const Author = require('./models/author');

(async () => {
    await sequelize.sync({ force: true }); // This creates the table and applies indexes

    try {
        const author = await Author.create({
            name: 'M.Nagusha',
            bio: 'software Engineering',
        });
        console.log('Author created:', author.toJSON());
    } catch (error) {
        console.error('Error creating author:', error);
    }
})();
*/