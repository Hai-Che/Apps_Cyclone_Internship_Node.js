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
const error_response_1 = require("../core/error.response");
const success_response_1 = require("../core/success.response");
const user_dto_1 = require("../dto/user.dto");
const user_service_1 = __importDefault(require("../services/user.service"));
const requestValidator_1 = require("../utils/requestValidator");
class UserController {
    constructor() {
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: "getUser Success",
                metadata: yield user_service_1.default.getUser(Number(req.params.id), req.userId),
            }).send(res);
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { errors, input } = yield (0, requestValidator_1.RequestValidator)(user_dto_1.UpdateUserDto, req.body);
            if (errors) {
                throw new error_response_1.BadRequestError(`${errors}`);
            }
            new success_response_1.SuccessResponse({
                message: "updateUser Success",
                metadata: yield user_service_1.default.updateUser(input, req.userId),
            }).send(res);
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: "deleteUser Success",
                metadata: yield user_service_1.default.deleteUser(Number(req.params.id), req.userId),
            }).send(res);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map