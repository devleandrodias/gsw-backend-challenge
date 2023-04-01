import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";
import { TransactionInMemoryRepository } from "@modules/transaction/infra/inMemory/transaction.repository";

describe("[Transaction Module]", () => {
  let transactionRepository: ITransactionRepository;

  beforeAll(() => {
    transactionRepository = new TransactionInMemoryRepository();
  });

  describe("#getBalance", () => {
    it("should be defined", () => {
      expect(transactionRepository).toBeDefined();
    });
  });

  describe("#getTransactions", () => {
    it("should be defined", () => {
      expect(transactionRepository).toBeDefined();
    });
  });

  describe("#createTransaction", () => {
    it("should be defined", () => {
      expect(transactionRepository).toBeDefined();
    });
  });
});
