"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
// import { ValidationError } from "class-validator";
let HttpErrorHandler = class HttpErrorHandler {
    error(error, request, response, next) {
        let statusCode = 500;
        let errorMessage = "Internal Server Error";
        let errorDetails = null;
        if (error instanceof routing_controllers_1.HttpError) {
            statusCode = error.httpCode;
            errorMessage = error.message;
            const httpErrorWithErrors = error;
            if (httpErrorWithErrors.errors &&
                Array.isArray(httpErrorWithErrors.errors)) {
                statusCode = 400;
                errorMessage = "Validation Error";
                errorDetails = this.formatValidationErrors(httpErrorWithErrors.errors);
            }
        }
        else if (error instanceof Error) {
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
    formatValidationErrors(errors) {
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
};
exports.HttpErrorHandler = HttpErrorHandler;
exports.HttpErrorHandler = HttpErrorHandler = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "after" })
], HttpErrorHandler);
//# sourceMappingURL=errorHandler.js.map