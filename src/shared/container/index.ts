import "reflect-metadata";

import { container } from "tsyringe";

import { IATMRepository } from "@modules/atm/repositories/IATMRepository";
import { ATMInMemoryRepository } from "@modules/atm/infra/inMemory/atm.repository";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";
import { TransactionInMemoryRepository } from "@modules/transaction/infra/inMemory/transaction.repository";

container.registerSingleton<IATMRepository>(
  "ATMRepository",
  ATMInMemoryRepository
);

container.registerSingleton<ITransactionRepository>(
  "TransactionRepository",
  TransactionInMemoryRepository
);
