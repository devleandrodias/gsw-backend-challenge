import { inject } from "tsyringe";
import { StatusCodes } from "http-status-codes";

import { AppError } from "@shared/infra/http/erros/appError";
import { ETransactionType } from "@shared/enuns/ETransactionType";

import { IATMExtractOutput } from "@modules/atm/dtos/atm.extract.dtos";
import { IATMDepositOutput } from "@modules/atm/dtos/atm.deposit.dtos";
import { IATMRepository } from "@modules/atm/repositories/IATMRepository";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

import {
  IATMWithdrawOutput,
  IBankNote,
} from "@modules/atm/dtos/atm.withdraw.dtos";

export class ATMInMemoryRepository implements IATMRepository {
  private readonly availableBanknotes = [100, 50, 20, 10];

  constructor(
    @inject("TransactionRepository")
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async deposit(amount: number): Promise<IATMDepositOutput> {
    const balance = await this.transactionRepository.createTransaction(
      ETransactionType.DEPOSIT,
      amount
    );

    return { balance };
  }

  async withdraw(amount: number): Promise<IATMWithdrawOutput> {
    const sortedNotes = this.availableBanknotes.sort((a, b) => b - a);

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

    const balance = await this.transactionRepository.createTransaction(
      ETransactionType.WITHDRAWAL,
      amount
    );

    return { balance, bankNotes };
  }

  async extract(): Promise<IATMExtractOutput> {
    const balance = await this.transactionRepository.getBalance();
    const transactions = await this.transactionRepository.getTransactions();

    return { balance, transactions };
  }
}
