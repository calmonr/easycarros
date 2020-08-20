import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePartnersTable1597867099204 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "partners" (
          "id" SERIAL NOT NULL,
          "name" character varying NOT NULL,
          "services" text array NOT NULL,
          "coordinates" geometry(Point) NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id")
        )
      `
    )

    await queryRunner.query(
      `CREATE INDEX "IDX_9e4b8ad94d17587264b671965c" ON "partners" USING GiST ("coordinates") `
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_9e4b8ad94d17587264b671965c"`)
    await queryRunner.query(`DROP TABLE "partners"`)
  }
}
