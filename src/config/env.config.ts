import "dotenv/config";

import env from "env-var";

export const envs = {
  appPort: env.get("APP_PORT").required().asPortNumber(),
  databaseHost: env.get("DATABASE_HOST").required().asString(),
  databasePort: env.get("DATABASE_PORT").required().asPortNumber(),
  databaseUser: env.get("DATABASE_USER").required().asString(),
  databasePassword: env.get("DATABASE_PASSWORD").required().asString(),
  databaseDatabase: env.get("DATABASE_DATABASE").required().asString(),
};
