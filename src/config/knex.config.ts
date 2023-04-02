import { envs } from "./env.config";

export const knexconfig = {
  client: "pg",
  connection: {
    port: envs.databasePort,
    host: envs.databaseHost,
    user: envs.databaseUser,
    password: envs.databasePassword,
    database: envs.databaseDatabase,
  },
  seeds: {
    directory: "./src/shared/infra/knex/seeds",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/shared/infra/knex/migrations",
  },
};
