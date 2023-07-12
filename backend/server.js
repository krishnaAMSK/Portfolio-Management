const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/project');
// const homeRouter = require('./routes/home');
// const searchRouter = require('./routes/search');
// const chatRouter = require('./routes/chat');

const app = express();
const port =  process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRouter);
app.use('/project', projectsRouter);
// app.use('/', homeRouter);

// app.use('/search', searchRouter);
// app.use('/chat', chatRouter);

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
