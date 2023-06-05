const { getDb } = require('../config/database');

const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const db = getDb();
    const regex = new RegExp(searchTerm, 'i');
    const users = await db.collection('users').find({ name: { $regex: regex } }).toArray();

    res.render('main', { users, searchTerm });
  } catch (err) {
    console.error('Failed to search users:', err);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  searchUsers,
};
