import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createSchemaIfNotExists("gsw_bank_db");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists("gsw_bank_db");
}
