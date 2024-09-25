import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeTable1727249466771 implements MigrationInterface {
    name = 'UpdateSomeTable1727249466771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`UserAdvance\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(256) CHARACTER SET "utf8mb4" NULL, \`dob\` date NULL, \`profileUrl\` varchar(128) CHARACTER SET "utf8mb4" NULL, \`createdBy\` int NOT NULL DEFAULT '1', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` int NOT NULL DEFAULT '1', \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`key_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`accessKey\` varchar(255) NOT NULL, \`refreshKey\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(32) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`uass\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL, \`uuid\` varchar(36) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`fullName\` varchar(128) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`email\` varchar(64) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL, \`phoneNumber\` varchar(16) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL, \`createdBy\` int NOT NULL DEFAULT '1', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` int NOT NULL DEFAULT '1', \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`key_token\``);
        await queryRunner.query(`DROP TABLE \`UserAdvance\``);
    }

}
