import "reflect-metadata";

import { container } from "tsyringe";

import { IATMRepository } from "@modules/atm/repositories/IATMRepository";
import { ATMInMemoryRepository } from "@modules/atm/infra/inMemory/atm.repository";

container.registerSingleton<IATMRepository>(
  "ATMRepository",
  ATMInMemoryRepository
);
