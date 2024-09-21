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
exports.authentication = exports.createTokenPair = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../helper/asyncHandler");
const error_response_1 = require("../core/error.response");
const keyToken_service_1 = __importDefault(require("../services/keyToken.service"));
const HEADER = {
    AUTHORIZATION: "authorization",
    CLIENT_ID: "x-client-id",
    REFRESH_TOKEN: "x-rtoken-id",
};
const createTokenPair = (payload, accessKey, refreshKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield jsonwebtoken_1.default.sign(payload, accessKey, {
            expiresIn: "1h",
        });
        const refreshToken = yield jsonwebtoken_1.default.sign(payload, refreshKey, {
            expiresIn: "7 days",
        });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw error;
    }
});
exports.createTokenPair = createTokenPair;
const authentication = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.headers[HEADER.CLIENT_ID]);
    if (!userId) {
        throw new error_response_1.UnauthorizedError("Invalid request");
    }
    const keyStore = yield keyToken_service_1.default.findKeyStoreByUserId(userId);
    if (!keyStore) {
        throw new error_response_1.NotFoundError("Not found keystore");
    }
    if (req.headers[HEADER.REFRESH_TOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
            const decodeUser = jsonwebtoken_1.default.verify(refreshToken, keyStore.refreshKey);
            if (userId !== decodeUser.userId) {
                throw new error_response_1.UnauthorizedError("Invalid user id");
            }
            req.keyStore = keyStore;
            req.userId = decodeUser.userId;
            req.refreshToken = refreshToken;
            return next();
        }
        catch (error) {
            throw error;
        }
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) {
        throw new error_response_1.UnauthorizedError("Invalid request");
    }
    try {
        const decodeUser = jsonwebtoken_1.default.verify(accessToken, keyStore.accessKey);
        if (userId !== decodeUser.userId) {
            throw new error_response_1.UnauthorizedError("Invalid user id");
        }
        req.userId = decodeUser.userId;
        return next();
    }
    catch (error) {
        throw error;
    }
}));
exports.authentication = authentication;
//# sourceMappingURL=authUtils.js.map