import { inject, injectable } from "tsyringe";

import { IATMRepository } from "./repositories/IATMRepository";
import { IATMWithdrawRequest } from "./infra/http/atm.controller";

@injectable()
export class ATMService {
  constructor(
    @inject("ATMRepository")
    private readonly atmRepository: IATMRepository
  ) {}

  async deposit({ value }: IATMWithdrawRequest): Promise<void> {
    await this.atmRepository.deposit(value);
  }

  async withdraw({ value }: IATMWithdrawRequest): Promise<void> {
    const currentBalance = (await this.atmRepository.extract()).balance;

    if (currentBalance < value) {
      throw new Error(
        "Nao é possível sacar um valor maior do que o diponivel em conta"
      );
    }

    await this.atmRepository.withdraw(value);
  }

  async extract(): Promise<{ balance: number }> {
    return this.atmRepository.extract();
  }
}
