import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateKeyTokenTable1726917109826 implements MigrationInterface {
    name = 'UpdateKeyTokenTable1726917109826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`publicKey\``);
        await queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`privateKey\``);
        await queryRunner.query(`ALTER TABLE \`key_token\` ADD \`accessKey\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`key_token\` ADD \`refreshKey\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`refreshKey\``);
        await queryRunner.query(`ALTER TABLE \`key_token\` DROP COLUMN \`accessKey\``);
        await queryRunner.query(`ALTER TABLE \`key_token\` ADD \`privateKey\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`key_token\` ADD \`publicKey\` varchar(255) NOT NULL`);
    }

}
