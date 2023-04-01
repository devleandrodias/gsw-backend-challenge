import { randomUUID } from "crypto";
import { injectable } from "tsyringe";

import { ETransactionType } from "@shared/enuns/ETransactionType";
import { ITransaction } from "@modules/transaction/entities/ITransaction";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

@injectable()
export class TransactionInMemoryRepository implements ITransactionRepository {
  private readonly transactions: ITransaction[] = [];

  async getTransactions(): Promise<ITransaction[]> {
    return this.transactions;
  }

  async createTransaction(
    type: ETransactionType,
    amount: number
  ): Promise<void> {
    this.transactions.push({ id: randomUUID(), amount, type });
  }
}
