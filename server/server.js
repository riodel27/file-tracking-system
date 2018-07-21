const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { User } = require('./components/users/index');

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.warn(log);
  next();
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home.hbs', {});
});

app.post('/users', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email
    });
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// login page

app.listen(3000, () => {
  console.warn('App listening on port 3000');
});

module.exports = { app };
