import { envs } from "@config/env.config";

export const knexConfigs = {
  client: "pg",
  connection: {
    port: envs.databasePort,
    host: envs.databaseHost,
    user: envs.databaseUser,
    password: envs.databasePassword,
    database: envs.databaseDatabase,
  },
  migrations: {
    directory: "../database/migrations",
  },
  seeds: {
    directory: "../database/seeds",
  },
};

export const knexInMemoryConfigs = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: { filename: "./src/database/gswBank.sqlite" },
};
