const { getDb } = require('../config/database');
const User = require('../models/user');

exports.loginPage = (req, res) => {
    res.render('login', { showPopup: false });
  };
  
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (user && user.password === password) {
            req.session.loggedIn = true;
            req.session.user = user;
            res.redirect('/');
        } 
        else {
            res.render('login', { error: 'Invalid email or password', showPopup: true });
        }
    } 
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
  
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
        await User.save(user);
        res.redirect('/login');
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
  };
  
  exports.isAdmin = (req, res, next) => {
    const userRole = req.session.user && req.session.user.role;
    if(userRole === 'admin') next();
    else res.sendStatus(403);
  };

  exports.logout = (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;
    res.redirect('/');
  };
  