const userServices = require('../services/user.services');
const { loggedIn, notLoggedIn } = require('../middlewares/loggedIn')

const logged = async (req, res, next) => {
    try {
        if (loggedIn) res.status(200).redirect('http://localhost:8080/')
        else res.status(400).redirect('http://localhost:8080/login')
    } catch (error) {
        next(error.message)
    }
}

const logout = async (req, res, next) => {
    try {
        req.session.destroy()
        res.redirect('/login')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    logged,
    logout
}