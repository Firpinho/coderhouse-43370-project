const { JWT_PRIVATE_KEY } = require("../config")
const jwt = require("jsonwebtoken")

const generateToken = (payload, expire) => jwt.sign(payload, JWT_PRIVATE_KEY, {expiresIn: expire})

module.exports = {generateToken}