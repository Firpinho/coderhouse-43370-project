/**
 * MONGO
 */
const mongoCartDao = require("./mongodb/cart.dao");
const mongoUserDao = require("./mongodb/user.dao");
const mongoProductDao = require("./mongodb/product.dao");
const { init: mongoInit } = require("./mongodb/connection");
/**
 *
 */

let ProductDao;
let UserDao;
let CartDao;
let persistence = process.argv[2];

switch (persistence) {
  case "mongo":
    mongoInit()
    ProductDao = new mongoProductDao();
    UserDao = mongoUserDao;
    CartDao = mongoCartDao;
    break;
  case "mysql":
        console.log('levanta con mysql')
    break;
  case "fs":
        console.log('levanta con fileSystem')
    break;
  default:
    ProductDao = mongoProductDao;
    UserDao = mongoUserDao;
    CartDao = mongoCartDao;
    break;
}


module.exports = {
    ProductDao,
    UserDao,
    CartDao
}