import knex from "knex";

import { knexInMemoryConfigs } from "@config/knex.config";

export const knexDataSource = knex(knexInMemoryConfigs);
