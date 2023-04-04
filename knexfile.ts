import "dotenv/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
    },
    seeds: {
      directory: "./src/shared/infra/knex/seeds",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/shared/infra/knex/migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
    },
    seeds: {
      directory: "./src/shared/infra/knex/seeds",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/shared/infra/knex/migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
    },
    seeds: {
      directory: "./src/shared/infra/knex/seeds",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/shared/infra/knex/migrations",
    },
  },
};
