import "reflect-metadata";

import { ATMService } from "@modules/atm/atm.service";
import { ATMInMemoryRepository } from "@modules/atm/infra/inMemory/atm.repository";
import { TransactionInMemoryRepository } from "@modules/transaction/infra/inMemory/transaction.repository";

describe("[ATM Module]", () => {
  const transactionInMemoryRepository = new TransactionInMemoryRepository();

  const atmInMemoryRepository = new ATMInMemoryRepository(
    transactionInMemoryRepository
  );

  const atmService = new ATMService(atmInMemoryRepository);

  describe("withdraw", () => {
    it("Nao deve ser possivel sacar um valor maior do que o disponivel na conta", () => {
      expect(atmService.withdraw({ amount: 20000 })).rejects.toThrowError(
        "Não é possível sacar um valor maior do que o disponível em conta."
      );
    });
  });
});
