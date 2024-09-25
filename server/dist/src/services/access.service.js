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
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const init_mysql_1 = __importDefault(require("../dbs/init.mysql"));
const error_response_1 = require("../core/error.response");
const authUtils_1 = require("../auth/authUtils");
const user_entity_1 = require("../entities/user.entity");
const userAdvance_entity_1 = require("../entities/userAdvance.entity");
const init_redis_1 = __importDefault(require("../dbs/init.redis"));
const uuid_1 = require("uuid");
const userRepository = init_mysql_1.default.getRepository(user_entity_1.User);
const userAdvanceRepository = init_mysql_1.default.getRepository(userAdvance_entity_1.UserAdvance);
class AccessService {
}
_a = AccessService;
AccessService.register = (_b) => __awaiter(void 0, [_b], void 0, function* ({ userName, password, uass, uuid, fullName, email, phoneNumber, address, dob, profileUrl, }) {
    const checkUser = yield userRepository.findOne({
        where: { userName },
    });
    if (checkUser) {
        throw new error_response_1.BadRequestError("Username already existed");
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield userRepository.save({
        userName,
        password: hashedPassword,
        uass,
        uuid,
        fullName,
        email,
        phoneNumber,
        salt,
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
AccessService.login = (_b) => __awaiter(void 0, [_b], void 0, function* ({ userName, password }) {
    const findUser = yield userRepository.findOne({ where: { userName } });
    if (!findUser) {
        throw new error_response_1.BadRequestError(`User is not exist`);
    }
    const passwordCheck = yield bcrypt_1.default.compare(password, findUser.password);
    if (!passwordCheck) {
        throw new error_response_1.UnauthorizedError("Authenticated error");
    }
    const sessionId = (0, uuid_1.v4)();
    const tokens = yield (0, authUtils_1.createTokenPair)({ userId: findUser.userId, sessionId }, `${findUser.salt}at`, `${findUser.salt}rt`);
    yield init_redis_1.default.set(`accessToken:${findUser.userId}:${sessionId}`, tokens.accessToken, "EX", 30);
    yield init_redis_1.default.set(`refreshToken:${findUser.userId}:${sessionId}`, tokens.refreshToken, "EX", 300);
    return {
        user: findUser,
        tokens,
        sessionId,
    };
});
AccessService.handleRefreshToken = (userId, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield userRepository.findOne({ where: { userId } });
    if (!findUser) {
        throw new error_response_1.BadRequestError(`User is not exist`);
    }
    const accessToken = yield (0, authUtils_1.createAccessToken)({ userId, sessionId }, `${findUser.salt}at`);
    yield init_redis_1.default.set(`accessToken:${userId}:${sessionId}`, accessToken, "EX", 30);
    return accessToken;
});
AccessService.logout = (userId, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield init_redis_1.default.del(`accessToken:${userId}:${sessionId}`);
    return { message: "Logout successful" };
});
exports.default = AccessService;
//# sourceMappingURL=access.service.js.map