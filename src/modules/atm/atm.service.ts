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

  public async deposit({
    amount,
  }: IATMDepositInput): Promise<IATMDepositOutput> {
    await this.transactionService.createTransaction(
      ETransactionType.DEPOSIT,
      amount
    );

    const balance = await this.transactionService.getBalance();

    return { balance };
  }

  public async extract(): Promise<IATMExtractOutput> {
    return {
      balance: await this.transactionService.getBalance(),
      transactions: await this.transactionService.getTransactions(),
    };
  }

  private async getAvailableATMNotes(): Promise<
    Array<{ note: number; quantity: number }>
  > {
    const bankNotes = await this.atmNoteRepository.getAvailableATMNotes();
    return bankNotes.sort((a, b) => b.note - a.note);
  }

  private calculateNotes(
    bankNotes: Array<{ note: number; quantity: number }>,
    amount: number
  ): Array<{ note: number; quantity: number }> {
    const notes: { note: number; quantity: number }[] = [];
    let remainingValue = amount;

    for (const bankNote of bankNotes) {
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

    return notes;
  }

  private checkAvailableNotes(totalNotes: number, amount: number): void {
    if (totalNotes < amount) {
      throw new AppError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "O caixa eletrônico não possui notas suficientes para entregar o valor solicitado"
      );
    }
  }

  private async createWithdrawalTransaction(amount: number): Promise<void> {
    await this.transactionService.createTransaction(
      ETransactionType.WITHDRAWAL,
      amount
    );
  }

  private async debitNotes(
    notes: Array<{ note: number; quantity: number }>
  ): Promise<void> {
    for (const note of notes) {
      await this.atmNoteRepository.debitNoteQuantity(note.note, note.quantity);
    }
  }

  public async withdraw({
    amount,
  }: IATMWithdrawInput): Promise<IATMWithdrawOutput> {
    const bankNotes = await this.getAvailableATMNotes();

    const notes = this.calculateNotes(bankNotes, amount);

    let totalNotes = 0;

    for (const note of notes) {
      totalNotes += note.note * note.quantity;
    }

    this.checkAvailableNotes(totalNotes, amount);

    await this.createWithdrawalTransaction(amount);

    await this.debitNotes(notes);

    return { notes };
  }
}
