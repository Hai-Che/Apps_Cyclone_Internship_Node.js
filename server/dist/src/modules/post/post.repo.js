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
exports.getSavedPosts = exports.saveSavedPosts = exports.getViewedPosts = exports.saveViewedPosts = void 0;
const init_redis_1 = __importDefault(require("../../dbs/init.redis"));
const saveViewedPosts = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `user:${userId}:viewedPosts`;
    yield init_redis_1.default.sadd(key, postId);
    yield init_redis_1.default.expire(key, 30 * 24 * 60 * 60);
});
exports.saveViewedPosts = saveViewedPosts;
const getViewedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `user:${userId}:viewedPosts`;
    return yield init_redis_1.default.smembers(key);
});
exports.getViewedPosts = getViewedPosts;
const saveSavedPosts = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `user:${userId}:savedPosts`;
    yield init_redis_1.default.sadd(key, postId);
    yield init_redis_1.default.expire(key, 30 * 24 * 60 * 60);
});
exports.saveSavedPosts = saveSavedPosts;
const getSavedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `user:${userId}:savedPosts`;
    return yield init_redis_1.default.smembers(key);
});
exports.getSavedPosts = getSavedPosts;
//# sourceMappingURL=post.repo.js.map