import { ATMController } from "../src/modules/atm/atm.controller";

describe("ATM Module", () => {
  const atmController = new ATMController();

  describe("withdraw", () => {
    it("Nao deve ser possivel sacar um valor maior do que o disponivel na conta", () => {
      expect(atmController.withdraw(15000)).rejects.toThrowError(
        "Nao é possível sacar um valor maior do que o diponivel em conta"
      );
    });
  });
});
