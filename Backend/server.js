const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const passport = require('./config/passport');
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const projectsRouter = require('./routes/projects');
const searchRouter = require('./routes/search');
const chatRouter = require('./routes/chat');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(session({
  secret: 'portfolio',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);
app.use('/', loginRouter);
app.use('/projects', projectsRouter);
app.use('/search', searchRouter);
app.use('/chat', chatRouter);

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
