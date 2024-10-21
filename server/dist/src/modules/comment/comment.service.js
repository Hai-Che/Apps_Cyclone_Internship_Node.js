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
exports.CommentService = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
const post_entity_1 = require("../../entities/post.entity");
let CommentService = class CommentService {
    constructor(commentRepository, postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }
    createComment(body, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentBefore = yield this.commentRepository.findOne({
                where: {
                    postId: body.postId,
                    userId: currentUserId,
                    parentCommentId: (0, typeorm_1.IsNull)(),
                },
            });
            if (commentBefore && !body.parentCommentId) {
                throw new routing_controllers_1.BadRequestError("You had comment this post before!");
            }
            body.userId = currentUserId;
            body.replies = [];
            body.likes = [];
            const comment = yield this.commentRepository.save(body);
            if (body.parentCommentId) {
                const parentComment = yield this.commentRepository.findOne({
                    where: { id: body.parentCommentId },
                });
                if (!parentComment) {
                    throw new routing_controllers_1.BadRequestError("Parent comment not existed!");
                }
                if (parentComment.parentCommentId) {
                    const rootComment = yield this.commentRepository.findOne({
                        where: { id: parentComment.parentCommentId },
                    });
                    rootComment.replies = [...rootComment.replies, comment.id.toString()];
                    yield this.commentRepository.save(rootComment);
                    yield this.commentRepository.update(comment.id, {
                        parentCommentId: rootComment.id,
                    });
                }
                else {
                    parentComment.replies = [
                        ...parentComment.replies,
                        comment.id.toString(),
                    ];
                    yield this.commentRepository.save(parentComment);
                }
            }
            yield this.postRepository.increment({ postId: body.postId }, "totalComments", 1);
            return comment;
        });
    }
    updateComment(commentId_1, _a, currentUserId_1) {
        return __awaiter(this, arguments, void 0, function* (commentId, { content }, currentUserId) {
            const checkComment = yield this.commentRepository.findOne({
                where: { id: commentId },
            });
            if (!checkComment) {
                throw new routing_controllers_1.BadRequestError("Comment not found");
            }
            if (checkComment.userId !== currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Action denied!");
            }
            yield this.commentRepository.update({ id: commentId }, { content });
            return { message: "Update successfully!" };
        });
    }
    deleteComment(commentId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkComment = yield this.commentRepository.findOne({
                where: { id: commentId },
            });
            if (!checkComment) {
                throw new routing_controllers_1.BadRequestError("Comment not found");
            }
            if (checkComment.userId !== currentUserId) {
                throw new routing_controllers_1.ForbiddenError("Action denied!");
            }
            if (checkComment.replies.length) {
                const replies = yield this.commentRepository.find({
                    where: { id: (0, typeorm_1.In)(checkComment.replies) },
                });
                yield this.commentRepository.remove(replies);
                yield this.postRepository.decrement({ postId: checkComment.postId }, "totalComments", replies.length);
            }
            if (checkComment.parentCommentId) {
                const parentComment = yield this.commentRepository.findOne({
                    where: { id: checkComment.parentCommentId },
                });
                if (!parentComment) {
                    throw new routing_controllers_1.BadRequestError("Parent comment not existed!");
                }
                parentComment.replies = parentComment.replies.filter((reply) => reply !== checkComment.id.toString());
                yield this.commentRepository.save(parentComment);
            }
            yield this.postRepository.decrement({ postId: checkComment.postId }, "totalComments", 1);
            return yield this.commentRepository.remove(checkComment);
        });
    }
    getComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootComment = yield this.commentRepository.findOne({
                where: { id: commentId, isHidden: false },
            });
            if (!rootComment) {
                throw new routing_controllers_1.BadRequestError("Comment not found or available!");
            }
            const childComment = [];
            yield Promise.all(rootComment.replies.map((cmt) => __awaiter(this, void 0, void 0, function* () {
                const comment = yield this.commentRepository.findOne({
                    where: { id: Number(cmt), isHidden: false },
                });
                if (comment)
                    childComment.push(comment);
            })));
            return { rootComment, childComment };
        });
    }
    getCommentOfPost(postId, sort, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.findOne({ where: { postId } });
            if (!post || post.status !== post_entity_1.PostStatus.Published) {
                throw new routing_controllers_1.BadRequestError("This post not available right now");
            }
            const skip = (page - 1) * limit;
            let comments;
            if (sort === "date") {
                comments = yield this.commentRepository.find({
                    where: { postId },
                    order: { createdDate: "DESC" },
                    skip,
                    take: limit,
                });
            }
            else {
                comments = yield this.commentRepository
                    .createQueryBuilder("comment")
                    .where("comment.postId = :postId", { postId })
                    .orderBy("LENGTH(comment.likes)", "DESC")
                    .skip(skip)
                    .take(limit)
                    .getMany();
            }
            return comments.map((comment) => (Object.assign(Object.assign({}, comment), { repliesCount: comment.replies.length, likesCount: comment.likes.length })));
        });
    }
    getRepliesOfComment(parentCommentId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkComment = yield this.commentRepository.findOne({
                where: { id: parentCommentId },
            });
            if (!checkComment) {
                throw new routing_controllers_1.BadRequestError("Comment not found");
            }
            if (!checkComment.replies.length) {
                throw new routing_controllers_1.BadRequestError("Nobody reply!");
            }
            const skip = (page - 1) * limit;
            return yield this.commentRepository.find({
                where: { parentCommentId },
                order: { createdDate: "DESC" },
                skip,
                take: limit,
            });
        });
    }
    getCommentsByUser(page, limit, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            return yield this.commentRepository.find({
                where: { userId: currentUserId },
                order: { createdDate: "DESC" },
                skip,
                take: limit,
            });
        });
    }
    hideComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentRepository.findOne({
                where: { id: commentId },
            });
            if (!comment) {
                throw new routing_controllers_1.BadRequestError("Comment not found");
            }
            return yield this.commentRepository.update({ id: commentId }, { isHidden: !comment.isHidden });
        });
    }
    handleLikeComment(commentId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkComment = yield this.commentRepository.findOne({
                where: { id: commentId },
            });
            if (!checkComment) {
                throw new routing_controllers_1.BadRequestError("Comment not found");
            }
            if (checkComment.likes) {
                checkComment.likes = checkComment.likes.includes(currentUserId.toString())
                    ? checkComment.likes.filter((item) => item != currentUserId.toString())
                    : [...checkComment.likes, currentUserId.toString()];
            }
            else {
                checkComment.likes = [currentUserId.toString()];
            }
            yield this.commentRepository.save(checkComment);
            return { checkComment };
        });
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("CommentRepository")),
    __param(1, (0, typedi_1.Inject)("PostRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], CommentService);
//# sourceMappingURL=comment.service.js.map