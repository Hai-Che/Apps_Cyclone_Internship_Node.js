import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeTable1729061269243 implements MigrationInterface {
    name = 'UpdateSomeTable1729061269243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Post\` ADD \`postImages\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Post\` DROP COLUMN \`postImages\``);
    }

}
