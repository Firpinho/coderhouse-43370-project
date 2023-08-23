const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const UserDao = require('../daos/mongodb/user.dao')
const {validatePassword, createHash} = require('../utils')


const userDao = new UserDao();

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const login = async (req, email, password, done) => {
    try {
        const user = await userDao.getByEmail(email);
        if(!user) return done(null, false);
        if(validatePassword(user, password)) return done(null, user);
        else return done(null, false)
    } catch (error) {
        return done(error, false)
    }
}

const register = async (req, email, password, done) => {
    try {
        const user = await userDao.getByEmail(email)
        if(user) return done(null, false)

        req.body.password = createHash(password)
        
        const newUser = await userDao.create(req.body);
        return done(null, newUser)
    } catch (error) {
        return done(error, false)
    }
}


/**
 * strategies
 */

const registerStrategy = new LocalStrategy(strategyOptions, register)
const loginStrategy = new LocalStrategy(strategyOptions, login)

/**
 * inicializacion
 */

passport.use('login', loginStrategy);
passport.use('register', registerStrategy)



passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user)
})