import { inject, injectable } from "tsyringe";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@shared/infra/http/erros/appError";

import { IATMExtractOutput } from "./dtos/atm.extract.dtos";
import { IATMRepository } from "./repositories/IATMRepository";
import { IATMDepositInput, IATMDepositOutput } from "./dtos/atm.deposit.dtos";

import {
  IATMWithdrawInput,
  IATMWithdrawOutput,
} from "./dtos/atm.withdraw.dtos";

@injectable()
export class ATMService {
  constructor(
    @inject("ATMRepository")
    private readonly atmRepository: IATMRepository
  ) {}

  async deposit({ amount }: IATMDepositInput): Promise<IATMDepositOutput> {
    return this.atmRepository.deposit(amount);
  }

  async withdraw({ amount }: IATMWithdrawInput): Promise<IATMWithdrawOutput> {
    const currentBalance = (await this.atmRepository.extract()).balance;

    if (currentBalance < amount) {
      throw new AppError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Não é possível sacar um valor maior do que o disponível em conta."
      );
    }

    return this.atmRepository.withdraw(amount);
  }

  async extract(): Promise<IATMExtractOutput> {
    return this.atmRepository.extract();
  }
}
