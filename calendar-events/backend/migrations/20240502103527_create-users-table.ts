import type { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex) {
  return knex.schema.createTableIfNotExists("users", (table) => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("email", 255);
    table.timestamp("created_at");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("users");
}
