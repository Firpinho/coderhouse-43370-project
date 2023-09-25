const userServices = require('../services/user.services');
const { loggedIn } = require('../middlewares/loggedIn')

const HttpResponse = require('../utils/http.response')

const httpResponse = new HttpResponse()


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

const getCurrent = async (req, res, next) => {
    try {
        const user = await userServices.getCurrent(req.user._id)
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    logged,
    logout,
    getCurrent
}