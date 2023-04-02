import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("atm_notes", (table) => {
    table.increments("id").primary();
    table.integer("note").notNullable();
    table.integer("quantity").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("atm_notes");
}
