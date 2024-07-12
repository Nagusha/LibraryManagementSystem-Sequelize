
//const { DataTypes } = require('sequelize');
//const { sequelize }= require('../config/database');
const { Author } = require('../models');


 async function createAuthor(author) {
  try {
    await Author.create(author); 
    console.log("Created Author successfully");
  } catch (error) {
    console.log("Error while creating author", error); 
  }
}

// Retrieving all authors data from Authors table
async function getAuthorsData() {
  try {
    const authors = await Author.findAll();
    console.table(authors.map(author => author.toJSON()));
    console.log("Retrieved data successfully");
  } catch (error) {
    console.log("Error while reading data", error); 
  }
}

// Retrieving specific author data from Authors table
async function getParticularAuthorData(condition) {
  try {
    const authors = await Author.findAll({
      attributes: ['id', ['name', 'Author Name']], // Retrieves specific attributes.
      where: condition 
    });
    console.table(authors.map(author => author.toJSON())); 
    console.log("Retrieved specific author data successfully");
  } catch (error) {
    console.log("Error while reading data", error); 
  }
}

// Updating Author data
async function updateAuthorData(condition, updatedata) {
  try {
    const [updatedRows] = await Author.update(updatedata, { where: condition }); 
    if (updatedRows > 0) {
      console.log("Updated author data successfully");
    } else {
      console.log("No author found with the given condition");
    }
  } catch (error) {
    console.log("Error while updating author data", error); 
}
}
// Deleting author by ID
async function deleteAuthorById(id) {
  try {
    const author = await Author.findByPk(id); 
    if (author) {
      await author.destroy(); 
      console.log("Author deleted successfully");
    } else {
      console.log("Author not found");
    }
  } catch (error) {
    console.log("Error while deleting author", error); 
  }
}

// Deleting records from Authors table who meet a particular condition
async function deleteAuthorByCondition(condition) {
  try {
    const deletedRows = await Author.destroy({
      where: condition 
    });
    if (deletedRows > 0) {
      console.log("Author(s) deleted successfully");
    } else {
      console.log("No author found with the given condition");
    }
  } catch (error) {
    console.log("Error while deleting author(s)", error); 
  }
}

module.exports = {
    createAuthor,
    getAuthorsData,
    getParticularAuthorData,
    updateAuthorData,
    deleteAuthorById,
    deleteAuthorByCondition
  };
  