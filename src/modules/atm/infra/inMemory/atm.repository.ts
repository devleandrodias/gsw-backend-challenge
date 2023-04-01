import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../../shared/infra/http/erros/appError";

import {
  IATMRepository,
  IDepositOutput,
  IExtractOutput,
  IWithdrawOutput,
} from "../../repositories/IATMRepository";

export class ATMInMemoryRepository implements IATMRepository {
  private balance: number;
  private availableBanknotes = [100, 50, 20, 10];

  constructor() {
    this.balance = 10000;
  }

  async deposit(value: number): Promise<IDepositOutput> {
    this.balance += value;

    return { balance: this.balance };
  }

  async withdraw(value: number): Promise<IWithdrawOutput> {
    const sortedNotes = this.availableBanknotes.sort((a, b) => b - a);

    const result = [];

    let remainingValue = value;

    for (const note of sortedNotes) {
      const noteCount = Math.floor(remainingValue / note);

      if (noteCount > 0) {
        result.push({ banknoteValue: note, banknoteQuantity: noteCount });
        remainingValue -= note * noteCount;
      }
    }

    if (remainingValue > 0) {
      throw new AppError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Não é possível retirar a quantia desejada com as notas disponíveis."
      );
    }

    this.balance -= value;

    return { result };
  }

  async extract(): Promise<IExtractOutput> {
    return { balance: this.balance };
  }
}
