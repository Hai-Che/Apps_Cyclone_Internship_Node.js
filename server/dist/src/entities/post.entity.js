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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostStatus = void 0;
const typeorm_1 = require("typeorm");
var PostStatus;
(function (PostStatus) {
    PostStatus["Draft"] = "Draft";
    PostStatus["Published"] = "Published";
    PostStatus["Deleted"] = "Deleted";
})(PostStatus || (exports.PostStatus = PostStatus = {}));
let Post = class Post {
};
exports.Post = Post;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 250 }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 2048 }),
    __metadata("design:type", String)
], Post.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 125 }),
    __metadata("design:type", String)
], Post.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Post.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 125 }),
    __metadata("design:type", String)
], Post.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array" }),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: PostStatus,
        default: PostStatus.Draft,
    }),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "totalComments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "updatedDate", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)("Post")
], Post);
//# sourceMappingURL=post.entity.js.map