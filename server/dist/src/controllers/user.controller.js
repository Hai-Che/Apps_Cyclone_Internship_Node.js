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
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: "getUser Success",
                metadata: yield user_service_1.default.getUser(req.params.id),
            }).send(res);
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: "updateUser Success",
                metadata: yield user_service_1.default.updateUser(req.body),
            }).send(res);
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: "deleteUser Success",
                metadata: yield user_service_1.default.deleteUser(req.params.id),
            }).send(res);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map