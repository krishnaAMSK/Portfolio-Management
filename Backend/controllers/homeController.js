const { getDb } = require('../config/database');
const User = require('../models/user');

exports.homePage = async (req, res) => {
  try {
    const db = getDb();
    const comments = await db.collection('comments').find().toArray();
    const loggedIn = req.isAuthenticated(); 
    
    const users = await db.collection('users').find().toArray();
    const userIdMap = {};
    users.forEach(user => {
      userIdMap[user._id.toString()] = user;
    });

    const user = req.user; 
    const isAdmin = user && user.role === 'admin';

    res.render('home', { user, comments, loggedIn, isAdmin, userIdMap });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

  
exports.addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const db = getDb();
        const userId = req.user._id; 
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
  