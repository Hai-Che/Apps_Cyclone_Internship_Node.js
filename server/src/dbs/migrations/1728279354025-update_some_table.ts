import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeTable1728279354025 implements MigrationInterface {
    name = 'UpdateSomeTable1728279354025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`UserAdvance\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(256) CHARACTER SET "utf8mb4" NULL, \`dob\` date NULL, \`profileUrl\` varchar(128) CHARACTER SET "utf8mb4" NULL, \`createdBy\` int NOT NULL DEFAULT '1', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` int NOT NULL DEFAULT '1', \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(32) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`uass\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL, \`uuid\` varchar(36) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`fullName\` varchar(128) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`email\` varchar(64) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL, \`phoneNumber\` varchar(16) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL, \`createdBy\` int NOT NULL DEFAULT '1', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` int NOT NULL DEFAULT '1', \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`salt\` varchar(255) NULL, \`role\` enum ('User', 'Admin', 'Moderator') NOT NULL DEFAULT 'User', \`gender\` enum ('Male', 'Female', 'Others') NOT NULL DEFAULT 'Male', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`UserAdvance\``);
    }

}
