/**
 * MONGO
 */
const mongoCartDao = require('./mongodb/cart.dao')
const mongoUserDao = require('./mongodb/user.dao')
const mongoProductDao = require('./mongodb/product.dao')
/**
 * 
 */

let productDao;
let userDao;
let persistence = process.argv[2]