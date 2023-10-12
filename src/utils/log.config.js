const { createLogger, format, transports } = require("winston");
const config = require("../config");

let logger;

const development_config = {
  level: "debug",
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.simple(),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.printf(
      (info) => `[${info.level}] | ${info.timestamp} => ${info.message}`
    )
  ),
};

const production_config = {
  level: "silly",
  transports: [
    new transports.File({
      filename: "./src/logs/System.log",
      level: "info",
    }),
    new transports.File({
      filename: "./src/logs/Erors.log",
      level: "error",
    }),
  ],
  format: format.combine(
    format.simple(),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.printf(
      (info) => `[${info.level}] | ${info.timestamp} => ${info.message}`
    )
  ),
};

switch (config.NODE_ENV) {
  case "dev":
    logger = createLogger(development_config);
    break;
  case "prod":
    logger = createLogger(production_config);
    break;
  default:
    logger = createLogger(development_config);
    break;
}

/* logger.silly("Print Silly");
logger.debug("Print Debug");
logger.verbose("Print Verbose");
logger.info("Print Info");
logger.http("Print Http");
logger.warn("Print Warn");
logger.error("Print Error"); */

module.exports = logger;
