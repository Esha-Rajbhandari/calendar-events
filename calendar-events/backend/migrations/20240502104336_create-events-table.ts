import type { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("events", (table) => {
    table.increments("id");
    table.string("event_name", 255).notNullable();
    table.string("description", 2000).notNullable();
    table.timestamp("event_start_time");
    table.timestamp("event_end_time");
    table.bigInteger("created_by");
    table.timestamp("created_at");
    table.timestamp("updated_at");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("events");
}
