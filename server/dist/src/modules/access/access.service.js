"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const init_redis_1 = __importDefault(require("../../dbs/init.redis"));
const routing_controllers_1 = require("routing-controllers");
const emailQueue_1 = require("../../queues/emailQueue");
const generateObject_1 = require("../../utils/generateObject");
const uuid_1 = require("uuid");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
let AccessService = class AccessService {
    constructor(userRepository, userAdvanceRepository) {
        this.userRepository = userRepository;
        this.userAdvanceRepository = userAdvanceRepository;
    }
    register(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userName, password, uass, uuid, fullName, email, phoneNumber, address, dob, profileUrl, }) {
            const checkUser = yield this.userRepository.findOne({
                where: { userName },
            });
            if (checkUser) {
                throw new routing_controllers_1.BadRequestError("Username already existed");
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield this.userRepository.save({
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
            const newUserAdvance = yield this.userAdvanceRepository.save({
                userId: newUser.userId,
                address,
                dob,
                profileUrl,
            });
            if (!newUserAdvance) {
                throw new routing_controllers_1.BadRequestError("Failed to create user advance");
            }
            const verifyCode = (0, generateObject_1.generateVerificationCode)();
            yield init_redis_1.default.set(`verification:${newUser.userId}`, verifyCode, "EX", 3600);
            yield emailQueue_1.emailQueue.add("sendEmail", {
                email: email,
                subject: "Register successfully",
                text: `Dear ${userName},\n\n Welcome to my service. This is your verification code valid in 1 hour, active your account with it! ${verifyCode}`,
            });
            return { user: newUser, userAdvance: newUserAdvance };
        });
    }
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const findUser = yield this.userRepository.findOne({ where: { email } });
            if (!findUser) {
                throw new routing_controllers_1.BadRequestError(`User is not exist`);
            }
            const passwordCheck = yield bcrypt_1.default.compare(password, findUser.password);
            if (!passwordCheck) {
                throw new routing_controllers_1.UnauthorizedError("Authenticated error");
            }
            const sessionId = (0, uuid_1.v4)();
            const tokens = yield (0, generateObject_1.createTokenPair)({ userId: findUser.userId, sessionId }, `${findUser.salt}at`, `${findUser.salt}rt`);
            yield init_redis_1.default.set(`accessToken:${findUser.userId}:${sessionId}`, tokens.accessToken, "EX", 30);
            yield init_redis_1.default.set(`refreshToken:${findUser.userId}:${sessionId}`, tokens.refreshToken, "EX", 300);
            return {
                data: {
                    user: findUser,
                    tokens,
                    sessionId,
                },
            };
        });
    }
    handleRefreshToken(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield this.userRepository.findOne({ where: { userId } });
            if (!findUser) {
                throw new routing_controllers_1.BadRequestError(`User is not exist`);
            }
            const tokens = yield (0, generateObject_1.createTokenPair)({ userId, sessionId }, `${findUser.salt}at`, `${findUser.salt}rt`);
            yield init_redis_1.default.set(`accessToken:${userId}:${sessionId}`, tokens.accessToken, "EX", 30);
            yield init_redis_1.default.set(`refreshToken:${userId}:${sessionId}`, tokens.refreshToken, "EX", 300);
            return { tokens };
        });
    }
    logout(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield init_redis_1.default.del(`accessToken:${userId}:${sessionId}`);
            yield init_redis_1.default.del(`refreshToken:${userId}:${sessionId}`);
            return { message: "Logout successful" };
        });
    }
    verify(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, verificationCode }) {
            const storedCode = yield init_redis_1.default.get(`verification:${userId}`);
            if (storedCode === verificationCode) {
                yield init_redis_1.default.del(`verification:${userId}`);
                return { message: "Verify successfully!" };
            }
            else {
                throw new routing_controllers_1.UnauthorizedError("Failed to validate code");
            }
        });
    }
};
exports.AccessService = AccessService;
exports.AccessService = AccessService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("UserRepository")),
    __param(1, (0, typedi_1.Inject)("UserAdvanceRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AccessService);
//# sourceMappingURL=access.service.js.map