"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AccessService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const init_mysql_1 = __importDefault(require("../../dbs/init.mysql"));
const init_redis_1 = __importDefault(require("../../dbs/init.redis"));
const routing_controllers_1 = require("routing-controllers");
const emailQueue_1 = require("../../queues/emailQueue");
const generateToken_1 = require("../../utils/generateToken");
const user_entity_1 = require("../../entities/user.entity");
const userAdvance_entity_1 = require("../../entities/userAdvance.entity");
const uuid_1 = require("uuid");
const typedi_1 = require("typedi");
const userRepository = init_mysql_1.default.getRepository(user_entity_1.User);
const userAdvanceRepository = init_mysql_1.default.getRepository(userAdvance_entity_1.UserAdvance);
let AccessService = class AccessService {
    register(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userName, password, uass, uuid, fullName, email, phoneNumber, address, dob, profileUrl, }) {
            const checkUser = yield userRepository.findOne({
                where: { userName },
            });
            if (checkUser) {
                throw new routing_controllers_1.BadRequestError("Username already existed");
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
                throw new routing_controllers_1.BadRequestError("Failed to create user");
            }
            const newUserAdvance = yield userAdvanceRepository.save({
                userId: newUser.userId,
                address,
                dob,
                profileUrl,
            });
            if (!newUserAdvance) {
                throw new routing_controllers_1.BadRequestError("Failed to create user advance");
            }
            yield emailQueue_1.emailQueue.add("sendEmail", {
                email: email,
                subject: "Register successfully",
                text: `Dear ${userName},\n\n Welcome!`,
            });
            return { user: newUser, userAdvance: newUserAdvance };
        });
    }
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userName, password }) {
            const findUser = yield userRepository.findOne({ where: { userName } });
            if (!findUser) {
                throw new routing_controllers_1.BadRequestError(`User is not exist`);
            }
            const passwordCheck = yield bcrypt_1.default.compare(password, findUser.password);
            if (!passwordCheck) {
                throw new routing_controllers_1.UnauthorizedError("Authenticated error");
            }
            const sessionId = (0, uuid_1.v4)();
            const tokens = yield (0, generateToken_1.createTokenPair)({ userId: findUser.userId, sessionId }, `${findUser.salt}at`, `${findUser.salt}rt`);
            yield init_redis_1.default.set(`accessToken:${findUser.userId}:${sessionId}`, tokens.accessToken, "EX", 30);
            yield init_redis_1.default.set(`refreshToken:${findUser.userId}:${sessionId}`, tokens.refreshToken, "EX", 300);
            return {
                user: findUser,
                tokens,
                sessionId,
            };
        });
    }
    handleRefreshToken(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield userRepository.findOne({ where: { userId } });
            if (!findUser) {
                throw new routing_controllers_1.BadRequestError(`User is not exist`);
            }
            const accessToken = yield (0, generateToken_1.createAccessToken)({ userId, sessionId }, `${findUser.salt}at`);
            yield init_redis_1.default.set(`accessToken:${userId}:${sessionId}`, accessToken, "EX", 30);
            return { accessToken };
        });
    }
    logout(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield init_redis_1.default.del(`accessToken:${userId}:${sessionId}`);
            return { message: "Logout successful" };
        });
    }
};
exports.AccessService = AccessService;
exports.AccessService = AccessService = __decorate([
    (0, typedi_1.Service)()
], AccessService);
//# sourceMappingURL=access.service.js.map