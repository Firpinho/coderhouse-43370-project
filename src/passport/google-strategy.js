const config = require('../config')
const { Strategy : GoogleStrategy } = require('passport-google-oauth20');
const passport = require('passport');
const UserDao = require('../daos/mongodb/user.dao')
const {createHash} = require('../utils')

const userDao = new UserDao()

const strategyOptions = {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET_KEY,
    callbackURL: config.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
    state: true
};


const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userDao.getByEmail(profile._json.email)
        if (user) return done(null, user)
    
        const newUser = userDao.create({
            name: profile.displayName,
            email: profile._json.email,
            password: createHash('1234'),
            isGoogle: true
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