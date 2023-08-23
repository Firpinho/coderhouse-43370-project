const passport = require('passport');
const { Strategy : GithubStrategy } = require('passport-github2');
const { createHash } = require('../utils')

const UserDao = require('../daos/mongodb/user.dao')

const userDao = new UserDao();


const strategyOptions = {
    clientID: 'Iv1.a407b2c12e6dc5bd',
    clientSecret: '3eb7be5889c09c765be58f54fd3db8600788a848',
    callbackURL: 'http://localhost:8080/api/user/profile-github'
}

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile._json.email !== null ? profile._json.email : profile._json.blog
        console.log(profile);
        const user = await userDao.getByEmail(email);
        if(user) return done(null, user);
        //Nota: para los usuarios de terceros hay que crear otro modelo de usuario sin password
        const newUser = await userDao.create({
            name:"profile.displayName",
            mail: "email",
            password: createHash('1234'),
            role: 'user',
            isGithub: true
        });
        return done(null, newUser)
    } catch (error) {
        done(error.message, false)
    }
}

passport.use(new GithubStrategy(strategyOptions, registerOrLogin));