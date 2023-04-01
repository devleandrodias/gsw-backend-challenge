import { inject, injectable } from "tsyringe";

import { IATMRepository } from "./repositories/IATMRepository";

@injectable()
export class ATMService {
  constructor(
    @inject("ATMRepository")
    private atmRepository: IATMRepository
  ) {}

  async deposit(value: number): Promise<void> {
    await this.atmRepository.deposit(value);
  }

  async withdraw(value: number): Promise<void> {
    const currentBalance = (await this.atmRepository.extract()).balance;

    if (currentBalance < value) {
      throw new Error(
        "Nao é possível sacar um valor maior do que o diponivel em conta"
      );
    }

    this.atmRepository.withdraw(value);
  }

  async extract(): Promise<{ balance: number }> {
    return this.atmRepository.extract();
  }
}
