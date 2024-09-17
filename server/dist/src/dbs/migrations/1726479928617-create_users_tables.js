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
exports.CreateUsersTables1726479928617 = void 0;
class CreateUsersTables1726479928617 {
    constructor() {
        this.name = 'CreateUsersTables1726479928617';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`UserAdvance\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(256) CHARACTER SET "utf8mb4" NULL, \`dob\` date NULL, \`profileUrl\` varchar(128) CHARACTER SET "utf8mb4" NULL, \`createdBy\` int NOT NULL DEFAULT '1', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` int NOT NULL DEFAULT '1', \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`first_name\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_name\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`userId\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`userName\` varchar(32) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`uass\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`uuid\` varchar(36) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`fullName\` varchar(128) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(16) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`createdBy\` int NOT NULL DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedBy\` int NOT NULL DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(64) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedDate\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedBy\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdDate\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdBy\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fullName\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`uuid\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`uass\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userName\``);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userId\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` int NOT NULL DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`last_name\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`first_name\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
            yield queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
            yield queryRunner.query(`DROP TABLE \`UserAdvance\``);
        });
    }
}
exports.CreateUsersTables1726479928617 = CreateUsersTables1726479928617;
//# sourceMappingURL=1726479928617-create_users_tables.js.map