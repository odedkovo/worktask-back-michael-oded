const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const marketService = require('./services/marketService');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
    secret: 'some secret token',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/api/market', (req, res) => {
  marketService.query().then((users) => {
    res.send(users);
  });
});

app.post('/api/market', (req, res) => {
  const user = req.body;
  marketService.add(user).then((savedUserId) => {
    res.send(`${savedUserId}`);
  });
});

app.put('/api/market/:userId', (req, res) => {
  const user = req.body;
  marketService.update(user).then((updatedUser) => {
    res.send(updatedUser);
  });
});

app.get('/api/market/:userId', (req, res) => {
  const {userId} = req.params
  marketService
    .getById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send('id not found');
    });
});

app.delete('/api/market/:id', (req, res) => {
  const userId = req.params.id;
  marketService.remove(userId).then(() => {
    res.send('you removed a user');
  }).catch(err => {err})
});


app.listen(3030, () => console.log('Server listening on port 3030!'));
