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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.createAccessToken = exports.createTokenPair = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../helper/asyncHandler");
const error_response_1 = require("../core/error.response");
require("dotenv/config");
const init_redis_1 = __importDefault(require("../dbs/init.redis"));
const user_repo_1 = require("../entities/repositories/user.repo");
const HEADER = {
    AUTHORIZATION: "authorization",
    REFRESH_TOKEN: "x-rtoken-id",
};
const createTokenPair = (payload, accessKey, refreshKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield jsonwebtoken_1.default.sign(payload, accessKey, {
            expiresIn: "30s",
        });
        const refreshToken = yield jsonwebtoken_1.default.sign(payload, refreshKey, {
            expiresIn: "300s",
        });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw error;
    }
});
exports.createTokenPair = createTokenPair;
const createAccessToken = (payload, accessKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield jsonwebtoken_1.default.sign(payload, accessKey, {
            expiresIn: "30s",
        });
        return accessToken;
    }
    catch (error) {
        throw error;
    }
});
exports.createAccessToken = createAccessToken;
const verifyToken = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) {
        throw new error_response_1.UnauthorizedError("Invalid request");
    }
    try {
        const decodeUser = jsonwebtoken_1.default.decode(accessToken, { complete: true });
        const userId = decodeUser.payload.userId;
        const findUser = yield (0, user_repo_1.getUserById)(userId);
        if (!findUser) {
            throw new error_response_1.UnauthorizedError("User not found");
        }
        const verified = jsonwebtoken_1.default.verify(accessToken, `${findUser.salt}at`);
        req.userId = verified.userId;
        req.sessionId = verified.sessionId;
        return next();
    }
    catch (error) {
        throw error;
    }
}));
exports.verifyToken = verifyToken;
const verifyRefreshToken = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
    if (!refreshToken) {
        throw new error_response_1.UnauthorizedError("Invalid request");
    }
    try {
        const decodeUser = jsonwebtoken_1.default.decode(refreshToken, { complete: true });
        const userId = decodeUser.payload.userId;
        const findUser = yield (0, user_repo_1.getUserById)(userId);
        if (!findUser) {
            throw new error_response_1.UnauthorizedError("User not found");
        }
        const verified = jsonwebtoken_1.default.verify(refreshToken, `${findUser.salt}rt`);
        req.userId = verified.userId;
        req.sessionId = verified.sessionId;
        const storedRefreshToken = yield init_redis_1.default.get(`refreshToken:${verified.userId}:${verified.sessionId}`);
        if (storedRefreshToken !== refreshToken) {
            throw new error_response_1.UnauthorizedError("Unauthorized error");
        }
        return next();
    }
    catch (error) {
        throw error;
    }
}));
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=authUtils.js.map