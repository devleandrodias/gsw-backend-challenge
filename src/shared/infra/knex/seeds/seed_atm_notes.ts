import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("atm_notes").del();

  await knex("atm_notes").insert([
    { note: 10, quantity: 100 },
    { note: 20, quantity: 100 },
    { note: 50, quantity: 100 },
    { note: 100, quantity: 100 },
  ]);
}
