const HttpResponse = require("../utils/http.response");
const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config');

const httpResponse = new HttpResponse();

const checkLink = (req, res, next) => {
    const { passwordtoken } = req.cookies;
    const token = verifyExpiredToken(passwordtoken);
    if (!token) return httpResponse.FORBIDDEN(res, "Este link ha expirado")
    
    req.userID = token.user._id;
    next();
}


const verifyExpiredToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
        if (!decoded) return false
        return decoded
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = checkLink;