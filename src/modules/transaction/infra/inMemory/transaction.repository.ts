import { randomUUID } from "crypto";

import { ETransactionType } from "@shared/enuns/ETransactionType";
import { ITransaction } from "@modules/transaction/entities/ITransaction";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

export class TransactionInMemoryRepository implements ITransactionRepository {
  private readonly transactions: ITransaction[] = [];

  async getBalance(): Promise<number> {
    let balance = 0;

    for (const transaction of this.transactions) {
      switch (transaction.type) {
        case ETransactionType.DEPOSIT:
          balance += transaction.amount;
          break;
        case ETransactionType.WITHDRAWAL:
          balance -= transaction.amount;
          break;
      }
    }

    return balance;
  }

  async getTransactions(): Promise<ITransaction[]> {
    return this.transactions;
  }

  async createTransaction(
    type: ETransactionType,
    amount: number
  ): Promise<number> {
    this.transactions.push({
      id: randomUUID(),
      amount,
      type,
    });

    return this.getBalance();
  }
}
