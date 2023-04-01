import "reflect-metadata";

import { container } from "tsyringe";

import { IATMRepository } from "@modules/atm/repositories/IATMRepository";
import { ATMInMemoryRepository } from "@modules/atm/infra/inMemory/atm.repository";
import { TransactionRepository } from "@modules/transaction/infra/knex/transaction.repository";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

container.registerSingleton<IATMRepository>(
  "ATMRepository",
  ATMInMemoryRepository
);

container.registerSingleton<ITransactionRepository>(
  "TransactionRepository",
  TransactionRepository
);
