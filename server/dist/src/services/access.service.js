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
const user_entity_1 = require("../entities/user.entity");
const init_mysql_1 = __importDefault(require("../dbs/init.mysql"));
const userAdvance_entity_1 = require("../entities/userAdvance.entity");
const userRepository = init_mysql_1.default.getRepository(user_entity_1.User);
const userAdvanceRepository = init_mysql_1.default.getRepository(userAdvance_entity_1.UserAdvance);
class AccessService {
}
_a = AccessService;
AccessService.register = (_b) => __awaiter(void 0, [_b], void 0, function* ({ userName, uass, uuid, fullName, Email, phoneNumber, address, dob, profileUrl, }) {
    const checkUser = yield userRepository.findOne({
        where: { userName },
    });
    if (checkUser) {
        throw new error_response_1.BadRequestError("Username already existed");
    }
    const newUser = yield userRepository.save({
        userName,
        uass,
        uuid,
        fullName,
        Email,
        phoneNumber,
    });
    if (!newUser) {
        throw new error_response_1.BadRequestError("Failed to create user");
    }
    const newUserAdvance = yield userAdvanceRepository.save({
        userId: newUser.userId,
        address,
        dob,
        profileUrl,
    });
    if (!newUserAdvance) {
        throw new error_response_1.BadRequestError("Failed to create user advance");
    }
    return { user: newUser, userAdvance: newUserAdvance };
});
exports.default = AccessService;
//# sourceMappingURL=access.service.js.map