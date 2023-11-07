const mongoose = require("mongoose");
const config = require('../../../config')
const logger = require('../../../utils/log.config');

let connection_string;

switch (config.NODE_ENV) {
  case "dev":
        connection_string = config.MONGO_ATLAS
    break;
  case "prod":
        connection_string = config.MONGO_ATLAS
    break;
  case "test" :
        connection_string = config.MONGO_ATLAS
    break
  default:
        connection_string = config.MONGO_ATLAS
    break;
}

module.exports = {
  init : async () => {
    try {
      await mongoose
        .connect(connection_string)
        .then(() => logger.info("Database connected."))
        .catch(() =>
          logger.error("Error al conectar con la base de datos.")
        );
    } catch (error) {
      console.log(error.message);
    }
  }
}