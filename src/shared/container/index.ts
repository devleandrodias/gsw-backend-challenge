import "reflect-metadata";

import { container } from "tsyringe";

import { IATMRepository } from "../../modules/atm/atm.repository";
import { ATMRepository } from "./../../modules/atm/atm.repository";

container.registerSingleton<IATMRepository>("ATMRepository", ATMRepository);
