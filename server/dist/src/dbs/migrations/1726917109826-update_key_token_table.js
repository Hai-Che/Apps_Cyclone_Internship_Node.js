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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKeyTokenTable1726917109826 = void 0;
class UpdateKeyTokenTable1726917109826 {
    constructor() {
        this.name = 'UpdateKeyTokenTable1726917109826';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`publicKey\``);
            yield queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`privateKey\``);
            yield queryRunner.query(`ALTER TABLE \`key_token\` ADD \`accessKey\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`key_token\` ADD \`refreshKey\` varchar(255) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`refreshKey\``);
            yield queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`accessKey\``);
            yield queryRunner.query(`ALTER TABLE \`key_token\` ADD \`privateKey\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`key_token\` ADD \`publicKey\` varchar(255) NOT NULL`);
        });
    }
}
exports.UpdateKeyTokenTable1726917109826 = UpdateKeyTokenTable1726917109826;
//# sourceMappingURL=1726917109826-update_key_token_table.js.map