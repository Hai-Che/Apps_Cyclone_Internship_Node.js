"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const access_service_1 = __importDefault(require("../services/access.service"));
const user_dto_1 = require("../dto/user.dto");
const requestValidator_1 = require("../utils/requestValidator");
const error_response_1 = require("../core/error.response");
class AccessController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { errors, input } = yield (0, requestValidator_1.RequestValidator)(user_dto_1.RegisterUserDto, req.body);
            if (errors) {
                throw new error_response_1.BadRequestError(`${errors}`);
            }
            new success_response_1.CREATED({
                message: "Registered Success",
                metadata: yield access_service_1.default.register(input),
            }).send(res);
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: "Login Success",
                metadata: yield access_service_1.default.login(req.body),
            }).send(res);
        });
        this.handleRefreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId, sessionId } = req;
            new success_response_1.SuccessResponse({
                message: "Get Tokens Success",
                metadata: yield access_service_1.default.handleRefreshToken(userId, sessionId),
            }).send(res);
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId, sessionId } = req;
            new success_response_1.SuccessResponse({
                message: "Logout Success",
                metadata: yield access_service_1.default.logout(userId, sessionId),
            }).send(res);
        });
    }
}
exports.default = new AccessController();
//# sourceMappingURL=access.controller.js.map