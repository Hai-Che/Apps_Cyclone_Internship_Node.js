"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.NotFoundError = exports.ErrorResponse = void 0;
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
//# sourceMappingURL=error.response.js.map