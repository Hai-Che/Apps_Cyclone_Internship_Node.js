import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";
import { Service } from "typedi";
// import { ValidationError } from "class-validator";

@Service()
@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";
    let errorDetails = null;
    if (error instanceof HttpError) {
      statusCode = error.httpCode;
      errorMessage = error.message;

      const httpErrorWithErrors = error as HttpError & { errors?: any[] };
      if (
        httpErrorWithErrors.errors &&
        Array.isArray(httpErrorWithErrors.errors)
      ) {
        statusCode = 400;
        errorMessage = "Validation Error";
        errorDetails = this.formatValidationErrors(httpErrorWithErrors.errors);
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const errorResponse = {
      status: statusCode,
      message: errorMessage,
      details: errorDetails,
      timestamp: new Date().toISOString(),
      path: request.path,
    };
    response.status(statusCode).json(errorResponse);
    next(error);
  }

  private formatValidationErrors(errors: any[]): object {
    return errors.reduce((acc, error) => {
      if (error.constraints) {
        acc[error.property] = Object.values(error.constraints);
      }
      if (error.children && error.children.length > 0) {
        const childErrors = this.formatValidationErrors(error.children);
        if (Object.keys(childErrors).length > 0) {
          acc[error.property] = childErrors;
        }
      }
      return acc;
    }, {});
  }
}
