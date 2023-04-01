import "dotenv/config";

import env from "env-var";

export const envs = {
  appPort: env.get("APP_PORT").required().asPortNumber(),
};
