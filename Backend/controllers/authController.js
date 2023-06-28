const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.loginPage = (req, res) => {
  res.render('login', { showPopup: false });
};

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.registerPage = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  try {
    const { name, email, contact, password, isAdmin } = req.body;

    const isEmailUnique = await User.isEmailUnique(email);
    if (!isEmailUnique) {
      return res.render('register', { error: 'Email is already registered' });
    }

    const role = isAdmin ? 'admin' : 'user';
    const user = new User(name, email, contact, password, role);
    await user.hashPassword(); 
    await User.save(user);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    next();
  } else {
    res.sendStatus(403);
  }
};

exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

// yet to work on 

exports.forgotPasswordPage = (req, res) => {
  const message = req.query.message || ''; 
  res.render('forgot-password', { message });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.render('forgot-password', { error: 'Email address not found', showPopup: true });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    

    res.render('forgot-password', { message: 'Password reset email sent', showPopup: true });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};


exports.resetPasswordPage = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.render('reset-password', { error: 'Invalid or expired reset token' });
    }

    res.render('reset-password', { token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.render('reset-password', { error: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.hashPassword();
    await user.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};