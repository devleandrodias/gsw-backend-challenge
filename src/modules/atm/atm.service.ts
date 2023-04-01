import { inject, injectable } from "tsyringe";
import { StatusCodes } from "http-status-codes";

import { IATMExtractOutput } from "./dtos/atm.extract.dtos";
import { IATMRepository } from "./repositories/IATMRepository";
import { IATMDepositInput, IATMDepositOutput } from "./dtos/atm.deposit.dtos";

import { AppError } from "@shared/infra/http/erros/appError";
import { ETransactionType } from "@shared/enuns/ETransactionType";
import { TransactionService } from "@modules/transaction/transaction.service";

import {
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

    const notes: { note: number; quantity: number }[] = [];

    let remainingValue = amount;

    for (const bankNote of availableBankNotes) {
      if (bankNote.quantityAvailable <= 0) {
        continue;
      }

      const noteCount = Math.floor(remainingValue / bankNote.value);
      const actualNoteCount = Math.min(noteCount, bankNote.quantityAvailable);

      if (actualNoteCount > 0) {
        notes.push({
          note: bankNote.value,
          quantity: actualNoteCount,
        });

        remainingValue -= bankNote.value * actualNoteCount;

        bankNote.quantityAvailable -= actualNoteCount;
      }

      if (remainingValue === 0) {
        break;
      }
    }

    if (remainingValue > 0) {
      throw new AppError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "It is not possible to withdraw the desired amount with the available banknotes"
      );
    }

    await this.transactionService.createTransaction(
      ETransactionType.WITHDRAWAL,
      amount
    );

    return { notes };
  }

  async extract(): Promise<IATMExtractOutput> {
    return {
      balance: await this.transactionService.getBalance(),
      transactions: await this.transactionService.getTransactions(),
    };
  }
}
