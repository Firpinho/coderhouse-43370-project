const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const {UserDao, CartDao} = require('../persistence/daos/factory')
const {validatePassword, createHash} = require('../utils/password-protect')
const logger = require('../utils/log.config')

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const login = async (req, email, password, done) => {
    try {
        logger.info('Un usuario está intentando entrar a su cuenta.')
        const user = await UserDao.getByEmail(email);
        if(!user) return done(null, false);
        if(validatePassword(user, password)) {
            logger.info('Usuario logeado con exito.')
            return done(null, user)
        }
        else {
            logger.warn('El usuario no ha podido autenticarse con exito.')
            return done(null, false)
        }
    } catch (error) {
        logger.error('Ha ocurrido un error durante el logueo.')
        return done(error, false)
    }
}

const register = async (req, email, password, done) => {
    try {
        const user = await UserDao.getByEmail(email)
        if(user) return done(null, false)

        req.body.password = createHash(password)
        req.body.cartID = await generateCart();

        const newUser = await UserDao.create(req.body);
        logger.info('Nuevo usuario creado.')
        return done(null, newUser)
    } catch (error) {
        logger.error('Ha ocurrido un error al registrar una cuenta.')
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
    const user = await UserDao.getById(id);
    return done(null, user)
})


const generateCart = async () => {
    const cart = await CartDao.create()
    return cart._id;
}