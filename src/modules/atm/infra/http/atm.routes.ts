import { Router } from "express";

import { ATMController } from "./atm.controller";

const atmRoutes = Router();

atmRoutes
  .get("/extract", new ATMController().extract)
  .post("/deposit", new ATMController().deposit)
  .post("/withdraw", new ATMController().withdraw);

export { atmRoutes };
