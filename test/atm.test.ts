import "reflect-metadata";

import { ATMService } from "@modules/atm/atm.service";
import { IATMRepository } from "@modules/atm/repositories/IATMRepository";
import { TransactionService } from "@modules/transaction/transaction.service";
import { ATMInMemoryRepository } from "@modules/atm/infra/inMemory/atm.repository";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";
import { TransactionInMemoryRepository } from "@modules/transaction/infra/inMemory/transaction.repository";

describe("[ATM Module]", () => {
  let atmInMemoryRepository: IATMRepository;
  let transactionRepository: ITransactionRepository;

  let atmService: ATMService;
  let transactionService: TransactionService;

  beforeEach(() => {
    atmInMemoryRepository = new ATMInMemoryRepository();
    transactionRepository = new TransactionInMemoryRepository();

    transactionService = new TransactionService(transactionRepository);
    atmService = new ATMService(atmInMemoryRepository, transactionService);
  });

  describe("withdraw", () => {
    it("should be defined", () => {
      expect(atmService).toBeDefined();
    });
  });
});
