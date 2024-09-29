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
exports.RefreshTokenMiddleware = exports.AuthMiddleware = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_repo_1 = require("../modules/user/user.repo");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const init_redis_1 = __importDefault(require("../dbs/init.redis"));
const HEADER = {
    AUTHORIZATION: "authorization",
    REFRESH_TOKEN: "x-rtoken-id",
};
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = req.headers[HEADER.AUTHORIZATION];
            if (!accessToken) {
                throw new routing_controllers_1.UnauthorizedError("Invalid request");
            }
            try {
                const decodeUser = jsonwebtoken_1.default.decode(accessToken, { complete: true });
                const userId = decodeUser.payload.userId;
                const findUser = yield (0, user_repo_1.getUserById)(userId);
                if (!findUser) {
                    throw new routing_controllers_1.UnauthorizedError("User not found");
                }
                const verified = jsonwebtoken_1.default.verify(accessToken, `${findUser.salt}at`);
                req.userId = verified.userId;
                req.sessionId = verified.sessionId;
                next();
            }
            catch (error) {
                throw new routing_controllers_1.UnauthorizedError("Invalid request");
            }
        });
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "before" })
], AuthMiddleware);
let RefreshTokenMiddleware = class RefreshTokenMiddleware {
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
            if (!refreshToken) {
                throw new routing_controllers_1.UnauthorizedError("Invalid request");
            }
            try {
                const decodeUser = jsonwebtoken_1.default.decode(refreshToken, { complete: true });
                const userId = decodeUser.payload.userId;
                const findUser = yield (0, user_repo_1.getUserById)(userId);
                if (!findUser) {
                    throw new routing_controllers_1.UnauthorizedError("User not found");
                }
                const verified = jsonwebtoken_1.default.verify(refreshToken, `${findUser.salt}rt`);
                req.userId = verified.userId;
                req.sessionId = verified.sessionId;
                const storedRefreshToken = yield init_redis_1.default.get(`refreshToken:${verified.userId}:${verified.sessionId}`);
                if (storedRefreshToken !== refreshToken) {
                    throw new routing_controllers_1.UnauthorizedError("Unauthorized error");
                }
                next();
            }
            catch (error) {
                throw new routing_controllers_1.UnauthorizedError("Invalid request");
            }
        });
    }
};
exports.RefreshTokenMiddleware = RefreshTokenMiddleware;
exports.RefreshTokenMiddleware = RefreshTokenMiddleware = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "before" })
], RefreshTokenMiddleware);
//# sourceMappingURL=authMiddleware.js.map