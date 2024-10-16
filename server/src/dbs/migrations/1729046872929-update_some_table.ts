import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeTable1729046872929 implements MigrationInterface {
    name = 'UpdateSomeTable1729046872929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Comment\` ADD \`likes\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Comment\` DROP COLUMN \`likes\``);
    }

}
