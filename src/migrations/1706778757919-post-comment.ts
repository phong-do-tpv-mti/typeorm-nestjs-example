import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostComment1706778757919 implements MigrationInterface {
  name = 'PostComment1706778757919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "postId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`,
    );
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
