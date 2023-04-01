import { Router } from "express";

import { atmRoutes } from "../../../modules/atm/atm.routes";

const routes = Router();

routes.use("/atm", atmRoutes);

export { routes };
