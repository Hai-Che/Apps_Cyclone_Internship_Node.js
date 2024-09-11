import { StatusCodes, ReasonPhrases } from "../utils/httpStatusCode.js";

class SuccessResponse {
  message?: string;
  status?: number;
  metadata?: object;
  options?: object;
  constructor({
    options = {},
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
    this.options = options;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class CREATED extends SuccessResponse {
  constructor({
    options = {},
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata = {},
  }) {
    super({ options, message, statusCode, reasonStatusCode, metadata });
  }
}

export { SuccessResponse, CREATED };
