const HTTP_STATUS = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
}

class HttpResponse {

    OK(res, data) {
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: "Success",
            data: data
        })
    }

    NOT_FOUND(res, data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            status: HTTP_STATUS.NOT_FOUND,
            message: "Not found",
            error: data
        })
    }

    UNAUTHORIZED(res, data) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: "Unauthorized",
            error: data
        })
    }

    FORBIDDEN(res, data) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
            status: HTTP_STATUS.FORBIDDEN,
            message: "Forbidden",
            error: data
        })
    }

    INTERNAL_SERVER_ERROR(res, data) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: "Server internal error",
            error: data
        })
    }

}

module.exports = HttpResponse;