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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../core/error.response");
const user_repo_1 = require("../models/repositories/user.repo");
const user_model_1 = __importDefault(require("../models/user.model"));
class AccessService {
}
_a = AccessService;
AccessService.register = (_b) => __awaiter(void 0, [_b], void 0, function* ({ username, password, fullName, dob, address }) {
    const checkUser = yield (0, user_repo_1.findByUsername)(username);
    if (checkUser) {
        console.log(checkUser);
        throw new error_response_1.BadRequestError("Username already existed");
    }
    const newUser = yield user_model_1.default.create({
        username,
        fullName,
        password,
        dob,
        address,
    });
    if (!newUser) {
        throw new error_response_1.BadRequestError("Failed to create user");
    }
    return { user: newUser };
});
exports.default = AccessService;
//# sourceMappingURL=access.service.js.map