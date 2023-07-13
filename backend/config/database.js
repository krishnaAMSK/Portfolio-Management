const mongoose = require('mongoose');

const dbName = 'myapp';
const mongoUrl = 'mongodb://127.0.0.1:27017/' + dbName;
let db;

const connect = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    db = conn.connection;
    console.log(`Connected to MongoDB database: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB connection: ${error}`);
  }
};

module.exports = {
  connect: connect,
  getDb: () => db,
};
