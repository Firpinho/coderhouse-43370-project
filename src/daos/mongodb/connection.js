const mongoose = require("mongoose");
require("dotenv/config");

let connection_string;

switch (process.env.NODE_ENV) {
  case "dev":
        connection_string = process.env.MONGO_LOCAL
    break;
  case "prod":
        connection_string = process.env.MONGO_ATLAS
    break;
  case "test" :
        connection_string = process.env.MONGO_LOCAL
    break
  default:
        connection_string = process.env.MONGO_LOCAL
    break;
}

try {
  mongoose
    .connect(connection_string)
    .then(() => console.log("[SERVER] Database connected."))
    .catch(() =>
      console.log("[SERVER][ERR] Error al conectar con la base de datos.")
    );
} catch (error) {
  console.log(error.message);
}
