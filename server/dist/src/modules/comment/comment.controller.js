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
exports.CommentController = void 0;
const routing_controllers_1 = require("routing-controllers");
const comment_service_1 = require("./comment.service");
const typedi_1 = require("typedi");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const comment_dto_1 = require("./comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    createComment(body, request) {
        return this.commentService.createComment(body, request.userId);
    }
    updateComment(commentId, body, request) {
        return this.commentService.updateComment(commentId, body, request.userId);
    }
    deleteComment(commentId, request) {
        return this.commentService.deleteComment(commentId, request.userId);
    }
    getCommentsByUser(page = 1, limit = 10, request) {
        return this.commentService.getCommentsByUser(page, limit, request.userId);
    }
    getComment(commentId) {
        return this.commentService.getComment(commentId);
    }
    getCommentOfPost(postId, sort, page = 1, limit = 10) {
        return this.commentService.getCommentOfPost(postId, sort, page, limit);
    }
    getRepliesOfComment(commentId, page = 1, limit = 10) {
        return this.commentService.getRepliesOfComment(commentId, page, limit);
    }
    hideComment(commentId) {
        return this.commentService.hideComment(commentId);
    }
    handleLikeComment(commentId, request) {
        return this.commentService.handleLikeComment(commentId, request.userId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, routing_controllers_1.Post)("/"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __param(2, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "updateComment", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, routing_controllers_1.Get)("/user/"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.QueryParam)("page")),
    __param(1, (0, routing_controllers_1.QueryParam)("limit")),
    __param(2, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getCommentsByUser", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getComment", null);
__decorate([
    (0, routing_controllers_1.Get)("/post/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.QueryParam)("sort")),
    __param(2, (0, routing_controllers_1.QueryParam)("page")),
    __param(3, (0, routing_controllers_1.QueryParam)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getCommentOfPost", null);
__decorate([
    (0, routing_controllers_1.Get)("/replies/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.QueryParam)("page")),
    __param(2, (0, routing_controllers_1.QueryParam)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getRepliesOfComment", null);
__decorate([
    (0, routing_controllers_1.Put)("/hide/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware, authMiddleware_1.RoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "hideComment", null);
__decorate([
    (0, routing_controllers_1.Post)("/like/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "handleLikeComment", null);
exports.CommentController = CommentController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/comment"),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map