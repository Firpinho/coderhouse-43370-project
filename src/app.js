// DATABASE

require("./persistence/daos/factory");

//  IMPORTS

const config = require("./config");
const express = require("express");
const { engine } = require("express-handlebars");
const MainRouter = require("./routes/main.routes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./passport/local-strategy");
require("./passport/github-strategy");
require("./passport/google-strategy");
const compression = require("compression");
const errors = require("./middlewares/errors");
const logger = require("./utils/log.config.js");
const cookieParser = require("cookie-parser");

//  INITIALIZATIONS

const PORT = config.PORT || 3000;
const app = express();
const mainRouter = new MainRouter();

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS || process.MONGO_LOCAL,
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1200000,
  },
};

//  MIDDLEWARES

app
  .use(compression({ threshold: 0 }))
  .use(express.json())
  .use(cookieParser(config.SECRET_COOKIES))
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + "/public"))
  .use(session(mongoStoreOptions))
  .use(passport.initialize())
  .use(passport.session())
  .use("/", mainRouter.getRouter())
  .use(errors)

//  VIEWENGINE

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.listen(PORT, logger.info(`Server on port :::::: ${PORT}`));
