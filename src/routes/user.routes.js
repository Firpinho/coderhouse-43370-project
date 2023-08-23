const passport = require('passport')
const { Router } = require('express');
const { loggedIn, notLoggedIn } = require('../middlewares/loggedIn')
const { logged, logout } = require('../controllers/users.controllers')

const router = new Router();

router.post('/login', notLoggedIn, passport.authenticate('login'), logged)
      .post('/register', notLoggedIn, passport.authenticate('register'), logged)
      .get('/register-github', passport.authenticate('github', {scope: ['user:email']}))
      .get('/logout', loggedIn, logout)
      .get('/profile-github', (req, res) => {
            res.send('logged')
      })

module.exports = router;