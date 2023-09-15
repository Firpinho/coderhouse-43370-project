const config = require('../config')
const { Strategy:GithubStrategy } = require('passport-github2');
const passport = require('passport');

const strategyOptions = {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_SECRET_KEY,
    callbackURL: config.GITHUB_CALLBACK_URL,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log('github');
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));