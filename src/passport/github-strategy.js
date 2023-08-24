const { Strategy:GithubStrategy } = require('passport-github2');
const passport = require('passport');

const strategyOptions = {
    clientID: 'Iv1.a407b2c12e6dc5bd',
    clientSecret: '66c429c2fccb59c60bc479001c9b77debb525dee',
    callbackURL: 'http://localhost:8080/profile-github',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log('hosadplñkfjsdlfjsdlkfjsd');
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));