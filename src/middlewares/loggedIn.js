const config = require('../config')

const loggedIn = (req, res, next) => {
    if(req.isAuthenticated()) next()
    else if(config.NODE_ENV === 'test') next();
    else res.json({msg:"Unauthorized"})
}

const notLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) next()
    else res.redirect('/')
}

module.exports = {loggedIn, notLoggedIn};