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

  describe("#deposit", () => {
    it("should make a successful deposit and return current balance", async () => {
      const { balance } = await atmService.deposit({ amount: 100 });
      expect(balance).toEqual(100);
    });
  });

  describe("withdraw", () => {
    it.todo("should make a successful withdraw");
  });

  describe("#extract", () => {
    it("should return zero balance and empty transactions", async () => {
      const extract = await atmService.extract();

      expect(extract.balance).toEqual(0);
      expect(extract.transactions.length).toEqual(0);
    });

    it("return a statement with the current balance and all transactions carried out", async () => {
      await atmService.deposit({ amount: 100 });
      await atmService.deposit({ amount: 400 });
      await atmService.withdraw({ amount: 200 });
      await atmService.deposit({ amount: 50 });
      await atmService.deposit({ amount: 150 });

      const extract = await atmService.extract();

      expect(extract.balance).toEqual(500);
      expect(extract.transactions.length).toEqual(5);
    });
  });
});
