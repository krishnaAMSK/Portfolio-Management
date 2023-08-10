const User = require('../models/user');
const { comparePassword, hashPassword } = require("../middleware/authHelper");
const JWT = require("jsonwebtoken");
const { serialize } = require("cookie");
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');

// const secret = process.env.JWT_SECRET;

const generateForgotPasswordEmailContent = (name, email, otp) => {
  let mailSubject = 'Forgot Password - OTP';
  let content = `<p>Hi ${name}, your OTP for password reset is: ${otp}</p>`;
  return { mailSubject, content };
};

const sendMail = async (email, mailSubject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "egoist042@gmail.com",
        pass: "yoojbjjvljuhjjmp",
      },
    });

    const mailOptions = {
      from: "egoist042@gmail.com",
      to: email,
      subject: mailSubject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending email:', error);
    throw error;
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.status(400).send({
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
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "35s",
    });
    
    console.log("Generated Token\n", token);
  
    if (user && user._id && req.cookies && typeof req.cookies === 'object' && req.cookies[`${user._id}`]) {
      req.cookies[`${user._id}`] = "";
    }
    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ success: true, message: "Successfully Logged In", user: user, token });

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
    const acceptableRoles = ["user", "admin", "moderator"];
    const { username, email, password, contact, role} = req.body;
    if (!username) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    const exisitingUser = await User.findOne({ email:email });
    let userRole = role;

    if (!role || !acceptableRoles.includes(role)) {
      userRole = "user";
    }
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name: username,
      email: email,
      contact: contact,
      password: hashedPassword,
      role: userRole
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

exports.logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  JWT.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.sendOTP = async (req, res) => {
  try {
    console.log('In OTP Controller')
    const { email } = req.body;
    if (!email) {
      console.log('baka')
      return res.status(200).json({ success:false, message: 'Email is required.' });
    }
    const user = await User.findOne({ email:email });
    if (!user) {
      console.log('baka')
      return res.status(200).json({ success:false, message: 'User not found.' });
    }
    console.log('valid user')
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });
    user.otp = otp;
    await user.save();
    const { mailSubject, content } = generateForgotPasswordEmailContent(user.name, user.email, otp);
    await sendMail(user.email, mailSubject, content);
    console.log('OTP sent to the user');
    return res.status(200).json({ success:true, message: 'An OTP has been sent to your email.' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success:false, message: 'An error occurred while sending the OTP.' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { otp, password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const user = await User.findOne({ otp:otp });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.otp = ''; 
    await user.save();
    return res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  JWT.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

exports.refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  JWT.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};



