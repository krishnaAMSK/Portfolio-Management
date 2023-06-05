const { getDb } = require('../config/database');
const User = require('../models/user');

exports.homePage = async (req, res) => {
    try {
        const db = getDb();
        const comments = await db.collection('comments').find().toArray();
        const loggedIn = req.session.loggedIn || false;
    
        const users = await db.collection('users').find().toArray();
        const userIdMap = {};
        users.forEach(user => {
          userIdMap[user._id.toString()] = user;
        });
    
        const userEmail = req.session.user && req.session.user.email;
        const userRole = userEmail ? await User.getRole(userEmail) : null;
        const isAdmin = userRole === 'admin';
        const user = req.session.user;
    
        res.render('home', { user, comments, loggedIn, userIdMap, isAdmin });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
};
  
exports.addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const db = getDb();
        const userId = req.session.user._id; 
        const user = await db.collection('users').findOne({ _id: userId });
        console.log(userId);
        await db.collection('comments').insertOne({ text: comment, userId: userId });
    
        res.redirect('/');
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
};

exports.deleteComments = async (req, res) => {
    try {
        const db = getDb();
        await db.collection('comments').deleteMany();
    
        res.redirect('/');
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
};
  