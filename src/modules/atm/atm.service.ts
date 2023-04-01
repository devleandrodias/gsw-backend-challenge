import { inject, injectable } from "tsyringe";

import { IATMWithdrawRequest } from "./infra/http/atm.controller";

import {
  IATMRepository,
  IDepositOutput,
  IExtractOutput,
  IWithdrawOutput,
} from "./repositories/IATMRepository";

@injectable()
export class ATMService {
  constructor(
    @inject("ATMRepository")
    private readonly atmRepository: IATMRepository
  ) {}

  async deposit({ value }: IATMWithdrawRequest): Promise<IDepositOutput> {
    return this.atmRepository.deposit(value);
  }

  async withdraw({ value }: IATMWithdrawRequest): Promise<IWithdrawOutput> {
    const currentBalance = (await this.atmRepository.extract()).balance;

    if (currentBalance < value) {
      throw new Error(
        "Nao é possível sacar um valor maior do que o diponivel em conta"
      );
    }

    return this.atmRepository.withdraw(value);
  }

  async extract(): Promise<IExtractOutput> {
    return this.atmRepository.extract();
  }
}
