import "reflect-metadata";

import { AppError } from "../src/shared/infra/http/erros/appError";
import { ETransactionType } from "../src/shared/enuns/ETransactionType";
import { TransactionService } from "../src/modules/transaction/transaction.service";
import { ITransactionRepository } from "../src/modules/transaction/repositories/ITransactionRepository";
import { TransactionInMemoryRepository } from "../src/modules/transaction/infra/inMemory/transaction.repository";

describe("[Transaction Module]", () => {
  let transactionService: TransactionService;
  let transactionRepository: ITransactionRepository;

  beforeEach(() => {
    transactionRepository = new TransactionInMemoryRepository();
    transactionService = new TransactionService(transactionRepository);
  });

  describe("#getBalance", () => {
    it("should correctly return the available balance to deposit and withdrawal transactions", async () => {
      await transactionService.createTransaction(ETransactionType.DEPOSIT, 100);
      await transactionService.createTransaction(ETransactionType.DEPOSIT, 200);
      await transactionService.createTransaction(ETransactionType.DEPOSIT, 300);
      await transactionService.createTransaction(
        ETransactionType.WITHDRAWAL,
        400
      );
      await transactionService.createTransaction(
        ETransactionType.WITHDRAWAL,
        100
      );

      const balance = await transactionService.getBalance();

      expect(balance).toEqual(100);
    });
  });

  describe("#getTransactions", () => {
    it("should be possible to get all the transactions made", async () => {
      const transactions = await transactionService.getTransactions();
      await transactionService.createTransaction(ETransactionType.DEPOSIT, 100);
      await transactionService.createTransaction(ETransactionType.DEPOSIT, 200);
      await transactionService.createTransaction(
        ETransactionType.WITHDRAWAL,
        50
      );

      expect(transactions.length).toEqual(3);
    });
  });

  describe("#createTransaction", () => {
    it("should not be possible to create a withdrawal transaction with less balance than available", () => {
      const response = transactionService.createTransaction(
        ETransactionType.WITHDRAWAL,
        100
      );

      expect(response).rejects.toBeInstanceOf(AppError);
      expect(response).rejects.toThrowError(
        "Não foi possível efetuar o saque porque o valor solicitado é maior do que o valor disponível"
      );
    });

    it("should not be possible to make transactions with negative amounts", () => {
      const response = transactionService.createTransaction(
        ETransactionType.DEPOSIT,
        -100
      );

      expect(response).rejects.toBeInstanceOf(AppError);
      expect(response).rejects.toThrowError(
        "Não é possível criar transações com valores negativos ou zero"
      );
    });

    it("should not be possible to make transactions with zero values", () => {
      const response = transactionService.createTransaction(
        ETransactionType.DEPOSIT,
        0
      );

      expect(response).rejects.toBeInstanceOf(AppError);
      expect(response).rejects.toThrowError(
        "Não é possível criar transações com valores negativos ou zero"
      );
    });

    it("should create a new transaction correctly", async () => {
      await transactionService.createTransaction(ETransactionType.DEPOSIT, 100);

      const balance = await transactionService.getBalance();
      const transctions = await transactionService.getTransactions();

      expect(balance).toEqual(100);
      expect(transctions.length).toEqual(1);
    });
  });
});
