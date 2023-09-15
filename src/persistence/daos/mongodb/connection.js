const mongoose = require("mongoose");
const config = require('../../../config')

let connection_string;

switch (config.NODE_ENV) {
  case "dev":
        connection_string = config.MONGO_LOCAL
    break;
  case "prod":
        connection_string = config.MONGO_ATLAS
    break;
  case "test" :
        connection_string = config.MONGO_LOCAL
    break
  default:
        connection_string = config.MONGO_LOCAL
    break;
}

module.exports = {
  init : async () => {
    try {
      await mongoose
        .connect(connection_string)
        .then(() => console.log("[SERVER] Database connected."))
        .catch(() =>
          console.log("[SERVER][ERR] Error al conectar con la base de datos.")
        );
    } catch (error) {
      console.log(error.message);
    }
  }
}