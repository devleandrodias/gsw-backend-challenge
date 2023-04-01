import "../../container";

import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { routes } from "./routes";

import swaggerDocument from "../../../swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app };