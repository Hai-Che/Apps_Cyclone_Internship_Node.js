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
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.createComment(body, request.userId);
        });
    }
    updateComment(commentId, body, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.updateComment(commentId, body, request.userId);
        });
    }
    deleteComment(commentId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.deleteComment(commentId, request.userId);
        });
    }
    getComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.getComment(commentId);
        });
    }
    hideComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.hideComment(commentId);
        });
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
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __param(2, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getComment", null);
__decorate([
    (0, routing_controllers_1.Put)("/hide/:id"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware, authMiddleware_1.RoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "hideComment", null);
exports.CommentController = CommentController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/comment"),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map