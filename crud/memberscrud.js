
const Member = require('../models/members');

// Create a new member
async function createMember(name, address, phoneNumber, email) {
  try {
    const newMember = await Member.create({
      name,
      address,
      phone_number: phoneNumber,
      email
    });
    console.log('Created new member:', newMember.toJSON());
  } catch (error) {
    console.error('Error creating member:', error);
  }
}

// Retrieve all members
async function getAllMembers() {
  try {
    const members = await Member.findAll();
    console.table(members.map(member => member.toJSON()));
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

// Retrieve a member by ID
async function getMemberById(id) {
  try {
    const member = await Member.findByPk(id);
    if (member) {
      console.log('Member found:', member.toJSON());
    } else {
      console.log('Member not found');
    }
  } catch (error) {
    console.error('Error fetching member:', error);
  }
}

// Update a member by ID
async function updateMember(id, newData) {
  try {
    const [updatedRows] = await Member.update(newData, {
      where: { id }
    });
    if (updatedRows > 0) {
      console.log('Member updated successfully');
    } else {
      console.log('No member found with the given ID');
    }
  } catch (error) {
    console.error('Error updating member:', error);
  }
}

// Delete a member by ID
async function deleteMemberById(id) {
  try {
    const member = await Member.findByPk(id);
    if (member) {
      await member.destroy();
      console.log('Member deleted successfully');
    } else {
      console.log('Member not found');
    }
  } catch (error) {
    console.error('Error deleting member:', error);
  }
}

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMemberById
};
