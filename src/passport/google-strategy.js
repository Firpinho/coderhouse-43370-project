const config = require('../config')
const { Strategy : GoogleStrategy } = require('passport-google-oauth20');
const passport = require('passport');
const {UserDao, CartDao} = require('../persistence/daos/factory')
const {createHash} = require('../utils/password-protect')

const strategyOptions = {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET_KEY,
    callbackURL: config.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
    state: true
};


const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await UserDao.getByEmail(profile._json.email)
        if (user) return done(null, user)
    
        const newUser = UserDao.create({
            name: profile.displayName,
            email: profile._json.email,
            password: createHash('1234'),
            isGoogle: true,
            cartID: await generateCart()
        });

        return done(null, newUser)

    } catch (error) {
        return done(error.message, false)
    }
};

passport.use('google', new GoogleStrategy(strategyOptions, registerOrLogin));

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((id, done)=>{
    done(null, id);
});

const generateCart = async () => {
    const cart = await CartDao.create()
    return cart._id;
}