const User = require('../models/user');
const { comparePassword, hashPassword } = require("../middleware/authHelper");
const JWT = require("jsonwebtoken");
const { serialize } = require("cookie");

const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.name;
    console.log(searchTerm)
    const users = await User.find({ name: { $regex: new RegExp(searchTerm, 'i') } });
    // console.log(users)
    if (users.length === 0) {
      res.status(404).json({ message: "No user found with this pattern" });
    } else {
      res.status(200).json(users);
    }
    
  } catch (err) {
    console.error('Failed to search users:', err);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  searchUsers,
};
