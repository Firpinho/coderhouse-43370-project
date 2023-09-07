require('./config')
const { Strategy:GithubStrategy } = require('passport-github2');
const passport = require('passport');
const { config } = require('dotenv');

const strategyOptions = {
    clientID: config.env.GOOGLE_CLIENT_ID,
    clientSecret: config.env.GOOGLE_SECRET_KEY,
    callbackURL: config.env.GOOGLE_CALLBACK_URL,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log('hosadplñkfjsdlfjsdlkfjsd');
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));