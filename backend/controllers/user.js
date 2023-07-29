const User = require('../models/user');
const { comparePassword, hashPassword } = require("../middleware/authHelper");
const JWT = require("jsonwebtoken");
const { parse, serialize } = require("cookie");

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, contact, about, skills } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        name: name || user.name,
        contact: contact || user.contact,
        about: about || user.about,
        skills: skills || user.skills,
      },
      { new: true }
    );
    
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

exports.getUser = async (req, res) => {
  console.log('working');
  const { email } = req.params;
  console.log(email);
  
  try {
    if (!email) {
      return res.status(404).json({ success: false, message: "Email Undefined" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }

    return res.status(200).json({ success: true, user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error while fetching User", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userEmail = req.params.email;
    console.log(userEmail)
    const deletedUser = await User.findOneAndDelete({ email: userEmail });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
