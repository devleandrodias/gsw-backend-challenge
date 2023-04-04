import "reflect-metadata";

import { container } from "tsyringe";
import { ATMNoteRepository } from "../../modules/atm/infra/knex/atm.repository";
import { IATMNoteRepository } from "../../modules/atm/repositories/IATMNoteRepository";
import { TransactionRepository } from "../../modules/transaction/infra/knex/transaction.repository";
import { ITransactionRepository } from "../../modules/transaction/repositories/ITransactionRepository";

container.registerSingleton<IATMNoteRepository>(
  "ATMNoteRepository",
  ATMNoteRepository
);

container.registerSingleton<ITransactionRepository>(
  "TransactionRepository",
  TransactionRepository
);
