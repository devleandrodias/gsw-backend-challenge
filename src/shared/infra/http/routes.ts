import { Router } from "express";

import { atmRoutes } from "../../../modules/atm/infra/http/atm.routes";

const routes = Router();

routes.use("/atm", atmRoutes);

export { routes };
