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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const post_service_1 = require("./post.service");
const post_dto_1 = require("./post.dto");
const fileUploadMiddleware_1 = require("../../middleware/fileUploadMiddleware");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    createPost(body, request) {
        return this.postService.createPost(body, request.userId);
    }
    updatePost(postId, body, request) {
        return this.postService.updatePost(postId, body, request.userId);
    }
    getPost(postId, request) {
        return this.postService.getPost(postId, request.userId);
    }
    getPostsByCategory(category, page = 1, limit = 10, request) {
        return this.postService.getPostsByCategory(category, page, limit, request.userId);
    }
    getViewedPost(request, page = 1, limit = 10) {
        return this.postService.getViewedPost(request.userId, page, limit);
    }
    getSavedPost(request, page = 1, limit = 10) {
        return this.postService.getSavedPost(request.userId, page, limit);
    }
    savedPost(postId, request) {
        return this.postService.savedPost(postId, request.userId);
    }
    publishedPost(postId) {
        return this.postService.publishedPost(postId);
    }
    deletedPost(postId) {
        return this.postService.deletedPost(postId);
    }
    searchPosts(keyword, page = 1, limit = 10) {
        return this.postService.searchPosts(keyword, page, limit);
    }
    getPostStats() {
        return this.postService.getPostStats();
    }
    uploadPostPicture(postId, request) {
        const files = request.files;
        return this.postService.uploadPostPicture(postId, request.userId, files);
    }
};
exports.PostController = PostController;
__decorate([
    (0, routing_controllers_1.Post)("/"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware, authMiddleware_1.RoleMiddleware),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware, authMiddleware_1.RoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __param(2, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, routing_controllers_1.Get)("/detail/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.GuestCheckMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPost", null);
__decorate([
    (0, routing_controllers_1.Get)("/category/:category"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.GuestCheckMiddleware),
    __param(0, (0, routing_controllers_1.Param)("category")),
    __param(1, (0, routing_controllers_1.QueryParam)("page")),
    __param(2, (0, routing_controllers_1.QueryParam)("limit")),
    __param(3, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostsByCategory", null);
__decorate([
    (0, routing_controllers_1.Get)("/viewed-post"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)("page")),
    __param(2, (0, routing_controllers_1.QueryParam)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getViewedPost", null);
__decorate([
    (0, routing_controllers_1.Get)("/saved-post"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)("page")),
    __param(2, (0, routing_controllers_1.QueryParam)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getSavedPost", null);
__decorate([
    (0, routing_controllers_1.Post)("/saved-post/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "savedPost", null);
__decorate([
    (0, routing_controllers_1.Post)("/published/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware, authMiddleware_1.RoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "publishedPost", null);
__decorate([
    (0, routing_controllers_1.Post)("/deleted/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware, authMiddleware_1.RoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletedPost", null);
__decorate([
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.QueryParam)("keyword")),
    __param(1, (0, routing_controllers_1.QueryParam)("page")),
    __param(2, (0, routing_controllers_1.QueryParam)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "searchPosts", null);
__decorate([
    (0, routing_controllers_1.Get)("/stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostStats", null);
__decorate([
    (0, routing_controllers_1.Post)("/upload/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware, fileUploadMiddleware_1.uploadDisk.array("files", 3)),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "uploadPostPicture", null);
exports.PostController = PostController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/posts"),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map