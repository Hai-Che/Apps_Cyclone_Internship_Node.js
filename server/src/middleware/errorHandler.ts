import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    if (error instanceof HttpError) {
      response.status(error.httpCode).json({
        status: error.httpCode,
        message: error.message,
      });
    } else {
      response.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
    next(error);
  }
}
