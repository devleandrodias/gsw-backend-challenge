import { envs } from "@config/env.config";

import { app } from "./app";

app.listen(envs.appPort, () => {
  console.info(`Server started at ${envs.appPort}`);
});
