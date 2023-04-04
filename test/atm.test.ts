import "reflect-metadata";

import { ATMService } from "../src/modules/atm/atm.service";
import { AppError } from "../src/shared/infra/http/erros/appError";
import { TransactionService } from "../src/modules/transaction/transaction.service";
import { IATMNoteRepository } from "../src/modules/atm/repositories/IATMNoteRepository";
import { ATMNoteInMemoryRepository } from "../src/modules/atm/infra/inMemory/atm.repository";
import { ITransactionRepository } from "../src/modules/transaction/repositories/ITransactionRepository";
import { TransactionInMemoryRepository } from "../src/modules/transaction/infra/inMemory/transaction.repository";

describe("[ATM Module]", () => {
  let atmNoteInMemoryRepository: IATMNoteRepository;
  let transactionRepository: ITransactionRepository;

  let atmService: ATMService;
  let transactionService: TransactionService;

  let getAvailableATMNotesSpy: jest.SpyInstance;

  beforeEach(() => {
    atmNoteInMemoryRepository = new ATMNoteInMemoryRepository();
    transactionRepository = new TransactionInMemoryRepository();

    transactionService = new TransactionService(transactionRepository);
    atmService = new ATMService(atmNoteInMemoryRepository, transactionService);
  });

  describe("#deposit", () => {
    it("should make a successful deposit and return current balance", async () => {
      const { balance } = await atmService.deposit({ amount: 100 });
      expect(balance).toEqual(100);
    });
  });

  describe("withdraw", () => {
    beforeEach(() => {
      getAvailableATMNotesSpy = jest.spyOn(
        ATMNoteInMemoryRepository.prototype,
        "getAvailableATMNotes"
      );
    });

    it("It should not be possible to make a withdrawal if there are not enough bills in the cash register for the requested amount.", async () => {
      getAvailableATMNotesSpy.mockResolvedValueOnce([
        { note: 100, quantity: 1 },
        { note: 50, quantity: 0 },
        { note: 20, quantity: 0 },
        { note: 10, quantity: 0 },
      ]);

      atmService.deposit({ amount: 1000 });
      const response = atmService.withdraw({ amount: 200 });

      expect(response).rejects.toBeInstanceOf(AppError);
      expect(response).rejects.toThrowError(
        "O caixa eletrônico não possui notas suficientes para entregar o valor solicitado"
      );
    });

    it("it should not be possible to make a withdrawal in an amount that the notes cannot be delivered", () => {
      getAvailableATMNotesSpy.mockResolvedValueOnce([
        { note: 100, quantity: 100 },
        { note: 50, quantity: 100 },
        { note: 20, quantity: 100 },
        { note: 10, quantity: 100 },
      ]);

      atmService.deposit({ amount: 1000 });
      const response = atmService.withdraw({ amount: 125 });

      expect(response).rejects.toBeInstanceOf(AppError);
      expect(response).rejects.toThrowError(
        "O caixa eletrônico não possui notas suficientes para entregar o valor solicitado"
      );
    });

    it("should delivery the least amount of notes required according to availability #1", async () => {
      getAvailableATMNotesSpy.mockResolvedValueOnce([
        { note: 100, quantity: 1000 },
        { note: 50, quantity: 1000 },
        { note: 20, quantity: 1000 },
        { note: 10, quantity: 1000 },
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
      getAvailableATMNotesSpy.mockResolvedValueOnce([
        { note: 100, quantity: 2 },
        { note: 50, quantity: 1 },
        { note: 20, quantity: 50 },
        { note: 10, quantity: 10 },
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
