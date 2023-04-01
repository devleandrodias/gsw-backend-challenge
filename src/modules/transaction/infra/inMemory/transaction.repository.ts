import { ITransaction } from "@modules/transaction/entities/ITransaction";

import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
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

  async createTransaction(transaction: ITransaction): Promise<number> {
    this.transactions.push(transaction);
    return this.getBalance();
  }
}
