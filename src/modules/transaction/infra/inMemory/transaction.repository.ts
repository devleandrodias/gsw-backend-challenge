import { injectable } from "tsyringe";

import { ITransaction } from "../../entities/ITransaction";
import { ETransactionType } from "../../../../shared/enuns/ETransactionType";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";

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
    this.transactions.push({
      id: Math.random(),
      amount,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
