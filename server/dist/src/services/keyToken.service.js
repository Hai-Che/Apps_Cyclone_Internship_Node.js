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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const keyToken_entity_1 = require("../entities/keyToken.entity");
const init_mysql_1 = __importDefault(require("../dbs/init.mysql"));
const keyTokenRepository = init_mysql_1.default.getRepository(keyToken_entity_1.KeyToken);
class keyTokenService {
}
_a = keyTokenService;
keyTokenService.createKeyToken = (_b) => __awaiter(void 0, [_b], void 0, function* ({ userId, accessKey, refreshKey, refreshToken = null, }) {
    try {
        let checkKeyToken = yield _a.findKeyStoreByUserId(userId);
        if (!checkKeyToken) {
            checkKeyToken = new keyToken_entity_1.KeyToken();
            checkKeyToken.userId = userId;
        }
        checkKeyToken.accessKey = accessKey;
        checkKeyToken.refreshKey = refreshKey;
        checkKeyToken.refreshToken = refreshToken;
        const tokens = yield keyTokenRepository.save(checkKeyToken);
        return tokens ? tokens.accessKey : null;
    }
    catch (error) {
        return error;
    }
});
keyTokenService.findKeyStoreByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield keyTokenRepository.findOne({ where: { userId } });
});
exports.default = keyTokenService;
//# sourceMappingURL=keyToken.service.js.map