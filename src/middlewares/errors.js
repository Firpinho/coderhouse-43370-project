const HttpResponse = require("../utils/http.response");

const http = new HttpResponse()

const errors = (error, req, res, next) => {
    console.log(error.stack);
    return http.INTERNAL_SERVER_ERROR(res, error.message)
}

module.exports = errors