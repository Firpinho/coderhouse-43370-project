const {Router} = require('express');
const {loggedIn, notLoggedIn} = require('../middlewares/loggedIn')

const router = new Router();

router.get('/login', notLoggedIn, (req, res) => {
    res.render('login')
});

router.get('/register', notLoggedIn, (req, res) => {
    res.render('register')
});

router.get('/profile-github', (req, res) => {
    res.send('logged in with github')
});

router.get('/', loggedIn, (req, res) => {
    const data = {
        name: req.user.name
    }
    res.render('index', {data})
})

module.exports = router;