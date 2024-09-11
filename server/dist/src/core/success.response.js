"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATED = exports.SuccessResponse = void 0;
const httpStatusCode_js_1 = require("../utils/httpStatusCode.js");
class SuccessResponse {
    constructor({ options = {}, message, statusCode = httpStatusCode_js_1.StatusCodes.OK, reasonStatusCode = httpStatusCode_js_1.ReasonPhrases.OK, metadata = {}, }) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
        this.options = options;
    }
    send(res) {
        return res.status(this.status).json(this);
    }
}
exports.SuccessResponse = SuccessResponse;
class CREATED extends SuccessResponse {
    constructor({ options = {}, message, statusCode = httpStatusCode_js_1.StatusCodes.CREATED, reasonStatusCode = httpStatusCode_js_1.ReasonPhrases.CREATED, metadata = {}, }) {
        super({ options, message, statusCode, reasonStatusCode, metadata });
    }
}
exports.CREATED = CREATED;
//# sourceMappingURL=success.response.js.map