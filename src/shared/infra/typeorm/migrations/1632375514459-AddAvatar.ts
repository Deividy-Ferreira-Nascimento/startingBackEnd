import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { isNullishCoalesce } from "typescript";

export class AddAvatar1632375514459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable:true
      })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'avatar')
    }

}
