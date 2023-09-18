const passport = require('passport')
const { Router } = require('express');
const { loggedIn, notLoggedIn } = require('../middlewares/loggedIn')
const { logged, logout, getCurrent } = require('../controllers/users.controllers')

const router = new Router();

router.post('/login', notLoggedIn, passport.authenticate('login'), logged)
      .post('/register', notLoggedIn, passport.authenticate('register'), logged)
      .get('/register-github', passport.authenticate('github', {scope: ['user:email']}))
      .get('/register-google', passport.authenticate('github', {scope: ['user:email']}))
      .get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), logged)
      .get('/logout', loggedIn, logout)
      .get('/current', loggedIn, getCurrent)

module.exports = router;