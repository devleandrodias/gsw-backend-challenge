import { randomUUID } from "crypto";

import { ETransactionType } from "@shared/enuns/ETransactionType";
import { ITransaction } from "@modules/transaction/entities/ITransaction";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

export class TransactionInMemoryRepository implements ITransactionRepository {
  private readonly transactions: ITransaction[] = [];

  async getBalance(): Promise<number> {
    return this.transactions.reduce((total, transaction) => {
      switch (transaction.type) {
        case "DEPOSIT":
          return total + transaction.amount;
        case "WITHDRAWAL":
          return total - transaction.amount;
        default:
          return total;
      }
    }, 0);
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
