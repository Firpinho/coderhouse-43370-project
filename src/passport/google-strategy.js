const { Strategy : GoogleStrategy } = require('passport-google-oauth20');
const passport = require('passport');
const UserDao = require('../daos/mongodb/user.dao')
const {createHash} = require('../utils')

const userDao = new UserDao();

const strategyOptions = {
    clientID: '881899751124-d0sd3b3uremneosvfj74l78dnv3g5682.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/api/user/oauth2/redirect/accounts.google.com',
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