
const express = require('express');
const User = require('../models/user');

const router = express.Router();

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: 'Error retrieving users' });
      }
    };

// createUser
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide name and email' });
  }
  const user = new User({ name, email });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
};
// getUser
exports.getUser = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving user' });
    }
  };

  // updateUser
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const { name, email } = req.body;
      if (!name && !email) {
      return res.status(400).json({ message: 'Please provide a name or an email' });
    }
      const update = { name, email };
  
    try {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, update, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: 'Error updating user' });
    }
  };

  // deleteUser
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findOneAndDelete({ _id: id });
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  };


