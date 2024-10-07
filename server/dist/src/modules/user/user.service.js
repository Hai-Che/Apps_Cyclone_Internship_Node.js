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
exports.UserService = void 0;
const routing_controllers_1 = require("routing-controllers");
const userAdvance_entity_1 = require("../../entities/userAdvance.entity");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const generateObject_1 = require("../../utils/generateObject");
const init_redis_1 = __importDefault(require("../../dbs/init.redis"));
let UserService = class UserService {
    constructor(userRepository, userAdvanceRepository) {
        this.userRepository = userRepository;
        this.userAdvanceRepository = userAdvanceRepository;
    }
    getUser(userId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId !== currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Can't get info another user");
            }
            const user = yield this.userRepository.findOne({
                where: { userId },
            });
            if (!user) {
                throw new routing_controllers_1.BadRequestError("User does not existed");
            }
            const userAdvance = yield this.userAdvanceRepository.findOne({
                where: { userId },
            });
            return { user, userAdvance };
        });
    }
    updateUser(_a, currentUserId_1) {
        return __awaiter(this, arguments, void 0, function* ({ userId, userName, password, uass, uuid, fullName, email, phoneNumber, address, dob, profileUrl, gender, }, currentUserId) {
            if (userId !== currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Can't update another user");
            }
            const user = yield this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new routing_controllers_1.BadRequestError("User not found");
            }
            let tokens;
            if (password) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                user.password = hashedPassword;
                user.salt = salt;
                const sessionId = (0, uuid_1.v4)();
                tokens = yield (0, generateObject_1.createTokenPair)({ userId, sessionId }, `${salt}at`, `${salt}rt`);
                yield init_redis_1.default.set(`accessToken:${userId}:${sessionId}`, tokens.accessToken, "EX", 30);
                yield init_redis_1.default.set(`refreshToken:${userId}:${sessionId}`, tokens.refreshToken, "EX", 300);
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
            if (gender) {
                user.gender = phoneNumber;
            }
            yield this.userRepository.save(user);
            let userAdvance = yield this.userAdvanceRepository.findOne({
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
            yield this.userAdvanceRepository.save(userAdvance);
            return { user, userAdvance, tokens };
        });
    }
    deleteUser(userId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId != currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Can't delete another user");
            }
            const userAdvance = yield this.userAdvanceRepository.findOne({
                where: { userId },
            });
            if (userAdvance) {
                yield this.userAdvanceRepository.remove(userAdvance);
            }
            const user = yield this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new routing_controllers_1.BadRequestError("User not found.");
            }
            yield this.userRepository.remove(user);
            return { message: "User deleted successfully." };
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("UserRepository")),
    __param(1, (0, typedi_1.Inject)("UserAdvanceRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map