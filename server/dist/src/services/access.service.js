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
const node_crypto_1 = __importDefault(require("node:crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const init_mysql_1 = __importDefault(require("../dbs/init.mysql"));
const error_response_1 = require("../core/error.response");
const authUtils_1 = require("../auth/authUtils");
const user_entity_1 = require("../entities/user.entity");
const userAdvance_entity_1 = require("../entities/userAdvance.entity");
const keyToken_entity_1 = require("../entities/keyToken.entity");
const keyToken_service_1 = __importDefault(require("./keyToken.service"));
const userRepository = init_mysql_1.default.getRepository(user_entity_1.User);
const userAdvanceRepository = init_mysql_1.default.getRepository(userAdvance_entity_1.UserAdvance);
const keyTokenRepository = init_mysql_1.default.getRepository(keyToken_entity_1.KeyToken);
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
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield userRepository.save({
        userName,
        password: hashedPassword,
        uass,
        uuid,
        fullName,
        email,
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
    const accessKey = node_crypto_1.default.randomBytes(64).toString("hex");
    const refreshKey = node_crypto_1.default.randomBytes(64).toString("hex");
    const tokens = yield (0, authUtils_1.createTokenPair)({
        userId: newUser.userId,
    }, accessKey, refreshKey);
    const keyStore = yield keyToken_service_1.default.createKeyToken({
        userId: newUser.userId,
        accessKey,
        refreshKey,
        refreshToken: tokens.refreshToken,
    });
    if (!keyStore) {
        throw new error_response_1.BadRequestError("Fail to create keyStore");
    }
    return { user: newUser, userAdvance: newUserAdvance, tokens };
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
    const accessKey = node_crypto_1.default.randomBytes(64).toString("hex");
    const refreshKey = node_crypto_1.default.randomBytes(64).toString("hex");
    const tokens = yield (0, authUtils_1.createTokenPair)({ userId: findUser.userId }, accessKey, refreshKey);
    yield keyToken_service_1.default.createKeyToken({
        userId: findUser.userId,
        accessKey,
        refreshKey,
        refreshToken: tokens.refreshToken,
    });
    return {
        user: findUser,
        tokens,
    };
});
AccessService.handleRefreshToken = (_b) => __awaiter(void 0, [_b], void 0, function* ({ userId, refreshToken, keyStore }) {
    if (keyStore.refreshToken !== refreshToken) {
        throw new error_response_1.UnauthorizedError("User is not registered");
    }
    const user = yield userRepository.findOne({ where: { userId } });
    if (!user) {
        throw new error_response_1.UnauthorizedError("Not registered");
    }
    const tokens = yield (0, authUtils_1.createTokenPair)({
        userId,
    }, keyStore.accessKey, keyStore.refreshKey);
    keyStore.refreshToken = tokens.refreshToken;
    yield keyTokenRepository.save(keyStore);
    return {
        user,
        tokens,
    };
});
exports.default = AccessService;
//# sourceMappingURL=access.service.js.map