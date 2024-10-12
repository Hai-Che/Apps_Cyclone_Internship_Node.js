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
exports.PostService = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../../entities/post.entity");
const init_redis_1 = __importDefault(require("../../dbs/init.redis"));
const routing_controllers_1 = require("routing-controllers");
const post_repo_1 = require("./post.repo");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    createPost(body, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            body.userId = currentUserId;
            const newPost = yield this.postRepository.save(body);
            yield init_redis_1.default.set(`post:${newPost.postId}`, JSON.stringify(newPost));
            return newPost;
        });
    }
    updatePost(postId, body, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.findOne({ where: { postId } });
            if (!post) {
                throw new routing_controllers_1.BadRequestError("Post not existed!");
            }
            if (post.userId !== currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Action denied!");
            }
            yield this.postRepository.update(postId, body);
            const updatedPost = yield this.postRepository.findOne({
                where: { postId },
            });
            yield init_redis_1.default.set(`post:${postId}`, JSON.stringify(updatedPost));
            return updatedPost;
        });
    }
    getPost(postId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedPost = yield init_redis_1.default.get(`post:${postId}`);
            if (cachedPost) {
                const post = JSON.parse(cachedPost);
                if (post.status !== post_entity_1.PostStatus.Published) {
                    throw new routing_controllers_1.BadRequestError("This post not available right now");
                }
                return post;
            }
            const post = yield this.postRepository.findOne({ where: { postId } });
            if (!post || post.status !== post_entity_1.PostStatus.Published) {
                throw new routing_controllers_1.BadRequestError("This post not available right now");
            }
            yield this.postRepository.increment({ postId }, "views", 1);
            yield init_redis_1.default.set(`post:${postId}`, JSON.stringify(post));
            if (currentUserId) {
                yield (0, post_repo_1.saveViewedPosts)(currentUserId, postId);
            }
            return post;
        });
    }
    getPostsByCategory(category, page, limit, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const posts = yield this.postRepository.find({
                where: { category, status: post_entity_1.PostStatus.Published },
                select: {
                    title: true,
                    description: true,
                    thumbnail: true,
                    author: true,
                    totalComments: true,
                    // views: true,
                    postId: true,
                },
                skip,
                take: limit,
            });
            yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                yield this.postRepository.increment({ postId: post.postId }, "views", 1);
                if (currentUserId)
                    yield (0, post_repo_1.saveViewedPosts)(currentUserId, post.postId);
            })));
            return posts;
        });
    }
    getViewedPost(userId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewedPosts = yield (0, post_repo_1.getViewedPosts)(userId);
            const posts = [];
            const skip = (page - 1) * limit;
            yield Promise.all(viewedPosts.map((viewedPost) => __awaiter(this, void 0, void 0, function* () {
                const cachePost = yield init_redis_1.default.get(`post:${viewedPost}`);
                posts.push(JSON.parse(cachePost));
            })));
            return posts.slice(skip, skip + limit);
        });
    }
    savedPost(postId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, post_repo_1.saveSavedPosts)(currentUserId, postId);
            return { message: "Saved post successfully" };
        });
    }
    getSavedPost(userId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedPosts = yield (0, post_repo_1.getSavedPosts)(userId);
            const posts = [];
            const skip = (page - 1) * limit;
            yield Promise.all(savedPosts.map((savedPost) => __awaiter(this, void 0, void 0, function* () {
                const cachePost = yield init_redis_1.default.get(`post:${savedPost}`);
                posts.push(JSON.parse(cachePost));
            })));
            return posts.slice(skip, skip + limit);
        });
    }
    publishedPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.update(postId, {
                status: post_entity_1.PostStatus.Published,
            });
        });
    }
    deletedPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.update(postId, {
                status: post_entity_1.PostStatus.Deleted,
            });
        });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("PostRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map