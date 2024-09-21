"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.ErrorResponse = void 0;
const httpStatusCode_js_1 = require("../utils/httpStatusCode.js");
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ErrorResponse = ErrorResponse;
class NotFoundError extends ErrorResponse {
    constructor(message = httpStatusCode_js_1.ReasonPhrases.NOT_FOUND, statusCode = httpStatusCode_js_1.StatusCodes.NOT_FOUND) {
        super(message, statusCode);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends ErrorResponse {
    constructor(message = httpStatusCode_js_1.ReasonPhrases.BAD_REQUEST, statusCode = httpStatusCode_js_1.StatusCodes.BAD_REQUEST) {
        super(message, statusCode);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ErrorResponse {
    constructor(message = httpStatusCode_js_1.ReasonPhrases.UNAUTHORIZED, statusCode = httpStatusCode_js_1.StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ErrorResponse {
    constructor(message = httpStatusCode_js_1.ReasonPhrases.FORBIDDEN, statusCode = httpStatusCode_js_1.StatusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=error.response.js.map