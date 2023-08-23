// DATABASE

require('dotenv/config')
require('./daos/mongodb/connection'); 

//  IMPORTS

const express = require('express');
const {engine} = require('express-handlebars');
const MainRouter = require('./routes/main.routes')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./passport/local-strategy');
require('./passport/github-strategy');
require('./passport/google-strategy');

//  INITIALIZATIONS

const PORT = process.env.PORT || 3000;
const app = express();
const mainRouter = new MainRouter();

const mongoStoreOptions = {
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_ATLAS || process.env.MONGO_LOCAL,
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000
    }
}

//  MIDDLEWARES

app.use(express.json())
   .use(express.urlencoded({extended: true}))
   .use(express.static(__dirname+'/public'))
   .use(session(mongoStoreOptions))
   .use(passport.initialize())
   .use(passport.session())   
   .use('/', mainRouter.getRouter())

//  VIEWENGINE

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',  __dirname+'/views');

app.listen(PORT, () => {
    console.log(`[SERVER] Server on port :::::: `, PORT);
});