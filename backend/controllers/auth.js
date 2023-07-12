const User = require('../models/user');
const { comparePassword, hashPassword } = require("../middleware/authHelper");
const JWT = require("jsonwebtoken");
const { serialize } = require("cookie");

const secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 , // 1 day
        email: email,
      },
      secret
    );

    // const serialised = serialize("Token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== "development",
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 24 * 30,
    //   path: "/",
      
    // });

    // res.set("Access-Control-Expose-Headers", "Set-Cookie");
    // res.set("Set-Cookie", serialised);
    res.status(200).json({ success: true, message: "Success!", user: user, token: token });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, contact, admin} = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!contact) {
      return res.send({ message: "Phone no is Required" });
    }
    const role = admin === true || admin === 'true';;

    const exisitingUser = await User.findOne({ email:email });

    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name: name,
      email: email,
      contact: contact,
      password: hashedPassword,
      role: role
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    const user = await User.findOne({ email:email });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    const user = await User.findOne({ email:email });
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and minimum 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
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
