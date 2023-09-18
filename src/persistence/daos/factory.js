/**
 * MONGO
 */
const mongoCartDao = require("./mongodb/cart.dao");
const mongoUserDao = require("./mongodb/user.dao");
const mongoProductDao = require("./mongodb/product.dao");
const mongoTicketDAO = require("./mongodb/ticket.dao")
const { init: mongoInit } = require("./mongodb/connection");
/**
 *
 */

let ProductDao, UserDao, CartDao, TicketDao;
let persistence = process.argv[2];

switch (persistence) {
  case "mongo":
    mongoInit()
    ProductDao = new mongoProductDao();
    UserDao = new mongoUserDao();
    CartDao = new mongoCartDao();
    TicketDao = new mongoTicketDAO();
    break;
  case "mysql":
        console.log('levanta con mysql')
    break;
  case "fs":
        console.log('levanta con fileSystem')
    break;
  default:
    mongoInit()
    ProductDao = new mongoProductDao();
    UserDao = new mongoUserDao();
    CartDao = new mongoCartDao();
    TicketDao = new mongoTicketDAO();
    break;
}


module.exports = {
    ProductDao,
    UserDao,
    CartDao,
    TicketDao
}