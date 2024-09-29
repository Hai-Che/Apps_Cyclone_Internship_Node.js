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
exports.UserService = void 0;
const routing_controllers_1 = require("routing-controllers");
const init_mysql_1 = __importDefault(require("../../dbs/init.mysql"));
const user_entity_1 = require("../../entities/user.entity");
const userAdvance_entity_1 = require("../../entities/userAdvance.entity");
const typedi_1 = require("typedi");
const userRepository = init_mysql_1.default.getRepository(user_entity_1.User);
const userAdvanceRepository = init_mysql_1.default.getRepository(userAdvance_entity_1.UserAdvance);
let UserService = class UserService {
    getUser(userId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId !== currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Can't get info another user");
            }
            const user = yield userRepository.findOne({
                where: { userId },
            });
            if (!user) {
                throw new routing_controllers_1.BadRequestError("User does not existed");
            }
            const userAdvance = yield userAdvanceRepository.findOne({
                where: { userId },
            });
            return { user, userAdvance };
        });
    }
    updateUser(_a, currentUserId_1) {
        return __awaiter(this, arguments, void 0, function* ({ userId, userName, uass, uuid, fullName, email, phoneNumber, address, dob, profileUrl, }, currentUserId) {
            if (userId !== currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Can't update another user");
            }
            const user = yield userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new routing_controllers_1.BadRequestError("User not found");
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
    }
    deleteUser(userId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId != currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Can't delete another user");
            }
            const userAdvance = yield userAdvanceRepository.findOne({
                where: { userId },
            });
            if (userAdvance) {
                yield userAdvanceRepository.remove(userAdvance);
            }
            const user = yield userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new routing_controllers_1.BadRequestError("User not found.");
            }
            yield userRepository.remove(user);
            return { message: "User deleted successfully." };
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)()
], UserService);
//# sourceMappingURL=user.service.js.map