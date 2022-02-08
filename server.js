const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bugService = require('./services/BugService');
// const bugService = require('./services/bug.service');
const userService = require('./services/user.service');
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

app.get('/api/bug', (req, res) => {
  bugService.query().then((bugs) => {
    res.send(bugs);
  });
});

app.post('/api/bug', (req, res) => {
  const bug = req.body;
//  const {loggedinUser} = req.session;
//   if (loggedinUser) {
//     bug.creator = { ...loggedinUser };
//   }
//   if (!bug.creator) {
//     return res.status(401).send('PLEASE LOG IN');
//   }
  bugService.add(bug).then((savedBugId) => {
    res.send(`${savedBugId}`);
  });
});

app.put('/api/bug/:bugId', (req, res) => {
  const bug = req.body;
  // const {loggedinUser} = req.session;
  // console.log(loggedinUser, bug);
  // if (!loggedinUser) return res.status(401).send('PLEASE LOG IN');
  bugService.update(bug).then((updatedBug) => {
    res.send(updatedBug);
  });
});

app.get('/api/bug/:bugId', (req, res) => {
  const {bugId} = req.params
  bugService
    .getById(bugId)
    .then((bug) => {
      res.send(bug);
    })
    .catch((err) => {
      res.status(404).send('id dont found');
    });
});

app.delete('/api/bug/:id', (req, res) => {
  const bugId = req.params.id;
  // const {loggedinUser} = req.session;
  //   if (!loggedinUser) return res.status(403).send('LogIn first')
  bugService.remove(bugId).then(() => {
    res.send('you removed a bug');
  }).catch(err => {err})
});

app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;
    userService.checkLogin({ username, password })
      .then(user => {
        if (user) {
          req.session.loggedinUser = user
          console.log('Save user to session');
          res.send(user)
        } else {
          res.status(401).send('Invalid username / password')
        }
      })
  });
  

app.post('/api/user/logout', (req, res) => {
        req.session.destroy();
        res.end(('you logged out')
)});
;

app.post('/api/user/signup', (req, res) => {
    const user = req.body;
    console.log(user);
    userService.add(user).then((user) =>{ 
        req.session.loggedinUser = user;
        res.send(user)})
})

app.delete('/api/user/:id', (req, res) => {
const userId = req.params.id;
userService.remove(userId).then((id)=> res.send(`UserID ${id} Deleted`))
.catch((err) => res.status(404).send(`[error] ,${err}`))
}) 

app.get('/api/user', (req, res) => {
    userService.query().then((users) => res.send(users))
})

app.listen(3030, () => console.log('Server listening on port 3030!'));
