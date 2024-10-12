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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const typedi_1 = require("typedi");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(id, request) {
        return this.userService.getUser(id, request.userId);
    }
    updateUser(body, request) {
        return this.userService.updateUser(body, request.userId);
    }
    deleteUser(id, request) {
        return this.userService.deleteUser(id, request.userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, routing_controllers_1.Put)("/"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AccessTokenMiddleware),
    (0, routing_controllers_1.JsonController)("/user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map