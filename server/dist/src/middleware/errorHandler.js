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
let HttpErrorHandler = class HttpErrorHandler {
    error(error, request, response, next) {
        if (error instanceof routing_controllers_1.HttpError) {
            response.status(error.httpCode).json({
                status: error.httpCode,
                message: error.message,
            });
        }
        else {
            response.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
        next(error);
    }
};
exports.HttpErrorHandler = HttpErrorHandler;
exports.HttpErrorHandler = HttpErrorHandler = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "after" })
], HttpErrorHandler);
//# sourceMappingURL=errorHandler.js.map