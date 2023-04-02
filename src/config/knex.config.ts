import { envs } from "./env.config";

export const knexConfigs = {
  client: "pg",
  connection: {
    port: envs.databasePort,
    host: envs.databaseHost,
    user: envs.databaseUser,
    password: envs.databasePassword,
    database: envs.databaseDatabase,
  },
  seeds: { directory: "./src/database/seeds" },
  migrations: { directory: "./src/database/migrations" },
};

export const knexInMemoryConfigs = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: { filename: "./database/db.sqlite" },
};
