import "reflect-metadata"

import { ATMService } from './../src/modules/atm/atm.service';

describe("ATM Module", () => {
  const atmService = new ATMService();

  describe("withdraw", () => {
    it("Nao deve ser possivel sacar um valor maior do que o disponivel na conta", () => {
      expect(atmService.withdraw(15000)).rejects.toThrowError(
        "Nao é possível sacar um valor maior do que o diponivel em conta"
      );
    });
  });
});
