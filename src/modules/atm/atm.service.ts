import { inject, injectable } from "tsyringe";
import { StatusCodes } from "http-status-codes";

import { IATMExtractOutput } from "./dtos/atm.extract.dtos";
import { IATMNoteRepository } from "./repositories/IATMNoteRepository";
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
    @inject("ATMNoteRepository")
    private readonly atmNoteRepository: IATMNoteRepository,
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
    const bankNotes = await this.atmNoteRepository.getAvailableATMNotes();

    const notes: { note: number; quantity: number }[] = [];

    let remainingValue = amount;

    const bankNotesSorted = bankNotes.sort((a, b) => b.note - a.note);

    for (const bankNote of bankNotesSorted) {
      if (bankNote.quantity <= 0) {
        continue;
      }

      const noteCount = Math.floor(remainingValue / bankNote.note);
      const actualNoteCount = Math.min(noteCount, bankNote.quantity);

      if (actualNoteCount > 0) {
        notes.push({
          note: bankNote.note,
          quantity: actualNoteCount,
        });

        remainingValue -= bankNote.note * actualNoteCount;

        bankNote.quantity -= actualNoteCount;
      }

      if (remainingValue <= 0) {
        break;
      }
    }

    const totalNotes = notes.reduce(
      (acc, note) => acc + note.note * note.quantity,
      0
    );

    if (totalNotes < amount) {
      throw new AppError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "O caixa eletrônico não possui notas suficientes para entregar o valor solicitado"
      );
    }

    await this.transactionService.createTransaction(
      ETransactionType.WITHDRAWAL,
      amount
    );

    for (const note of notes) {
      await this.atmNoteRepository.debitNoteQuantity(note.note, note.quantity);
    }

    return { notes };
  }

  async extract(): Promise<IATMExtractOutput> {
    return {
      balance: await this.transactionService.getBalance(),
      transactions: await this.transactionService.getTransactions(),
    };
  }
}
