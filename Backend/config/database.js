const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const DbName = 'myapp';
const MongoUrl = 'mongodb://127.0.0.1:27017/';
let db;

async function connection(){
    const conn = await MongoClient.connect(MongoUrl,{useUnifiedTopology: true});
    console.log('Connected to Database');
    db = conn.db(DbName);
}

module.exports = {
    connect: () => connection(),
    getDb: () => db,
};