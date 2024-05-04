import "dotenv/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "postgresql",
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: "./migrations",
      tableName: "migrations",
    },
  },
};
