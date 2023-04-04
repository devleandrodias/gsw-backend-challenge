import { app } from "./app";
import { knexDataSource } from "../knex";
import { envs } from "../../../config/env.config";

knexDataSource
  .raw("SELECT 1+1 AS result")
  .then(() => {
    console.log("Database connection established");

    app.listen(envs.appPort, () => {
      console.info(`Server started at ${envs.appPort}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });
