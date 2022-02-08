const fs = require('fs');
var users = require('../data/user.json')
const PAGE_SIZE = 10;

module.exports = {
    query,
    getById,
    checkLogin,
    remove,
    add,
    update,
}

function query() {
    return Promise.resolve(users)
}

function checkLogin(credentials) {
    var user = users.find(user => user.username === credentials.username && user.password === credentials.password)
    
    if (user) {
        user = {...user}
        delete user.password
    }
    
    return Promise.resolve(user)
}
function getById(userId) {
    var user = users.find(user => user._id === userId)
    if (!user) return Promise.reject(`No such User ${userId}`)
    user = { ...user, bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor doloribus similique, eaque quos voluptatum quis alias earum. Omnis harum commodi similique voluptates impedit eum a rem voluptate, optio, aliquid velit!' }

    return Promise.resolve(user)
}

function remove(userId) {
    const userToRemove = users.find(user => user._id === userId)
    if (!userToRemove) return Promise.reject('User does not exist')
    users = users.filter(user => user._id !== userId)
    return _saveUsersToFile().then(()=>userId)
}

function add(user) {
    user._id = _makeId()
    users.unshift(user)
    return _saveUsersToFile().then(() => user)
}

function update(userToUpdate) {
    if (userToUpdate.price > 1000) return Promise.reject('price too high');
    users = users.map(user => (user._id === userToUpdate._id) ? userToUpdate : user);
    return _saveUsersToFile().then(() => userToUpdate)
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!');
                resolve()
            }
        });
    })

}