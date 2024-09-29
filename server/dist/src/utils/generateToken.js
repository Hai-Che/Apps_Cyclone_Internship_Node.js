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
exports.createAccessToken = exports.createTokenPair = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
//# sourceMappingURL=generateToken.js.map