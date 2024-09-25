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
exports.getUserById = void 0;
const init_mysql_1 = __importDefault(require("../../dbs/init.mysql"));
const user_entity_1 = require("../user.entity");
const userRepository = init_mysql_1.default.getRepository(user_entity_1.User);
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOne({ where: { userId } });
});
exports.getUserById = getUserById;
//# sourceMappingURL=user.repo.js.map