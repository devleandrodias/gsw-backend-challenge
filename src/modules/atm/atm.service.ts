import { inject, injectable } from "tsyringe";
import { StatusCodes } from "http-status-codes";

import { IATMExtractOutput } from "./dtos/atm.extract.dtos";
import { IATMRepository } from "./repositories/IATMRepository";
import { IATMDepositInput, IATMDepositOutput } from "./dtos/atm.deposit.dtos";

import { AppError } from "@shared/infra/http/erros/appError";
import { ETransactionType } from "@shared/enuns/ETransactionType";
import { TransactionService } from "@modules/transaction/transaction.service";

import {
  IBankNote,
  IATMWithdrawInput,
  IATMWithdrawOutput,
} from "./dtos/atm.withdraw.dtos";

@injectable()
export class ATMService {
  constructor(
    @inject("ATMRepository")
    private readonly atmRepository: IATMRepository,
    private readonly transactionService: TransactionService
  ) {}

  async deposit({ amount }: IATMDepositInput): Promise<IATMDepositOutput> {
    await this.transactionService.createTransaction(
      ETransactionType.DEPOSIT,
      amount
    );

    const balance = await this.transactionService.getBalance();

    return { balance };
  }

  async withdraw({ amount }: IATMWithdrawInput): Promise<IATMWithdrawOutput> {
    const availableBankNotes = await this.atmRepository.getAvailableBankNotes();

    const sortedNotes = availableBankNotes.sort((a, b) => b - a);

    const bankNotes: IBankNote[] = [];

    let remainingValue = amount;

    for (const note of sortedNotes) {
      const noteCount = Math.floor(remainingValue / note);

      if (noteCount > 0) {
        bankNotes.push({ value: note, quantity: noteCount });
        remainingValue -= note * noteCount;
      }
    }

    if (remainingValue > 0) {
      throw new AppError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Não é possível retirar a quantia desejada com as notas disponíveis."
      );
    }

    await this.transactionService.createTransaction(
      ETransactionType.WITHDRAWAL,
      amount
    );

    return { bankNotes };
  }

  async extract(): Promise<IATMExtractOutput> {
    return {
      balance: await this.transactionService.getBalance(),
      transactions: await this.transactionService.getTransactions(),
    };
  }
}
