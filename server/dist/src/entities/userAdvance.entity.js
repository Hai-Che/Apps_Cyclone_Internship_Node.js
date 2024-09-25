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
exports.UserAdvance = void 0;
const typeorm_1 = require("typeorm");
let UserAdvance = class UserAdvance {
};
exports.UserAdvance = UserAdvance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAdvance.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, charset: "utf8mb4", nullable: true }),
    __metadata("design:type", String)
], UserAdvance.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], UserAdvance.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, charset: "utf8mb4", nullable: true }),
    __metadata("design:type", String)
], UserAdvance.prototype, "profileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], UserAdvance.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserAdvance.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], UserAdvance.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserAdvance.prototype, "updatedDate", void 0);
exports.UserAdvance = UserAdvance = __decorate([
    (0, typeorm_1.Entity)("UserAdvance")
], UserAdvance);
//# sourceMappingURL=userAdvance.entity.js.map