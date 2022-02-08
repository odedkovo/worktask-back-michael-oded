const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    logIn,
    logOut,
    getLoggedinUser,
    signUp
}

function logIn(username, password='123') {
    return axios.post('/api/user/login', { username, password }).then(res => res.data)
        .then(_setLoggedinUser)
}

function logOut() {
    return axios.post('/api/user/logout').then(()=>_setLoggedinUser(null))
}

function signUp(user) {
    return axios.post('/api/user/signup', user).then((res)=> res.data)
    .then(_setLoggedinUser(user))
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    if (user && user.password) {
        user = {...user}
        delete user.password
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}