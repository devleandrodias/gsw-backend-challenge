import { app } from "./app";

import { envs } from "../../../config/env.config";

app.listen(envs.appPort, () => {
  console.info(`Server started at ${envs.appPort}`);
});
