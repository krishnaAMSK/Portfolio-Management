const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(session({
    secret: 'portfolio',
    resave: false,
    saveUninitialized: true,
}));

const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const searchRouter = require('./routes/search');

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/projects', projectsRouter);
app.use('/search', searchRouter);

const { connect } = require('./config/database');

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
