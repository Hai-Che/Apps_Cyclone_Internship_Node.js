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
exports.AccessController = void 0;
const routing_controllers_1 = require("routing-controllers");
const access_service_1 = require("./access.service");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_dto_1 = require("../user/user.dto");
const access_dto_1 = require("./access.dto");
const typedi_1 = require("typedi");
let AccessController = class AccessController {
    constructor(accessService) {
        this.accessService = accessService;
    }
    register(body) {
        return this.accessService.register(body);
    }
    login(body) {
        return this.accessService.login(body);
    }
    logout(request) {
        const { userId, sessionId } = request;
        return this.accessService.logout(userId, sessionId);
    }
    handleRefreshToken(request) {
        const { userId, sessionId } = request;
        return this.accessService.handleRefreshToken(userId, sessionId);
    }
    verify(body) {
        return this.accessService.verify(body);
    }
};
exports.AccessController = AccessController;
__decorate([
    (0, routing_controllers_1.Post)("/register"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [access_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Post)("/logout"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.AuthMiddleware),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "logout", null);
__decorate([
    (0, routing_controllers_1.Post)("/handleRefreshToken"),
    (0, routing_controllers_1.UseBefore)(authMiddleware_1.RefreshTokenMiddleware),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "handleRefreshToken", null);
__decorate([
    (0, routing_controllers_1.Post)("/verify"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [access_dto_1.VerifyUserDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "verify", null);
exports.AccessController = AccessController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/access"),
    __metadata("design:paramtypes", [access_service_1.AccessService])
], AccessController);
//# sourceMappingURL=access.controller.js.map