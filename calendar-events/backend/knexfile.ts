import "dotenv/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "postgresql",
    connection: {
      port: 5432,
      user: "postgres",
      host: "localhost",
      database: "calendar-db",
      password: "postgres",
    },
    migrations: {
      directory: "./migrations",
      tableName: "migrations",
    },
  },
};
