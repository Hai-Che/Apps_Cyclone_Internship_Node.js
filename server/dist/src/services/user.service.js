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
const init_mysql_1 = __importDefault(require("../dbs/init.mysql"));
const user_entity_1 = require("../entities/user.entity");
const userAdvance_entity_1 = require("../entities/userAdvance.entity");
const userRepository = init_mysql_1.default.getRepository(user_entity_1.User);
const userAdvanceRepository = init_mysql_1.default.getRepository(userAdvance_entity_1.UserAdvance);
class UserService {
}
_a = UserService;
UserService.getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findOne({
        where: { userId },
    });
    if (!user) {
        throw new error_response_1.BadRequestError("User does not existed");
    }
    const userAdvance = yield userAdvanceRepository.findOne({
        where: { userId },
    });
    return { user, userAdvance };
});
UserService.updateUser = (_b) => __awaiter(void 0, [_b], void 0, function* ({ userId, userName, uass, uuid, fullName, email, phoneNumber, address, dob, profileUrl, }) {
    const user = yield userRepository.findOne({ where: { userId } });
    if (!user) {
        throw new error_response_1.BadRequestError("User not found");
    }
    if (userName) {
        user.userName = userName;
    }
    if (uass) {
        user.uass = uass;
    }
    if (uuid) {
        user.uuid = uuid;
    }
    if (fullName) {
        user.fullName = fullName;
    }
    if (email) {
        user.email = email;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber;
    }
    yield userRepository.save(user);
    let userAdvance = yield userAdvanceRepository.findOne({
        where: { userId },
    });
    if (!userAdvance) {
        userAdvance = new userAdvance_entity_1.UserAdvance();
        userAdvance.userId = userId;
    }
    if (address) {
        userAdvance.address = address;
    }
    if (dob) {
        userAdvance.dob = dob;
    }
    if (profileUrl) {
        userAdvance.profileUrl = profileUrl;
    }
    yield userAdvanceRepository.save(userAdvance);
    return { user, userAdvance };
});
UserService.deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userAdvance = yield userAdvanceRepository.findOne({
        where: { userId },
    });
    if (userAdvance) {
        yield userAdvanceRepository.remove(userAdvance);
    }
    const user = yield userRepository.findOne({ where: { userId } });
    if (!user) {
        throw new error_response_1.BadRequestError("User not found.");
    }
    yield userRepository.remove(user);
    return { message: "User deleted successfully." };
});
exports.default = UserService;
//# sourceMappingURL=user.service.js.map