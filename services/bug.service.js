const fs = require('fs');
var bugs = require('../data/bug.json');

module.exports = {
  query,
  save,
  update,
  getById,
  remove,
};

function query() {
  return Promise.resolve(bugs);
}

function save(bug) {
  bug._id = _makeId();
  bug.createdAt = Date.now();
  bugs.unshift(bug);
  return _saveBugsToFile().then(() => bug);
}

function update(bugToUpdate, user) {
if (bugToUpdate.creator.nickname !== user.nickname) return Promise.reject('bugs can be updated by Admins or by his own creator only !')
  bugs = bugs.map((bug) => (bug._id === bugToUpdate._id ? bugToUpdate : bug));
  return _saveBugsToFile().then(() => bugToUpdate);
}

function getById(bugId) {
  var bug = bugs.find((bug) => bug._id === bugId);
  if (!bug) return Promise.reject('no bug with that id ');
  return Promise.resolve(bug);
}

function remove(bugId, user) {
  const bugToDelete = bugs.find((bug) => bug._id === bugId);
  if (bugToDelete.creator.nickname !== user.nickname) return res.status(401).send('PLEASE LOG IN');
  bugs = bugs.filter((bug) => bug._id !== bugId);
  return _saveBugsToFile();
}

function _saveBugsToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/bug.json', JSON.stringify(bugs, null, 2), (err) => {
      if (err) {
        console.log(err);
        reject('Cannot write to file');
      } else {
        console.log('Wrote Successfully!');
        resolve();
      }
    });
  });
}

function _makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
