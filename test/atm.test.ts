import "reflect-metadata";

import { ATMService } from "@modules/atm/atm.service";
import { ATMInMemoryRepository } from "@modules/atm/infra/inMemory/atm.repository";

describe("ATM Module", () => {
  const atmInMemoryRepository = new ATMInMemoryRepository();
  const atmService = new ATMService(atmInMemoryRepository);

  describe("withdraw", () => {
    it("Nao deve ser possivel sacar um valor maior do que o disponivel na conta", () => {
      expect(atmService.withdraw({ value: 20000 })).rejects.toThrowError(
        "Não é possível sacar um valor maior do que o disponível em conta."
      );
    });
  });
});
