import knex from "knex";

import { knexconfig } from "@config/knex.config";

export const knexDataSource = knex(knexconfig);
