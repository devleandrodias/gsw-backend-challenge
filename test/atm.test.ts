import "reflect-metadata";

import { ATMService } from "@modules/atm/atm.service";
import { AppError } from "@shared/infra/http/erros/appError";
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

  let getAvailableBankNotesSpy: jest.SpyInstance;

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
    beforeEach(() => {
      getAvailableBankNotesSpy = jest.spyOn(
        ATMInMemoryRepository.prototype,
        "getAvailableBankNotes"
      );
    });

    it("It should not be possible to make a withdrawal if there are not enough bills in the cash register for the requested amount.", async () => {
      getAvailableBankNotesSpy.mockResolvedValueOnce([
        { value: 100, quantityAvailable: 1 },
        { value: 50, quantityAvailable: 0 },
        { value: 20, quantityAvailable: 0 },
        { value: 10, quantityAvailable: 0 },
      ]);

      atmService.deposit({ amount: 1000 });
      const response = atmService.withdraw({ amount: 200 });

      expect(response).rejects.toBeInstanceOf(AppError);
      expect(response).rejects.toThrowError(
        "It is not possible to withdraw the desired amount with the available banknotes"
      );
    });

    it("it should not be possible to make a withdrawal in an amount that the notes cannot be delivered", () => {
      getAvailableBankNotesSpy.mockResolvedValueOnce([
        { value: 100, quantityAvailable: 100 },
        { value: 50, quantityAvailable: 100 },
        { value: 20, quantityAvailable: 100 },
        { value: 10, quantityAvailable: 100 },
      ]);

      atmService.deposit({ amount: 1000 });
      const response = atmService.withdraw({ amount: 125 });

      expect(response).rejects.toBeInstanceOf(AppError);
      expect(response).rejects.toThrowError(
        "It is not possible to withdraw the desired amount with the available banknotes"
      );
    });

    it("should delivery the least amount of notes required according to availability #1", async () => {
      getAvailableBankNotesSpy.mockResolvedValueOnce([
        { value: 100, quantityAvailable: 1000 },
        { value: 50, quantityAvailable: 1000 },
        { value: 20, quantityAvailable: 1000 },
        { value: 10, quantityAvailable: 1000 },
      ]);

      atmService.deposit({ amount: 1000 });

      const { notes } = await atmService.withdraw({ amount: 170 });

      expect(notes).toEqual([
        { note: 100, quantity: 1 },
        { note: 50, quantity: 1 },
        { note: 20, quantity: 1 },
      ]);
    });

    it("should delivery the least amount of notes required according to availability #2", async () => {
      getAvailableBankNotesSpy.mockResolvedValueOnce([
        { value: 100, quantityAvailable: 2 },
        { value: 50, quantityAvailable: 1 },
        { value: 20, quantityAvailable: 50 },
        { value: 10, quantityAvailable: 10 },
      ]);

      atmService.deposit({ amount: 1000 });

      const { notes } = await atmService.withdraw({ amount: 300 });

      expect(notes).toEqual([
        { note: 100, quantity: 2 },
        { note: 50, quantity: 1 },
        { note: 20, quantity: 2 },
        { note: 10, quantity: 1 },
      ]);
    });
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
