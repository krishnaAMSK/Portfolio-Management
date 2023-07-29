const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect } = require('./config/database');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const Router = require('./routes/route');
const app = express();
const port =  process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['Set-Cookie'], 
}));

app.use('/', Router);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
