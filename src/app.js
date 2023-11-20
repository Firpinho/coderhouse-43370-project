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
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { info } = require("./docs/info");
const cluster = require("cluster");
const { cpus } = require('os')

//  INITIALIZATIONS

const PORT = config.PORT || 3000;
const app = express();
const mainRouter = new MainRouter();
const specs = swaggerJSDoc(info);
const cpu = cpus().length


if (cluster.isPrimary) {
  logger.info(`MASTER | PID - ${process.pid} | CPU (cores) :: ${cpu} | Server on port :: ${PORT}`);

  for (let i = 0; i < cpu; i++) {
    const worker = cluster.fork();
    if(i === cpu-1){
      logger.info(`************** All workers deployed **************`) 
      logger.info(`************** Initializing workers **************`) 
    } else logger.info(`NEW WORKER | PID - ${worker.process.pid}`)
  }

  cluster.on("exit", (worker, code) => {
    logger.info(`WORKER | PID - ${worker.process.pid} | End with code :: ${code}`)
    cluster.fork();
  })
}else{

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
    .use("/docs", swaggerUI.serve, swaggerUI.setup(specs))
    .use(express.urlencoded({ extended: true }))
    .use(express.static(__dirname + "/public"))
    .use(session(mongoStoreOptions))
    .use(passport.initialize())
    .use(passport.session())
    .use("/", mainRouter.getRouter())
    .use(errors);
  
  //  VIEWENGINE
  
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", __dirname + "/views");
  
  app.listen(PORT, logger.info(`Worker server ON | PID - ${process.pid}`));

}

module.exports = app