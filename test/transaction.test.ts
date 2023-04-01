import { ETransactionType } from "@shared/enuns/ETransactionType";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";
import { TransactionInMemoryRepository } from "@modules/transaction/infra/inMemory/transaction.repository";

describe("[Transaction Module]", () => {
  let transactionRepository: ITransactionRepository;

  describe("#getBalance", () => {
    it("should correctly return the available balance to deposit and withdrawal transactions", async () => {
      // Arange
      transactionRepository = new TransactionInMemoryRepository();

      // Act
      transactionRepository.createTransaction(ETransactionType.DEPOSIT, 100);
      transactionRepository.createTransaction(ETransactionType.DEPOSIT, 200);
      transactionRepository.createTransaction(ETransactionType.DEPOSIT, 300);
      transactionRepository.createTransaction(ETransactionType.WITHDRAWAL, 400);
      transactionRepository.createTransaction(ETransactionType.WITHDRAWAL, 100);

      const balance = await transactionRepository.getBalance();

      // Assert
      expect(balance).toEqual(100);
    });
  });

  describe("#getTransactions", () => {
    it("should be possible to get all the transactions made", async () => {
      // Arange
      transactionRepository = new TransactionInMemoryRepository();

      // Act
      const transactions = await transactionRepository.getTransactions();
      transactionRepository.createTransaction(ETransactionType.DEPOSIT, 100);
      transactionRepository.createTransaction(ETransactionType.DEPOSIT, 200);
      transactionRepository.createTransaction(ETransactionType.WITHDRAWAL, 50);

      // Assert
      expect(transactions.length).toEqual(3);
    });
  });

  describe("#createTransaction", () => {
    it("should create a new transaction correctly", async () => {
      // Arange
      transactionRepository = new TransactionInMemoryRepository();

      // Act
      transactionRepository.createTransaction(ETransactionType.DEPOSIT, 100);

      const balance = await transactionRepository.getBalance();
      const transctions = await transactionRepository.getTransactions();

      // Assert
      expect(balance).toEqual(100);
      expect(transctions.length).toEqual(1);
    });

    it.todo(
      "it should not be possible to create a withdrawal transaction with less balance than available"
    );
  });
});
