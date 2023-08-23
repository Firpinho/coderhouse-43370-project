const loggedIn = (req, res, next) => {
    if(req.isAuthenticated()) next()
    else res.redirect('/login')
}

const notLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) next()
    else res.redirect('/')
}

module.exports = {loggedIn, notLoggedIn};