const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

// Express App Config

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

//sss


const cookieParser = require('cookie-parser');
const marketService = require('./services/marketService');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

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

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
http.listen(port, () => {
console.log('server is running on 3030')
})